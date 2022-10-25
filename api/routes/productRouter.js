const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');

router.get('', productController.getRandomProducts);
 
module.exports = router;