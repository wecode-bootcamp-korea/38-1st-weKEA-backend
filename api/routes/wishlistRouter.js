const express = require('express');
const router  = express.Router();
const { loginRequired } = require('../utils/auth');


const { wishlistController } = require('../controllers');

router.post('',loginRequired, wishlistController.clickWishlist);
router.get('',loginRequired, wishlistController.getWishlist);
router.post('/replacewishlist',loginRequired, wishlistController.replaceWishlist);
router.delete('/deleteone',loginRequired, wishlistController.oneDeleteWishlist);


module.exports = router;