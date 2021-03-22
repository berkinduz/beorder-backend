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

  pool.query(
    "SELECT * FROM product WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getProduct,
  getProductById
};
