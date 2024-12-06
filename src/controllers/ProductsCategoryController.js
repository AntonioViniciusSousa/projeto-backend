const ProductsCategoryModel = require("../models/ProductsCategoryModel");
const ProductsModel = require("../models/ProductsModel");

class ProductsCategoryController {
  async list(request, response) {
    try {
      const productCategory = await ProductsCategoryModel.findAll();
      return response.json(productCategory);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async queryById(request, response) {
    try {
      const { product_id, category_id } = request.params;
      const productCategory = await ProductsCategoryModel.findOne({
        where: {
          product_id,
          category_id,
        },
      });
      if (productCategory) {
        return response.json(productCategory);
      } else {
        return response
          .status(404)
          .json({ error: "Associação não encontrada!" });
      }
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const body = request.body;
      const productCategory = await ProductsCategoryModel.create(body);
      return response.status(201).json({
        productCategory,
        message: "Associação entre produto e categoria cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { product_id, category_id } = request.params;
      const productCategory = await ProductsCategoryModel.findOne({
        product_id,
        category_id,
      });
      if (productCategory) {
        await productCategory.destroy();
        response.status(204).send();
      } else {
        response.status(404).json({ error: "Associação não encontrada!" });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProductsCategoryController;
