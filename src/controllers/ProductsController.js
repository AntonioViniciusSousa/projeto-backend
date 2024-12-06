const UserModel = require("../models/UserModel");
const ProductsModel = require("../models/ProductsModel");
const CategoriesModel = require("../models/CategoriesModel");
const ProductImagesModel = require("../models/ProductImagesModel");
const ProductOptionsModel = require("../models/ProductOptionsModel");
const ProductsCategoryModel = require("../models/ProductsCategoryModel");

class ProductsController {
  async listProducts(request, response) {
    try {
      const {
        limit = 12,
        page = 1,
        fields = "name,images,price",
        match = "",
        category_ids = "",
        "price-range": priceRange = "",
        ...options
      } = request.query;

      if (isNaN(limit) || limit < -1)
        return response.status(400).json({ error: "Invalid limit parameter" });
      if (isNaN(page) || page < 1)
        return response.status(400).json({ error: "Invalid page parameter" });

      let filteredProducts = await ProductsModel.findAll({
        include: [
          { model: ProductImagesModel, as: "productImages" },
          { model: ProductOptionsModel, as: "productOptions" },
        ],
      });

      if (match) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.includes(match) || product.description.includes(match)
        );
      }

      if (category_ids) {
        const categoryIds = category_ids.split(",").map(Number);
        filteredProducts = filteredProducts.filter((product) =>
          product.category_ids.some((id) => categoryIds.includes(id))
        );
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }

      const total = filteredProducts.length;
      if (limit !== -1) {
        const start = (page - 1) * limit;
        const end = start + limit;
        filteredProducts = filteredProducts.slice(start, end);
      }

      response.status(200).json({
        data: filteredProducts,
        total,
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: "Bad request" });
    }
  }

  async list(request, response) {
    try {
      const users = await ProductsModel.findAll({
        include: [
          { model: ProductImagesModel, as: "productImages" },
          { model: ProductOptionsModel, as: "productOptions" },
        ],
      });
      return response.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return response.status(500).json(users);
    }
  }

  async queryById(request, response) {
    try {
      let id = request.params.id;
      let product = await ProductsModel.findByPk(id, {
        attributes: [
          "id",
          "enabled",
          "name",
          "slug",
          "stock",
          "description",
          "price",
          "price_with_discount",
        ],
        include: [
          { model: ProductImagesModel, as: "productImages" },
          { model: ProductOptionsModel, as: "productOptions" },
        ],
      });
      if (product) {
        return response.json(product);
      } else {
        return response.status(404).json({ error: "Usuário não encontrado!" });
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const id = request.params.id;
      const {
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options,
      } = request.body;

      if (!name || !slug || typeof stock !== 'number' || !description || typeof price !== 'number') {
        return response.status(400).json({ error: 'Invalid request data: missing required fields' });
      }

      if (category_ids && !Array.isArray(category_ids)) {
        return response.status(400).json({ error: 'Invalid category_ids format' });
      }
  
      if (images && !Array.isArray(images)) {
        return response.status(400).json({ error: 'Invalid images format' });
      }
  
      if (options && !Array.isArray(options)) {
        return response.status(400).json({ error: 'Invalid options format' });
      }

      const newProduct = await ProductsModel.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount
      });

      response.status(201).send(newProduct);
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: "Bad request" });
    }

    // const body = request.body;
    // ProductsModel.create(body, { include: UserModel });
    // return response.status(201).json({
    //   message: "Produto cadastrado com sucesso!",
    // });
  }

  async update(request, response) {


    try {
      const id = request.params.id;
      const {
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
        category_ids,
        images,
        options,
      } = request.body;

      const product = await ProductsModel.findByPk(id);
      if (!product)
        return response.status(404).json({ error: "Produto não encontrado!" });

      await ProductsModel.update({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });

      if (category_ids) {
        await product.setCategories(category_ids);
      }

      if (images) {
        const imageDeletes = images
          .filter((img) => img.deleted)
          .map((img) => img.id);
        if (imageDeletes.length) {
          await ProductImagesModel.destroy({ where: { id: imageDeletes } });
        }

        await Promise.all(
          images.map((img) => {
            if (img.deleted) return;
            if (img.id) {
              return ProductImagesModel.update(
                { content: img.content },
                { where: { id: img.id } }
              );
            } else {
              return ProductImagesModel.create({ ...img, productId: id });
            }
          })
        );
      }

      if (options) {
        const optionDeletes = options
          .filter((opt) => opt.deleted)
          .map((opt) => opt.id);
        if (optionDeletes.length) {
          await ProductOptionsModel.destroy({ where: { id: optionDeletes } });
        }

        await Promise.all(
          options.map((opt) => {
            if (opt.deleted) return;
            if (opt.id) {
              return ProductOptionsModel.update({ ...opt }, { where: { id: opt.id } });
            } else {
              return ProductOptionsModel.create({ ...opt, productId: id });
            }
          })
        );
      }
      response.status(204).send();
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: "Bad request" });
    }

    // const id = request.params.id;
    // const body = request.body;
    // await ProductsModel.update(body, { where: { id } });
    // return response.status(204).send();
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const user = await ProductsModel.findByPk(id);

      if (user) {
        await ProductsModel.destroy({ where: { id } });
        return response.status(204).send();
      } else {
        return response.status(404).json({ error: "Usuário não deletado!" });
      }
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductsController;
