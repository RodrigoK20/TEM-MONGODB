//Funciones que reutilizamos en cualquier vista

//Funcion tomar una fecha y devolverlo en horas, minutos, etc
//El valor sera en minutos


const moment = require('moment');
const helpers = {};

helpers.timeago = timestamp => {
  return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;