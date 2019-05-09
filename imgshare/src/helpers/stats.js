const { Comment, Image } = require('../models');


//Funcion que devuelve cuantas imaganes hay en la app
async function imageCounter() {
  return await Image.countDocuments();
};

//Funcion que devuelve la cantidad de comentarios hay en la app
async function commentsCounter() {
  return await Comment.countDocuments();
}

//Total de las vistas de las imagenes
async function imageTotalViewsCounter() {
  const result = await Image.aggregate([{$group: {
    _id: '1',

    //Propiedad que retorna la suma de las vistas
    viewsTotal: {$sum: '$views'}
  }}]);
  let viewsTotal = 0;
  if(result.length > 0) {
    viewsTotal += result[0].viewsTotal;
  }
  return viewsTotal;
}

//Total de likes de las imagenes
async function likesTotalCounter() {

  const result = await Image.aggregate([{$group: {
    _id: '1',
    likesTotal: {$sum: '$likes'}
  }}]);

  let likesTotal = 0;
  if (result.length > 0) {
    likesTotal += result[0].likesTotal;
  }
  return likesTotal;
}

//ejecutando las funciones
module.exports = async () => {

  const results = await Promise.all([
    imageCounter(),
    commentsCounter(),
    imageTotalViewsCounter(),
    likesTotalCounter()
  ]);


  //Objeto de las estadisticas
  return {
    images: results[0],
    comments: results[1],
    views: results[2],
    likes: results[3]
  } 
};