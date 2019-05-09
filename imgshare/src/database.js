const mongoose = require('mongoose');

//Importando llaves
const { database } = require('./keys');

//Conexion BD
mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(db => console.log('BD Conectada'))
    .catch(err => console.error(err));