const express = require('express');
const router = express.Router();

const { productDetailController } = require('../controllers');

router.get('/:id', productDetailController.getProductDetailById);

module.exports = router;