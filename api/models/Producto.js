'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    ID: Number,
    NombreProducto: String,
    Caracteristicas: String,
    FechaLanzamiento: Date,
    CorreoFabricante: String,
    PaisFabricacion: String,
    Precio: Number,
    UnidadesDisponibles: Number,
    UnidadesVendidas: Number,
    ImagenProducto: String
});

module.exports = mongoose.model('Producto',ProductoSchema);