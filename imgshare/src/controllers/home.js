//Controladores

const ctrl = {};

const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index =  async (req,res) =>{
    //Consulta a la base de datos (ordenando las imagenes mas recientes)
    const images = await Image.find().sort({timestamp:-1});

    //Arreglo de imagenes (agregara comentarios, imagenes comentadas, etc)
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
   console.log(viewModel);

    res.render('index', viewModel);
    
};

module.exports= ctrl;

