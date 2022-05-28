
module.exports = app => {

  const contacts = require("../controllers/contacts.js");
  const { authJwt } = require("../middleware");

  var router = require("express").Router();

  // Create a new Contact
  router.post("/", [authJwt.verifyToken],contacts.create);

  // Retrieve all Contact
  router.get("/", [authJwt.verifyToken], contacts.findAll);


  // Retrieve a single Contacts with id
  router.get("/:id", [authJwt.verifyToken], contacts.findOne);

  // Update a Contact with id
  router.put("/:id", [authJwt.verifyToken], contacts.update);

  // Delete a Contact with id
  router.delete("/:id", [authJwt.verifyToken], contacts.delete);

  app.use('/api/contacts', router);
};
