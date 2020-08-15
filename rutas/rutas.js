const { request } = require('http');
var mongoose = require('mongoose');

// Conectar a base de datos
mongoose.connect('mongodb://localhost/vinos');

// Esquema de la base de datos
var VinosSchema = {
    nombre: String,
    anio: Number,
    uva: String,
    pais: String,
    region: String,
    descripcion: String,
    foto: String
};

var Vinos = mongoose.model('vinos', VinosSchema);


exports.obtenerTodo = function(req, res){
    Vinos.find(function(error, vinos){
        res.send(vinos);
    });
};

exports.obtenerPorId = function(req, res){
    Vinos.findOne({'_id': req.params.id}, function(error, vinos){
        res.send(vinos);
    });
};

exports.agregar = function(req, res){
    var data = {
        nombre:      req.body.nombre,
        anio:        req.body.anio,
        uva:         req.body.uva,
        pais:        req.body.pais,
        region:      req.body.region,
        descripcion: req.body.descripcion,
        foto:        req.body.foto,
    };

    var vino = new Vinos(data);

    vino.save(function(error, result){
        if(error){
            res.send('Hubo un error.');
        } else {
            res.send(result[0]);
        }
    });
};

exports.editar = function(req, res){
    var data = {
        nombre:      req.body.nombre,
        anio:        req.body.anio,
        uva:         req.body.uva,
        pais:        req.body.pais,
        region:      req.body.region,
        descripcion: req.body.descripcion,
        foto:        req.body.foto,
    };

    Vinos.update({'_id': req.params.id}, data, function(){
        res.send(data);
    });
};

exports.eliminar = function(req, res){
    Vinos.remove({'_id': req.params.id}, function(error){
        if(error) {
            console.log(error);
        } else {
            res.send('true');
        }
    });
};