const pool = require("../config");

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const {
    name,
    lastname,
    phone_num,
    email,
    password,
    role,
    status,
  } = request.body;

  pool.query(
    "INSERT INTO users (name, lastname, phone_num, email, password, role, status) VALUES ($1, $2, $3, $4, crypt($5,gen_salt('bf')), $6, $7) RETURNING id",
    [name, lastname, phone_num, email, password, role, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID:${results.rows[0].id} `);
    }
  );
};

const userLogin = (request, response) => {
  const { email, password } = request.body;

  pool.query(
    "SELECT id FROM users WHERE email = $1 AND password = crypt($2, password)",
    [email , password],
    (error, results) => {
      if (error) {
        throw error;
      }
      try {
        response.status(201).send(`Welcome Back: ${results.rows[0].id} `);
      } catch (error) {
        response.send('Wrong e-mail or password');
      }
      
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  userLogin,
};
