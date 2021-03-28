const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//middlewares
const auth = require('./middlewares/auth');
const superadmin = require('./middlewares/superadmin');

const userTable = require("./queries/users");
const materialTable = require("./queries/material");
const companyTable = require("./queries/company");
const productTable = require("./queries/product");
const userTypeTable = require("./queries/userType");
const productTypeTable = require("./queries/productType");


app.get("/users", userTable.getUsers);
app.get("/users/:id", userTable.getUserById);
app.post("/register", userTable.createUser);
app.post("/login", userTable.userLogin);
app.get("/logout", auth, userTable.userLogout);

app.get("/materials", auth, materialTable.getMaterials);
app.get("/materials/:id", materialTable.getMaterialById);
app.post("/material/post", auth, materialTable.createMaterial);


app.get("/companies", companyTable.getCompany);
app.get("/companies/:id", companyTable.getCompanyById);
app.post("/company/post", companyTable.createCompany);

app.get("/products", productTable.getProduct);
app.get("/products/:id", productTable.getProductById);
app.post("/product/post", productTable.createProduct);

app.get("/usertypes", userTypeTable.getUserType);
app.get("/usertypes/:id", userTypeTable.getUserTypeById);
app.post("/usertype/post", auth, superadmin, userTypeTable.createUserType);

app.get("/producttypes", productTypeTable.getProductType);
app.get("/producttypes/:id", productTable.getProductTypeById);
app.post("/producttype/post", productTypeTable.createProductType);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
