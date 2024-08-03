const { Password } = require("../models/models");

class PasswordController {
  async create(req, res) {
    const { title, website, username, password, userId } = req.body;

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

  async update(req, res) {
    const { id } = req.params;
    await Password.update({ ...req.body, updatedAt: Date.now() }, { where: { id } });
    const pass = await Password.findOne({ where: { id } });
    return res.json(pass);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Password.destroy({ where: { id } });
    res.status(204).json();
  }
}

module.exports = new PasswordController();
