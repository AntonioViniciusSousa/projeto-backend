const ProductOptionsModel = require("../models/ProductOptionsModel");
const ProductsModel = require("../models/ProductsModel");

class ProductOptionsController {
  async list(request, response) {
    try {
      const option = await ProductOptionsModel.findAll();
      return response.json(option);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async queryById(request, response) {
    try {
      let id = request.params.id;
      let option = await ProductOptionsModel.findByPk(id);

      if (option) {
        return response.json(option);
      } else {
        return response.status(404).json({ error: "Opção não encontrada!" });
      }
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const body = request.body;
      const option = await ProductOptionsModel.create(body);
      return response.status(201).json({
        message: "Opção cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const body = request.body;
      const id = request.params.id;
      const option = await ProductOptionsModel.findByPk(id);
      if (option) {
        await option.update(body);
        response.status(200).json(option);
      } else {
        response.status(404).json({ error: "Opção não encontrada!" });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const option = await ProductOptionsModel.findByPk(id);
      if (option) {
        await option.destroy();
        response.status(204).send();
      } else {
        response.status(404).json({ error: 'Opção não encontrada!' });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }

  }
}

module.exports = ProductOptionsController;