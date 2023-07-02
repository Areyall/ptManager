const express = require('express');
const router = express.Router();
const { register, login, updateUser, getUserProfile } = require('../controller/userController');
const { isAuthenticatedUser } = require('../middleware/auth');



router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/me').get(isAuthenticatedUser,getUserProfile);
router.route('/user/updateUser').put(isAuthenticatedUser,updateUser);

module.exports = router;
