var express    = require('express'),
    rutas      = require('./rutas/rutas.js'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas
app.get('/vinos',        rutas.obtenerTodo);
app.get('/vinos/:id',    rutas.obtenerPorId);
app.post('/vinos',       rutas.agregar);
app.put('/vinos/:id',    rutas.editar);
app.delete('/vinos/:id', rutas.eliminar);

app.listen(3000);

console.log('Escuchando en el puerto 3000...');