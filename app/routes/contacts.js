
module.exports = app => {

  const contacts = require("../controllers/contacts.js");

  var router = require("express").Router();

  // Create a new Contact
  router.post("/", contacts.create);

  // Retrieve all Contact
  router.get("/", contacts.findAll);


  // Retrieve a single Contacts with id
  router.get("/:id", contacts.findOne);

  // Update a Contact with id
  router.put("/:id", contacts.update);

  // Delete a Contact with id
  router.delete("/:id", contacts.delete);

  app.use('/api/contacts', router);
};
