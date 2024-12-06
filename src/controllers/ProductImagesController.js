const ProductImagesModel = require("../models/ProductImagesModel");
const ProductsModel = require("../models/ProductsModel");

class ProductImagesController {
  async list(request, response) {
    try {
      const image = await ProductImagesModel.findAll();
      return response.json(image);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async queryById(request, response) {
    try {
      let id = request.params.id;
      let image = await ProductImagesModel.findByPk(id);

      if (image) {
        return response.json(image);
      } else {
        return response.status(404).json({ error: "Usuário não encontrado!" });
      }
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async create(request, response) {
    try {
      const body = request.body;
      await ProductImagesModel.create(body);
      return response.status(201).json({
        message: "Imagem cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const body = request.body;
      const id = request.params.id;
      const image = await ProductImagesModel.findByPk(id);
      if (image) {
        await image.update(body);
        response.status(200).json(image);
      } else {
        response.status(404).json({ error: "Imagem não encontrada!" });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const image = await ProductImagesModel.findByPk(id);
      if (image) {
        await image.destroy();
        response.status(204).send();
      } else {
        response.status(404).json({ error: 'Imagem não encontrada!' });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }

  }
}

module.exports = ProductImagesController;
