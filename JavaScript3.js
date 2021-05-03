/*Que haga uso del RegistroDeAnimales y vuelque la información del arbol genealógico ascendente del animal solicitado 
(tantas generaciones como indica el parámetro profundidad). Debe mostrar la información por la consola.*/

import {Animal} from './JavaScript1.js'
import {registroDeAnimales} from './JavaScript1.js'


var animal = new Animal(154, 'perro', 'bulldog frances', 'India', 15154, '10/04/2020', 102, 99, 'Matias', 15246765741);
var animal2 = new Animal(154, 'perro', 'doberman', 'Carlos', 2454, '20/01/2017', 45, 24, 'Manolo', 1256485456);

const arbolGenealogico = registroDeAnimales.arbolGenealogicoHaciaArriba(animal, 5);

console.log(arbolGenealogico);