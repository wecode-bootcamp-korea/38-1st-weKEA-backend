const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const pageRouter = require('./pageRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/page', pageRouter);
router.use('/order', orderRouter);

module.exports = router;