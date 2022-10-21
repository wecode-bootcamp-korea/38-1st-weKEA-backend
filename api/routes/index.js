const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const mainRouter = require('./mainRouter');

router.use('/users', userRouter);
router.use('', mainRouter);

module.exports = router;