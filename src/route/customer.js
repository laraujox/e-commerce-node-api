const express = require('express');
const router = express.Router();
const controller = require("../controller/customer");

router.post('/', controller.post);
router.get('/', controller.get);
router.post('/authenticate', controller.authenticate);

module.exports = router;