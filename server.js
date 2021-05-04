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
    //req.body => nuevo animal
    //req.params.id => id del nuevo animal

    if(req.body && req.params.id){
        if(req.body.id == req.params.id){
            if(req.params.id && req.params.tipo && req.params.raza && req.params.nombre && req.params.nroRegistro && req.params.fechaNacimiento && req.params.madreId && req.params.padreId && req.params.nombreDuenio && req.params.telefonoDuenio){
                registroDeAnimales.actualizarAnimal(new Animal(req.params.id, req.params.tipo, req.params.raza, req.params.nombre, req.params.nroRegistro, req.params.fechaNacimiento, req.params.madreId, req.params.padreId, req.params.nombreDuenio, req.params.telefonoDuenio));
            }else{
                console.error('No deje campos del animal vacios');
            }
        }
    }
})

//Viene de getAnimal
app.get(('/:id'), (req, res) => {
    //Buscar uno
    const animalBuscado = registroDeAnimales.buscarAnimalPorId(req.params.id);
    if(animalBuscado){
        res.json(animalBuscado);
    }else{
        res.json('No existe dicho animal');
    }
})