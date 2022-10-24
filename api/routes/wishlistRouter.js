const express = require('express');
const router  = express.Router();

const { wishlistController } = require('../controllers');

router.post('', wishlistController.addWishlist);
router.get('', wishlistController.getWishlist);
router.delete('/deleteall', wishlistController.allDeleteWishlist);
router.delete('/deleteone', wishlistController.oneDeleteWishlist);


module.exports = {
    wishlistController
}