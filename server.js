const express = require("express");
require('dotenv').config({path: './.env'})
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const app = express();

var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
const Users = db.users;

db.sequelize.sync({force: true}).then(()=>{
  Users.create({
    id: 1,
    username: "admin",
    password: bcrypt.hashSync('admin', 8),
  });
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to application." });
// });

require("./app/routes/index")(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
