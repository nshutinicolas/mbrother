const productsModel = require("../models/productsModel");
const jwt = require("jsonwebtoken");

module.exports = {
  all(req, res) {
    return productsModel
      .findAll()
      .then((product) => {
        if (product.length > 0) {
          res.status(200).json({ status: 200, data: product });
        } else {
          res.status(404).json({ status: 404, error: "No product found" });
        }
      })
      .catch((error) => {
        res.status(404).json({ status: 404, error });
      });
  },
  findOne(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ status: 404, error: "No product id was provided" });
    }
    return productsModel.findByPk(id).then((product) => {
      if (!product) {
        res.status(404).json({ status: 404, error: "Invalid product key" });
      } else {
        res.status(200).json({ status: 200, data: product });
      }
    });
  },
  createProduct(req, res) {
    const { title, price, status, image, categoryId, description } = req.body;
    if (!title || !price || !status || !image || !categoryId || !description) {
      return res
        .status(404)
        .json({ status: 404, error: "Please complete all the fields" });
    }
    // Get User ID
    productsModel
      .create({
        ownerId: jwt.decode(req.headers.authtoken).id,
        title,
        price,
        status,
        image,
        categoryId,
        description,
      })
      .then((product) => {
        res.status(200).json({ status: 200, data: product });
      })
      .catch((error) => {
        res.status(404).json({ status: 404, error });
      });
  },
  updateProductPrice(req, res) {
    const { id } = req.params;
    const { price } = req.body;
    const ownerId = jwt.decode(req.headers.authtoken).id; //From header auth
    if (!id) {
      return res
        .status(404)
        .json({ status: 404, error: "No product id was provided" });
    }
    if (!price) {
      return res
        .status(404)
        .json({ status: 404, error: "New product price is required" });
    }
    return productsModel
      .findByPk(id)
      .then((product) => {
        if (product.ownerId === ownerId) {
          productsModel
            .update({ price }, { where: { id, ownerId: 1 } })
            .then((product) => {
              return res.status(200).json({
                status: 200,
                data: { message: "successfully updated" },
              });
            })
            .catch((error) => {
              return res.status(404).json({ status: 404, error });
            });
        } else {
          return res.status(404).json({ status: 404, error });
        }
      })
      .catch((error) => {
        return res.status(404).json({ status: 404, error });
      });
  },
  updatePriceStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const ownerId = jwt.decode(req.headers.authtoken).id; //From header auth
    if (!id) {
      return res
        .status(404)
        .json({ status: 404, error: "No product id was provided" });
    }
    if (!status) {
      return res
        .status(404)
        .json({ status: 404, error: "New product price is required" });
    }
    return productsModel
      .findByPk(id)
      .then((product) => {
        if (product.ownerId === ownerId) {
          productsModel
            .update({ status: "sold" }, { where: { id, ownerId: 1 } })
            .then((product) => {
              return res.status(200).json({
                status: 200,
                data: { message: "successfully updated" },
              });
            })
            .catch((error) => {
              return res.status(404).json({ status: 404, error });
            });
        } else {
          return res.status(404).json({ status: 404, error });
        }
      })
      .catch((error) => {
        return res.status(404).json({ status: 404, error });
      });
  },
  deleteProduct(req, res) {
    const { id } = req.params;
    const ownerId = jwt.decode(req.headers.authtoken).id; //From header auth
    if (!id) {
      return res
        .status(404)
        .json({ status: 404, error: "No product id was provided" });
    }
    return productsModel
      .findByPk(id)
      .then((product) => {
        if (product.ownerId === ownerId) {
          productsModel
            .destroy({ where: { id, ownerId } })
            .then(() => {
              return res.status(200).json({
                status: 200,
                data: { message: "successfully deleted" },
              });
            })
            .catch((error) => {
              return res.status(404).json({ status: 404, error });
            });
        } else {
          return res.status(404).json({ status: 404, error });
        }
      })
      .catch((error) => {
        return res.status(404).json({ status: 404, error });
      });
  },
  searchProducts(req, res) {
    const { string } = req.params;
    if (!string) {
      return res
        .status(404)
        .json({ status: 404, error: "Please search for something" });
    }
    return productsModel
      .findAll({ where: {} })
      .then((product) => {
        if (product.length > 0) {
          res.status(200).json({ status: 200, data: product });
        } else {
          res.status(404).json({ status: 404, error: "No product found" });
        }
      })
      .catch((error) => {
        res.status(404).json({ status: 404, error });
      });
  },
};
