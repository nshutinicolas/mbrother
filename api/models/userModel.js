const db = require("../config/db");
const Sequelize = require("sequelize");

module.exports = db.define("Users", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  phoneNumber: { type: Sequelize.STRING },
});
