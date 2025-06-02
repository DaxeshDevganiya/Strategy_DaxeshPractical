const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors')
const app = express();  
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
const PORT = 3000;
app.use(cors())
app.use("/user",require("./controllers/SignupController"))
app.use("/user",require("./controllers/Login"))
app.use("/products",require("./controllers/ProductsController"))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });