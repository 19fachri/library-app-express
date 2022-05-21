const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");
const { User } = require("../../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID_GAUTH);

class AuthController {
  static async register(req, res, next) {
    let { username, email, password } = req.body;
    try {
      const result = await User.create({
        username,
        email,
        password,
        role: "admin",
      });
      const { role } = result;
      const access_token = signToken({ email });
      const user = { username, email, role };
      res.status(201).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      const result = await User.findOne({ where: { email } });
      if (!result) throw { name: "IncorectEmailOrPassword" };
      const isValidPassword = comparePassword(password, result.password);
      if (!isValidPassword) throw { name: "IncorectEmailOrPassword" };
      const { username, role } = result;
      const access_token = signToken({ email });
      const user = { username, email, role };
      res.status(200).json({ access_token, user });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      try {
        const data = { idToken: req.body.id_token };
        const ticket = await client.verifyIdToken(data);
        const payload = ticket.getPayload();

        const { email, name } = payload;
        let user = await User.findOne({ where: { email } });

        if (!user) {
          const newUser = {
            username: name,
            email,
            password: "password",
            role: "admin",
          };
          user = await User.create(newUser);
        }

        const access_token = signToken({ email: user.email });
        const { username, role } = user;

        res.status(200).json({ access_token, user: { username, email, role } });
      } catch (error) {
        console.log(error);
        next(error);
      }
    } catch (error) {}
  }
}

module.exports = AuthController;
