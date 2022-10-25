const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const productDetailRouter = require('./productDetailRouter');

router.use('/users', userRouter);
router.use('/detail-page', productDetailRouter);

module.exports = router;