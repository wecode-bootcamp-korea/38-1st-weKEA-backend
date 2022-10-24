const express = require('express');
const router  = express.Router();
const { loginRequired } = require('../utils/auth');

const { cartController } = require('../controllers');

router.post('',loginRequired, cartController.addCart);
router.get('',loginRequired, cartController.getCart);
router.delete('/deleteall',loginRequired, cartController.allDeleteCart);
router.delete('/deleteone',loginRequired, cartController.oneDeleteCart);

module.exports = router;
