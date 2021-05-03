import express from 'express';
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();
const app = express();
app.use(express.json());

import {getRegistros, createAnimal} from './api/rest_client.js';
import {Animal, registroDeAnimales} from './JavaScript1.js'

const puerto = 3000;
const server = app.listen(puerto, ()=> {
    console.log(`Server on port ${server.address().port}`);
});

//Viene de getRegistros
app.get(('/'), (req, res) => {
    var registro = registroDeAnimales.registro;
    res.json(registro);
})

//Viene de createAnimal
app.post(('/'), (req, res) => {
    console.log(req.body);

    if (req.body.length) {
        console.log(req.body)
        //varios
        var found;
        req.body.forEach(animal => {
            found = registroDeAnimales.buscarAnimalPorId(animal.id);
            if(!found){
                registroDeAnimales.agregarAnimal(new Animal(animal.id, animal.tipo, animal.raza, animal.nombre, animal.nroRegistro, animal.fechaNacimiento, animal.madreId, animal.padreId, animal.nombreDuenio, animal.telefonoDuenio));
            }
        })
        registroDeAnimales.guardar();
    } else {
        //uno
        found = registroDeAnimales.buscarAnimalPorId(req.body.id);
        if(!found){
            registroDeAnimales.agregarAnimal(new Animal(req.body.id, req.body.tipo, req.body.raza, req.body.nombre, req.body.nroRegistro, req.body.fechaNacimiento, req.body.madreId, req.body.padreId, req.body.nombreDuenio, req.body.telefonoDuenio));
        }
        registroDeAnimales.guardar();
    }
})

//Viene de updateAnimal
app.put(('/:id'), (req, res) => {
    //Actualizar
    
    if(res.json != null){
        // req.body.id
        // req.params.id
    }
})

//Viene de getAnimal
app.get(('/:id'), (req, res) => {
    //Buscar uno
    var registro = registroDeAnimales.registro;
    
    // if(/*verificar si existe*/){
    //     registroDeAnimales.updateAnimal(res.data);
    // }
})