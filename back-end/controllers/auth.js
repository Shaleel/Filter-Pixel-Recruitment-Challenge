const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { Op } = require("sequelize");
module.exports = {
  signup: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      let user = await User.findOne({
        where: {
          name: username,
        },
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
          name: username,
          password: hashedPassword,
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw createError.Unauthorized();
      }

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
          issuer: "filter-pixel",
        }
      );

      res.json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  },
  googleAuth: async (req, res, next) => {
    try {
      const [user, created] = await User.findOrCreate({
        where: {
          name: req.body.username,
        },
      });

      if (!user.photo && req.body.photo) {
        user.photo = req.body.photo;
        user.save();
      }

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
          issuer: "filter-pixel",
        }
      );

      res.json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  },
};
