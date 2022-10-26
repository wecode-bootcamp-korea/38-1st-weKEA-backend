const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/order', orderRouter);

module.exports = router;