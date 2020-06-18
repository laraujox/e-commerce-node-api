const express = require('express');
const router = express.Router();
const controller = require("../controller/product");
const auth = require("../service/utils/auth")

router.get('/', controller.get);
router.post('/', auth.isAdmin, controller.post);
router.put('/', auth.isAdmin, controller.put);
router.delete('/', auth.isAdmin, controller.delete);

module.exports = router;