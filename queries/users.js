const pool = require("../config");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("../middlewares/auth");

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
    [email, password],
    (error, results) => {
      if (error) throw error;
      try {
        //login başarılı
        userID = results.rows[0].id;
        let token = jwt.sign(userID, "asd");
        pool.query(
          "UPDATE users SET token = $1 WHERE id = $2 ",
          [token, userID],
          (error, res) => {
            if (error) throw error;
            response.cookie("u_auth", token).status(200).json({
              loginSuccess: true,
              token,
            });
          }
        );
      } catch (error) {
        response.send("Wrong e-mail or password");
      }
    }
  );
};

const userLogout = (req, res) => {
  console.log(req.cookies.u_auth);
  myID = jwt.decode(req.cookies.u_auth);
  console.log(myID);
  res.cookie("u_auth", "");

  pool.query(
    "UPDATE users SET token = $1 WHERE id = $2",
    ["", parseInt(myID)],
    (error, result) => {
      if (error) return error;
      else {
        return res.status(200).send({ success: true });
      }
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  userLogin,
  userLogout,
};
