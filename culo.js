import express from 'express';
import api from './api/server.js'

const app = express();

const puerto = 3000;
const server = app.listen(puerto, ()=> {
    console.log(`Server on port ${server.address().port}`);
});

app.get(('/'), (req, res) => {
    //Listar
    res.json(api.getAlumnos());
})

app.post(('/'), (req, res) => {
    //Crear
    if(res.json != null){
        api.createAlumno(res.json);
    }
})

app.put(('/:id'), (req, res) => {
    //Actualizar
    
    if(res.json != null /*verificar si existe*/){
        api.updateAlumno(res.json);
    }
})

app.get(('/:id'), (req, res) => {
    //Buscar uno

    if(/*verificar si existe*/){
        api.getAlumno(res.data);
    }
})

app.use(express.json());