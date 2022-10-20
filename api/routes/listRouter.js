const express = require('express');
const router = express.Router();

const { listController } = require('../controllers');

router.get('./:categoryId', listController.listInfo);

module.exports = router;
