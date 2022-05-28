const db = require("../models");
const Contact = db.contacts;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content firstname can not be empty!"
    });
    return;
  }

  if (!req.body.lastName) {
    res.status(400).send({
      message: "Content lastname can not be empty!"
    });
    return;
  }

  if (!req.body.phone) {
    res.status(400).send({
      message: "Content can phone not be empty!"
    });
    return;
  }

  // Create a Contact
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  };

  // Save Contact in the database
  Contact.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Contact from the database.
exports.findAll = (req, res) => {
  Contact.findAll()
    .then(data => {
      res.json({ results: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacs."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findByPk(id)
    .then(data => {
      if (data) {
        res.json({ results: data });
      } else {
        res.status(404).send({
          message: `Cannot find Contact with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id
      });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Contact.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Contact was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Contact was deleted successfully." });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};
