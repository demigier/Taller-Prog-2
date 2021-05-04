import axios from 'axios';

//json-server --watch .\api\db.json

export const getRegistros = async()=>{
    try{
        const res = await axios.get('http://localhost:3000/');
        return res.data;
    }catch(err){
        console.log(err.message)
    }
};

export const createAnimal = async(nuevoAnimal)=>{
    try {
        console.log(JSON.stringify(nuevoAnimal))
        await axios.post('http://localhost:3000/', JSON.stringify(nuevoAnimal), {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }
    catch (err) {
        console.log(err.message)
    }
};

export const getAnimal = async(id)=>{
    try {
        await axios.get(`http://localhost:3000/:${id}`);
    }
    catch (err) {
        console.log(err.message)
    }
};

export const updateAnimal = async(id, nuevoAnimal)=>{
    try {
        await axios.put(`http://localhost:3000/:${id}`, nuevoAnimal);
    }
    catch (err) {
        console.log(err.message)
    }
};