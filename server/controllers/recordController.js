const { Record } = require("../models/models");

class RecordController {
  async create(req, res) {
    const { title, website, username, password, userId } = req.body;

    const record = await Record.create({
      title,
      website,
      username,
      password,
      userId,
    });

    return res.json(record);
  }

  async getAll(req, res) {
    const { userId } = req.query;
    const records = await Record.findAll({ where: { userId } });
    return res.json(records);
  }

  async update(req, res) {
    const { id } = req.params;
    await Record.update({ ...req.body, updatedAt: Date.now() }, { where: { id } });
    const record = await Record.findOne({ where: { id } });
    return res.json(record);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Record.destroy({ where: { id } });
    res.status(204).json();
  }
}

module.exports = new RecordController();
