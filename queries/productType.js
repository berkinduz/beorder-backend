const pool = require("../config");

const getProductType = (request, response) => {
  pool.query("SELECT * FROM product_type ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductTypeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM product_type WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createProductType = (request, response) => {
    const { 
      name, 
      status, 
     } = request.body;
  
    const token = request.cookies.u_auth;
    const owner_user_id = jwt.decode(token, "asd");
  
    pool.query(
      "INSERT INTO product_type (name,status, owner_user_id) VALUES ($1, $2, $3) RETURNING id",
      [name, status, owner_user_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response
          .status(201)
          .send(
            `Product Type added with ID:${results.rows[0].id} by user ID: ${owner_user_id} `
          );
      }
    );
  };

module.exports = {
  getProductType,
  getProductTypeById,
  createProductType,
};
