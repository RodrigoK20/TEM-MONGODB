    
const { Image } = require('../models');

module.exports = {

    //Devolvera las imagenes con mas likes (9 IMAGENES MAS POPULARES)
  async popular() {

    //Consulta a la BD
    const images = await Image.find()
      .limit(9)
      .sort({likes: -1});
    return images;
  }
//-1: de mas populares a menos populares
};