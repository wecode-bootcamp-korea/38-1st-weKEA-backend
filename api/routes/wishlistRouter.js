const express = require('express');
const router  = express.Router();

const { wishlistController } = require('../controllers');

router.get('', wishlistController.addWishlist);

module.exports = {
    wishlistController
}