 //Informacion relacionada a la imagen
 //Mongoose

 const mongoose = require('mongoose');
 const path = require('path');

 //Nos permite crear un nuevo esquema, diciendo que datos tendra cierta entidades
 const {Schema} = mongoose;


 //(Titulo, descripcion, nombreImagen, cantidadVistas, cantidadLikes, FechaSubida)
 const ImageSchema =  new Schema({

    title: {type: String},
    description: {type: String},
    filename: {type: String},
    views: {type: Number, default:0},
    likes: {type: Number, default:0},
    timestamp: {type: Date, default: Date.now}

 });


 //variable virtual: va a devolver solo el nombre de la imagen, sin la extension
 //uniqueId no sera almacenado en la BD
 ImageSchema.virtual('uniqueId')
    .get(function(){

        return this.filename.replace(path.extname(this.filename), '');
    });

 //Definiendo nombreModelo y esquema
 module.exports = mongoose.model('Image',ImageSchema);