const UserModel = require("../models/UserModel");
const MD5 = require("crypto-js/md5");

class AuthController {
  async login(firstname, password) {
    const data = await UserModel.findAll({
      where: {
        firstname: firstname,
        password: MD5(password).toString(),
      },
    });

    if (data.length) {
      return data[0];
    }
    return null;
  }
}

module.exports = AuthController;
