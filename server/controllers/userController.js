const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const generateJwt = require("../functions/generateJwt");
const { User, Record } = require("../models/models");

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Неправильный email или пароль!"));
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует!")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword, role });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(
        ApiError.badRequest("Пользователь с таким email не существует!")
      );
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest("Введен неверный пароль!"));
    }

    const token = await generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async auth(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Record.destroy({ where: { userId: id } });
    await User.destroy({ where: { id } });
    res.status(200).json();
  }
}

module.exports = new UserController();
