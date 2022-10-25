const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');

router.use('/users', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;