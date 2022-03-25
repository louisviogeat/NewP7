const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const userAuth = require('../middleware/user-auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userAuth, userCtrl.deleteUser);
router.get('/', userCtrl.findAll);
router.get('/:id', userAuth, userCtrl.findUserById);


module.exports = router;