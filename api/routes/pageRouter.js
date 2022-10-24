const express = require('express');
const router = express.Router();

const { pageController } = require('../controllers');

router.get('/:id', pageController.getProductDetailById);

module.exports = router;