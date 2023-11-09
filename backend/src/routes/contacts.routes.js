const express = require("express");
const contactsController = require("../controller/contacts.controller");
const router = express.Router();

router.get("/", contactsController.getAll);
router.post("/",contactsController.addContacts);
router.put("/:id", contactsController.updateContacts);
router.delete("/:id", contactsController.DeleteContacts);
module.exports =  router;
