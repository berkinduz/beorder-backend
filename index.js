const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const test = require('./middlewares/test');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const userTable = require("./queries/users");
const materialTable = require("./queries/material");

app.get("/users", test, userTable.getUsers);
app.get("/users/:id", userTable.getUserById);
app.post("/users/register", userTable.createUser);
app.post("/users/login", userTable.userLogin);

app.get("/materials", materialTable.getMaterials);
app.get("/materials/:id", materialTable.getMaterialById);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
