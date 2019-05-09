//Arrancar el  servidor
// () => funcion

const express = require('express');

 const config = require('./server/config');

 //Database
 require('./database');


 const app = config(express());

  //Empezando el servidor
 app.listen(app.get('port'), () => {
     console.log('Server en puerto', app.get('port'));
 })


