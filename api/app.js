'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// se cargan las rutas
var route_producto = require('./routes/producto');
var route_user = require('./routes/user');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin,x-requested-with,Content-Type,Accept,Acces-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,UPDATE,DELETE,OPTIONS');
    res.header('Allow', 'GET,POST,PUT,UPDATE,DELETE,OPTIONS');
    next();
});


// rutas
app.use(route_user);
app.use(route_producto);


module.exports = app;