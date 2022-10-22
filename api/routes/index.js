const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const listRouter = require('./listRouter');

router.use('/users', userRouter);
router.use('/lists', listRouter);

module.exports = router;