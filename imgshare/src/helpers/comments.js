//COMENTARIOS MAS NOVEDOSOS- se usa newest
const { Comment, Image } = require('../models');

module.exports = {
  async newest () {

    //Consultar a la BD 5 Comentarios mas novedosos
    const comments = await Comment.find()
      .limit(5)

      //orden del mas novedosos a menos novedosos  - timestamp
      .sort({timestamp: -1});

    for(const comment of comments) {
      const image = await Image.findOne({_id: comment.image_id});
      comment.image = image;
    }

    return comments;
  }
};