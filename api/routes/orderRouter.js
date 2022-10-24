const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

router.get('', loginRequired, orderController.getOrders);

module.exports = router;
