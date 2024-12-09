const MD5 = require('crypto-js/md5')

const UserModel = require("../models/UserModel");
const ProductsModel = require("../models/ProductsModel");
const { error } = require("console");

class UserController {
  async list(request, response) {
    try {
      const users = await UserModel.findAll();
      return response.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return response.status(500).json(users);
    }
  }

  async queryById(request, response) {
    try {
      let id = request.params.id;
      let user = await UserModel.findByPk(id, {
        attributes: ["id", "firstname", "surname", "email"],
      });
      if (user) {
        return response.json(user);
      } else {
        return response.status(404).json({ error: "Usuário não encontrado!" });
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  create(request, response) {
    UserModel.hasMany(ProductsModel, { foreignKey: "product_id" });

    const body = request.body;
    const password = MD5(body.password).toString()
    body.password = password;

    UserModel.create(body, { include: ProductsModel });
    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  }

  async update(request, response) {
    try{
      const { firstname, surname, email} = request.body;
      const id = request.params.id;

      if (!firstname || !surname || !email) {
        return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      
      const user = await UserModel.findByPk(id);

      if (user) {
        user.firstname = firstname || user.firstname;
        user.surname = surname || user.surname;
        user.email = email || user.email;

        await user.save();
        
        return response.status(204).send();
      } else {
        return response.status(404).json({ error: 'Usuário não encontrado!' });
      }
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const user = await UserModel.findByPk(id);

      if (user) {
        await UserModel.destroy({ where: { id } });
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

module.exports = UserController;
