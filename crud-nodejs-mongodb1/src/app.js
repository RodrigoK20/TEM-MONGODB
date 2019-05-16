//Creando servidor principal - configuracion
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//Conectando a la BD 
mongoose.connect('mongodb://localhost/crud-mongo')
 .then(db => console.log('Base de datos conectado'))
.catch(err => console.log(err));

//Importando rutas
const indexRoutes = require('./routes/index');


//Configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware (funcion que se ejecuta antes de que lleguen a las rutas del servidor)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));



//routes
app.use('/', indexRoutes);

//Iniciando servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port 4000');
});

