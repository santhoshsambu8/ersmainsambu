// requring express
const express = require('express');
// making router 
const router = express.Router();
// requiring passprt, for chking the authrization
const passport = require('passport');
// requring adminController file, to call the fucntion, when requied
const adminController = require('../controllers/admin_controller');


// it will add the employee
// router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);


// THis is help to view the employee
router.get('/view-employee' , passport.checkAuthentication , adminController.showEmployeeList);

// it will add the employee
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);


// It will assign the work to the employeess
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);

// It will help to set the reviews, 
router.post('/setReviewes' , passport.checkAuthentication , adminController.setReviewrAndReviewe);

// This router will make new Admin
router.post('/newAdmin' , passport.checkAuthentication , adminController.newAdmin);

// It will delete the employee
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);


module.exports = router;