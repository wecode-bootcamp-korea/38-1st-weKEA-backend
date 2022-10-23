const express = require('express');
const router  = express.Router();
// const { loginRequired } = require('../utils/auth');

const { cartController } = require('../controllers');

router.post('', cartController.addCart);
router.get('', cartController.getCart);
router.delete('/deleteall', cartController.allDeleteCart);
router.delete('/deleteone', cartController.oneDeleteCart);

module.exports = router;
