const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

const userTable = require("./queries/users");
const materialTable = require("./queries/material");

app.get("/users", userTable.getUsers);
app.get("/users/:id", userTable.getUserById);
app.post("/users/register", userTable.createUser);
app.post("/login", userTable.userLogin);
app.get("/logout", auth, userTable.userLogout);


app.get("/materials", auth, materialTable.getMaterials);
app.get("/materials/:id", materialTable.getMaterialById);
app.post("/material/post", auth, materialTable.createMaterial);



app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
