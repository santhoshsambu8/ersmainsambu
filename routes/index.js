const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');



router.get('/',homeController.home);

router.use('/users',require('./users'));

router.use('/admin',require('./admin'));


// all the request with the suffix /reviews , will require the admin file to compute
router.use('/reviews', require('./reviews'));
// router.use('/admin',require('./admin'));



module.exports = router;