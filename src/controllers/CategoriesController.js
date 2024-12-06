const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

class CategoriesController {
  async listCategories(request, response) {
    try {
      const {
        limit = 12,
        page = 1,
        fields = "name,slug",
        use_in_menu,
      } = request.query;
      const parsedLimit = parseInt(limit, 10);
      const parsedPage = parseInt(page, 10);

      if (isNaN(parsedLimit) || isNaN(parsedPage)) {
        return response
          .status(400)
          .json({ error: "Invalid limit or page query parameter" });
      }

      const where = {};
      if (use_in_menu) {
        where.use_in_menu = use_in_menu === "true";
      }

      const total = await CategoriesModel.count({ where });

      const categories = await CategoriesModel.findAll({
        where,
        limit: parsedLimit === -1 ? undefined : parsedLimit,
        offset: parsedLimit === -1 ? 0 : (parsedPage - 1) * parsedLimit,
        attributes: fields.split(","),
      });

      response.status(200).json({
        data: categories,
        total,
        limit: parsedLimit,
        page: parsedPage,
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  async list(request, response) {
    try {
      const category = await CategoriesModel.findAll();
      return response.json(category);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return response.status(500).json(category);
    }
  }

  async queryById(request, response) {
    try {
      let id = parseInt(request.params.id, 10);

      if (isNaN(id)) {
        return response.status(400).json({ error: "ID informado é inválido" });
      }

      let category = await CategoriesModel.findByPk(id, {
        attributes: ["id", "name", "slug", "use_in_menu"],
      });

      if (category) {
        return response.json(category);
      } else {
        return response
          .status(404)
          .json({ error: "Categoria não encontrada!" });
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const { name, slug, use_in_menu } = request.body;

      if (!name || !slug) {
        return response
          .status(400)
          .json({ error: "Name e slug são obrigatórios" });
      }

      await CategoriesModel.create({
        name,
        slug,
        use_in_menu: use_in_menu || false,
      });

      response.status(201).json({
        message: "Categoria criada com sucesso!"});
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const id = parseInt(request.params.id, 10);
      const { name, slug, use_in_menu } = request.body;
  
      if (isNaN(id)) {
        return response.status(400).json({ error: 'ID informado é inválido' });
      }
  
      if (!name || !slug) {
        return response.status(400).json({ error: 'Name e slug são obrigatórios' });
      }
  
      const category = await CategoriesModel.findByPk(id);
  
      if (!category) {
        return response.status(404).json({ error: 'Categoria não encontrada!' });
      }
  
      await category.update({
        name,
        slug,
        use_in_menu: use_in_menu || false
      });
  
      response.status(204).send();
    } catch (error) {
      response.status(400).json({ error: error.message });
    }

  }

  async delete(request, response) {
    try {
      const id = parseInt(request.params.id, 10);
  
      if (isNaN(id)) {
        return response.status(400).json({ error: 'ID informado é inválido' });
      }
  
      const category = await CategoriesModel.findByPk(id);
  
      if (!category) {
        return response.status(404).json({ error: 'Categoria não encontrada!' });
      }
  
      await category.destroy();
  
      response.status(204).send();
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CategoriesController;
