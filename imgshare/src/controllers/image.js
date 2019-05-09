const ctrl = {};
const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');
const { Image, Comment } = require('../models');

const sidebar = require('../helpers/sidebar');


  //CONTROLADOR QUE SE ENCARGA DE RENDERIZAR LAS VISTAS
ctrl.index = async (req, res) => {
  let viewModel = { image: {}, comments: [] };
  const image = await Image.findOne({filename: { $regex: req.params.image_id }});
   //Si la imagen existe
  if (image) {

    //ACTUAIZAR VISTAS DE LA IMAGEN Y GUARDARLO EN LA BD
    image.views = image.views + 1;
    viewModel.image = image;
    image.save();

     //Traer comentarios relacionados solo a la imagen

    const comments = await Comment.find({image_id: image._id})
      .sort({'timestamp': 1});
    viewModel.comments = comments;

    viewModel = await sidebar(viewModel);

    //viewModel = await sidebar(viewModel);
     //Renderizar la vista
    res.render('image', viewModel);
  } else {
    res.redirect('/');
  }
};

ctrl.create = (req, res) => {
    const saveImage = async () => {
      const imgUrl = randomNumber();

      //Consulta a la base de datos, si existe una imagen con el mismo nombre, ejecutara nuevamente el randomNumber
      const images = await Image.find({ filename: imgUrl });
      if (images.length > 0) {
        saveImage()
      } else {
        //Localizacion de la imagen
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
  
        //Validacion de extension de la imagen
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
          
          await fs.rename(imageTempPath, targetPath);
          const newImg = new Image({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description
          });
          const imageSaved = await newImg.save();
          res.redirect('/images/ + imgUrl');
         
        } else {
          await fs.unlink(imageTempPath);
          res.status(500).json({ error: 'Formato de Imagen no permitido' });
        }
      }
    };
  
    saveImage();
  };



  ctrl.like = async (req, res) => {

    //Consultando id de la imagen
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image)
    if (image) {

      //Incrementando en uno y guardado
      image.likes = image.likes + 1;
      await image.save();
      res.json({likes: image.likes})
    } else {
      res.status(500).json({error: 'Error'});
    }
  };

ctrl.comment= async (req, res) => {

  //Controlador de GUARDAR EL COMENTARIO
  //Consulta la BD (Si la imagen existe creara el comentario)
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {
    const newComment = new Comment(req.body);
    //Converite el correo en un HASH
    newComment.gravatar = md5(newComment.email);
    //Id imagen relacionada del comentario
    newComment.image_id = image._id;
    await newComment.save();
    res.redirect('/images/' + image.uniqueId + '#' + newComment._id);
  } else {
    res.redirect('/');
  }
};

ctrl.remove = async (req, res) => {


  //Consulta a la base de datos
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {

    //Elimina la imagen de la aplicacion.
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
    await Comment.deleteOne({image_id: image._id});
    await image.remove();
    res.json(true);
  } else {
    res.json({response: 'Error.'})
  }
};

module.exports = ctrl;