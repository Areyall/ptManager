const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controller/userController');
const { isAuthenticatedUser } = require('../middleware/auth');



router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/updateUser').put(isAuthenticatedUser,updateUser);

module.exports = router;
