const pool = require("../config");
const jwt = require("jsonwebtoken");

const getProduct = (request, response) => {
  pool.query("SELECT * FROM product ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM product WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProduct = (request, response) => {
  const { 
    name, 
    onStock, 
    productType, 
    price, 
    status, 
    material } = request.body;

  const token = request.cookies.u_auth;
  const owner_user_id = jwt.decode(token, "asd");

  pool.query(
    "INSERT INTO product (name,onstock,product_type,price,status, owner_user_id, material) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [name, onStock, productType, price, status, owner_user_id, material],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(
          `Product added with ID:${results.rows[0].id} by user ID: ${owner_user_id} `
        );
    }
  );
};

module.exports = {
  getProduct,
  getProductById,
  createProduct
};
