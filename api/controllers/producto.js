'use strict'

var producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

function ensayo(req, res) {
    res.status(200).send({
        message: "peticion con autorizacion correcta"
    });
}

function saveProducto(req, res) {
    debugger
    var Producto = new producto();
    var params = req.body;

    Producto.NombreProducto = params.NombreProducto;
    Producto.Caracteristicas = params.Caracteristicas;
    Producto.FechaLanzamiento = params.FechaLanzamiento;
    Producto.CorreoFabricante = params.CorreoFabricante;
    Producto.PaisFabricacion = params.PaisFabricacion;
    Producto.Precio = params.Precio;
    Producto.UnidadesDisponibles = params.UnidadesDisponibles;
    Producto.UnidadesVendidas = params.UnidadesVendidas;
    Producto.ImagenProducto = params.ImagenProducto;
 

    Producto.save((err, ProductoStorage) => {
        if (err) {
            return res.status(500).send({
                message: "el Producto no se pudo crear intente nuevamente..."
            });
        }
        debugger
        res.status(200).send({
            Producto: ProductoStorage._doc
        })
    });
};

function Productos(req, res) {

    producto.find((err, Productos) => {
        if (err) {
            res.status(500).send({
                message: "error en la consulta verifique..."
            })
        } else {
            if (!Productos) {
                res.status(400).send({
                    message: "no hay Productos registrados"
                })
            } else {
                res.status(200).send({
                    Productos
                })
            }
        }
    })
}


function uploadImageProducto(req, res) {
    var ProductoId = req.params.id;
    var file_name = 'no image';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_name.split('.')[1];

        if (file_ext == 'jpg' || file_ext == 'png' || file_ext == 'jpeg') {
            producto.findByIdAndUpdate(ProductoId, {
                image: file_name
            }, (err, ProductoUpdate) => {
                if (ProductoUpdate) {
                    res.status(200).send({
                        image: file_name,
                        Producto: ProductoUpdate
                    });
                } else {
                    //res.status(404).send({message:'no se pudo actualizar la imagen..'});
                    res.status(404).send({
                        message: "no se pudo actualizar la imagen intente nuevamente"
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'formato de imagen invalido...'
            });
        }

    } else {
        res.status(200).send({
            message: 'no se ha subido ninguna imagen'
        });
    }

};

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;

    if (imageFile) {
        var rutaFile = './uploads/Productos/' + imageFile;
        fs.exists(rutaFile, (exist) => {
            if (exist) {
                res.sendFile(path.resolve(rutaFile));
            } else {
                res.status(404).send({
                    message: 'la imagen no existe'
                });
            }
        });
    } else {
        res.status(500).send({
            message: 'No se ingreso un nombre de imagen valido'
        })
    }

};

function deleteProducto(req, res) {
    
    var productoId = req.params.id;
    producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
        if (err) {
            res.status(500).send({
                message: "error en la petición para eliminar el producto"
            });
        } else {
            if (!productoRemoved) {
                res.status(404).send({
                    message: "el producto no se pudo eliminar"
                });
            } else {
            
                res.status(200).send({
                    productoRemoved,
                });      
            }
        }
    }); 
};

module.exports = {
    saveProducto,
    ensayo,
    deleteProducto,
    uploadImageProducto,
    getImageFile,
    Productos

};