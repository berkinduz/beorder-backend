const pool = require("../config");

const getUserType = (request, response) => {
  pool.query("SELECT * FROM usertype ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserTypeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM usertype WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUserType = (request, response) => {
  const { name, status };

  pool.query(
    "INSERT INTO usertype (name,status) VALUES ($1, $2) RETURNING id",
    [name, status],
    (error, results) => {
      if (error) throw error;
      response.status(201).send(`User type added with ID:${results.row[0].id}`);
    }
  );
};

module.exports = {
  getUserType,
  getUserTypeById,
  createUserType
};
