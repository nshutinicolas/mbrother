const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret_key = "mbrother";
module.exports = {
  all(_, res) {
    userModel
      .findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  // LOGIN
  login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ status: 404, error: "Please provide email and password" });
    }
    return userModel.findAll({ where: { email } }).then((user) => {
      if (user.length === 0) {
        res.status(404).json({ status: 404, error: "No user with this email" });
      } else {
        const dbPassword = user[0].password;
        const verify = bcrypt.compareSync(password, dbPassword);
        if (verify) {
          const token = jwt.sign(
            { id: user[0].id, email: user.email },
            secret_key
          );
          res.status(200).json({ status: 200, data: { token } });
        } else {
          res
            .status(404)
            .json({ status: 404, error: "Failed to verify your credentials" });
        }
      }
    });
  },
  // SIGN UP
  signUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !phoneNumber
    ) {
      return res
        .status(404)
        .json({ status: 404, error: "Please complete all the missing fields" });
    }
    return userModel
      .create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        address,
        phoneNumber,
      })
      .then((user) => {
        res.status(200).json({ status: 200, data: user });
      })
      .catch((error) => {
        res
          .status(404)
          .json({ status: 404, error: "failed to create your account" });
      });
  },
};
