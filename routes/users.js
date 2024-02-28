const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/profile', usersController.profile);

router.get('/sign-in' , usersController.signIn);
router.get('/sign-up' , usersController.signUp);

// It will create new session for the particular user, and also it check the authorization
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

// It will create the new user
router.post('/create' , usersController.create);

// It will logOut form the current user
router.get('/sign-out', usersController.destroySession);


// all the empoyee
router.post('/addEmployee', usersController.addEmployeee);


module.exports = router;