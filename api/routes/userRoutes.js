
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);

module.exports = router;
