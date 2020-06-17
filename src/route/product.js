const express = require('express');
const router = express.Router();
const controller = require("../controller/product");
const auth = require("../service/utils/auth")

router.get('/', auth.authorize, controller.get);
router.post('/', auth.authorize, controller.post);
router.put('/', auth.authorize, controller.put);
router.delete('/', auth.authorize, controller.delete);

module.exports = router;