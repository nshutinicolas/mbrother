const db = require("../config/db");
const Sequelize = require("sequelize");

module.exports = db.define("Products", {
  ownerId: { type: Sequelize.INTEGER },
  title: { type: Sequelize.STRING },
  price: { type: Sequelize.STRING },
  status: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING },
  categoryId: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});
