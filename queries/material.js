const pool = require("../config");
const jwt = require("jsonwebtoken");

const getMaterials = (request, response) => {
  pool.query("SELECT * FROM materials ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getMaterialById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM materials WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createMaterial = (request, response) => {
  const { name, allergen, onStock, price, status } = request.body;

  const token = request.cookies.u_auth;
  const owner_user_id = jwt.decode(token, "asd");

  pool.query(
    "INSERT INTO materials (name,allergen,onstock,price,status, owner_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [name, allergen, onStock, price, status, owner_user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(
          `Material added with ID:${results.rows[0].id} by user ID: ${owner_user_id} `
        );
    }
  );
};

module.exports = {
  getMaterials,
  getMaterialById,
  createMaterial,
};
