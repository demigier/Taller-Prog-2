/*Que haga uso del RegistroDeAnimales y vuelque información del arbol genealógico descendente 
del animal solicitado (tantas generaciones como indica el parámetro profundidad). Debe guardar la información en un archivo.*/

import fs from 'fs'
import path from 'path'

import {registroDeAnimales, animal1bb} from './JavaScript2.js'

const __dirname = path.resolve();

const arbolGenealogico = registroDeAnimales.arbolGenealogicoHaciaAbajo(animal1bb, 6);

console.log(arbolGenealogico);

let txt = JSON.stringify(arbolGenealogico, null, "\t");

fs.writeFile(path.resolve(__dirname, 'arbolDesc.txt'), txt, (err) => {
    if (err) {
        console.error("Los datos no pudieron ser grabados");
    }
    else {
        console.log("Los datos fueron grabados");
    }
});