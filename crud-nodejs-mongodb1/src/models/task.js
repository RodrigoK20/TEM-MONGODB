//Definir  a traves de mongoose, define como lucen los datos

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default:false
    }
});


//Este metodo tomar el esquema y luego utilizarlo para guardar datos en una coleccion de MONGODB 
module.exports = mongoose.model('tasks', TaskSchema);


