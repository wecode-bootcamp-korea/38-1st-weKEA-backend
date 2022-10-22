const express = require('express');
const router = express.Router();

const { pageController } = require('../controllers');

router.get('/detail/:id', pageController.productDetail);

module.exports = router;