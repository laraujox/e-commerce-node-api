const express = require('express');
const router = express.Router();
const controller = require("../controller/email.js");

router.get('/', controller.send);

module.exports = router;