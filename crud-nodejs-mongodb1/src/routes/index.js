//Codigo del servidor

const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res)=>{
   const tasks =  await Task.find();
    console.log(tasks);
    res.render('index',{
        //Ver datos en la tabla
        tasks: tasks
    });
});

router.post('/add', async (req, res)=>{

    //Almacenar objeto a BD
    const task = new Task(req.body);
    await task.save();

    res.redirect('/');
});


//Cambiar estado de falso a verdadero.
router.get('/turn/:id' ,  async (req,res) =>{

    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    //Redireccionar a la pag principal
    res.redirect('/');


});

//Editar Tarea (obtener ID de la tarea a actualizar)
router.get('/edit/:id', async (req, res) =>{

    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', {

        task
    });

});


//Editar Tarea mediante metodo POST
router.post('/edit/:id', async (req, res) =>{

    const {id} = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});


//Eliminar tarea
router.get('/delete/:id',  async (req,res) =>{

    const {id} = req.params;
    await Task.remove({_id: id});

});

module.exports = router; 