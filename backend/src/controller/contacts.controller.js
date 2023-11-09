const contactsModel = require("../model/contacts.model");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

exports.getAll = async (req, res, next) => {
  try {
    const contacts = await contactsModel.Contacts.findAll();

    if (contacts) {
      res.status(201).json(contacts);
    } else {
      res.status(404).json("Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.addContacts = async (req, res, next) => {
  try {
    const contact = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      country: req.body.country,
      about: req.body.about
    };
    console.log(`contact ${JSON.stringify(contact)}`);
    const contacts = new contactsModel.Contacts(contact);
    await contacts.save();
    res.status(201).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateContacts = async (req, res, next) => {
  try {
    await contactsModel.Contacts.findOne({
      where: {
        id: req.params.id,
      },
    }).then((record) => {
      if (!record) {
        throw new Error("No record found to update");
      }
      else {
        const contact = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            country: req.body.country,
            about: req.body.about
          };

        record
          .update(contact)
          .then((updatedRecord) => {
            res.status(201).json("Note updated successfully");
            // login into your DB and confirm update
          })
          .catch((error) => {
            // do seomthing with the error
            throw new Error(error);
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.DeleteContacts = async (req, res, next) => {
  try {
    await contactsModel.Contacts.findOne({
      where: {
        id: req.params.id,
      },
    }).then((record) => {
      if (!record) {
        throw new Error("No record found to delete");
      }
      else {
        record
          .destroy()
          .then(() => {
            res.status(201).json("Note delete successfully");
            // login into your DB and confirm delete
          })
          .catch((error) => {
            // do seomthing with the error
            throw new Error(error);
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
