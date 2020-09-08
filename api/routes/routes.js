const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productsController = require("../controllers/productsController");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const secret_key = "mbrother";
const checkAuth = (req, res, next) => {
  const token = req.headers.authtoken;
  // console.log(req.headers);
  if (token) {
    jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 403, error: "You need to login first" });
      }
      next();
    });
  } else {
    return res
      .status(403)
      .json({ status: 403, error: "You need to login first" });
  }
};
router.use(express.json());
// AUTHENTICATION
// signup
router.post("/signup", userController.signUp);
// login
router.post("/login", userController.login);
router.get("/all", userController.all);

// PRODUCTS
router.get("/products", productsController.all);
router.get("/products/:id", productsController.findOne);
router.post("/products", checkAuth, productsController.createProduct);
router.delete("/products/:id", checkAuth, productsController.deleteProduct);
router.put(
  "/products/price/:id",
  checkAuth,
  productsController.updateProductPrice
);
router.put(
  "/products/status/:id",
  checkAuth,
  productsController.updatePriceStatus
);
router.get(
  "/products/search/:string",
  checkAuth,
  productsController.searchProducts
);
module.exports = router;
