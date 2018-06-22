'use strict'

var express = require('express');
var productoController = require('../controllers/producto');
var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'./uploads/productos'});

var api = express.Router();

api.post('/producto',productoController.saveProducto);
api.get('/producto',productoController.Productos);
api.get('/get-image-producto/:image',productoController.getImageFile);
api.delete('/delete-producto/:id',productoController.deleteProducto);

module.exports = api;