'use strict'

var express = require('express');
var userController = require('../controllers/user');
var md_aut = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/users'
});

var route = express.Router();

route.get('/users', md_aut.ensureAuth, userController.users);
route.post('/register', userController.saveUser);
route.post('/loginUser', userController.loginUser);
route.put('/update-user/:id',  userController.updateUser);
route.post('/upload-image-user/:id', [md_upload], userController.uploadImageUser);
route.get('/get-image-user/:imageFile', userController.getImageFile);

module.exports = route;