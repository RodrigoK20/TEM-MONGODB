const mongoose = require('mongoose');

//Variables de entorno para mayor seguridad

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
   .then(db => console.log('DB is connected'))
   .catch(err => console.error(err));
