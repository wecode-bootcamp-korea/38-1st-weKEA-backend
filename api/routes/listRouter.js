const express = require('express');
const router = express.Router();

const { listController } = require('../controllers');

router.get('/:categoryId/:size/:cursorId/:cursorPrice', listController.listInfo);

module.exports = router;