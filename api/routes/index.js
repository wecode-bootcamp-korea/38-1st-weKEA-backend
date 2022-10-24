const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const wishlistRouter = require('./wishlistRouter'); 

router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);

module.exports = router;