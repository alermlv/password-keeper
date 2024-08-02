const { Password } = require("../models/models");

class PasswordController {
  async create(req, res) {
    let { title, website, username, password, userId } = req.body;

    const pass = await Password.create({
      title,
      website,
      username,
      password,
      userId,
    });

    return res.json(pass);
  }

  async getAll(req, res) {
    const { userId } = req.query;
    const passwords = await Password.findAll({ where: { userId } });
    return res.json(passwords);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Password.destroy({ where: { id } });
    res.status(204).json();
  }
}

module.exports = new PasswordController();
