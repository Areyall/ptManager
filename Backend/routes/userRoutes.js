const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controller/userController');

router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/updateUser').put(updateUser);

module.exports = router;
