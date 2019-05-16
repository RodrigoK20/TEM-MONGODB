//Si se despliega nuestra aplicacion no requiere dotenv
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors= require('cors');

//Inicializaciones
const app = express();
require('./database');

//Configuraciones
app.set('port', process.env.PORT || 3000);

//Middleware (Funciones)
app.use(morgan('dev'));
//Imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

//Interpretar datos del formulario JSON.
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Rutas
app.use('/api/books',require('./routes/books'));

//Static Files (enviar al navegador publica)
app.use(express.static(path.join(__dirname, 'public')));


//Empezar el servidor
app.listen(app.get('port'), ()=> {
    console.log('Server en puerto', app.get('port'));
})