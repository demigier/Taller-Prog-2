//Tiene que inicializar el RegistroDeAnimales con datos para ser consumidos por las siguientes dos páginas que consumen los datos registrados.

import fs from 'fs'
import path from 'path'

import {Animal, registroDeAnimales} from './JavaScript1.js'
import {createAnimal} from './api/rest_client.js';

const __dirname = path.resolve();

//Instancio los animales
var animal1 = new Animal(154, 'perro', 'bulldog frances', 'India', 15154, '10/04/2020', 102, 99, 'Matias', 15246765741);
var animal1a = new Animal(102, 'perro', 'bulldog frances', 'Paola', 1103, '18/02/2017', 87, 96, 'Lorena', 112474555);
var animal1b = new Animal(99, 'perro', 'bulldog frances', 'Roberto', 1111, '27/01/2017', 82, 91, 'Lorena', 112474555);
//Instancio los padres de los padres anterior
var animal1aa = new Animal(87, 'perro', 'bulldog frances', 'Carola', 1103, '18/12/2014', 55, 53, 'Lorena', 112474555);
var animal1ab = new Animal(96, 'perro', 'bulldog frances', 'Jacobo', 1111, '17/11/2014', 47, 42, 'Lorena', 112474555);

var animal1ba = new Animal(82, 'perro', 'bulldog frances', 'Paola', 1103, '13/07/2013', 41, 40, 'Lorena', 112474555);
var animal1bb = new Animal(91, 'perro', 'bulldog frances', 'Hector', 1111, '09/09/2013', 33, 37, 'Lorena', 112474555);
//Instancio otro animal
var animal2 = new Animal(160, 'perro', 'doberman', 'Carlos', 2454, '20/01/2017', 45, 24, 'Manolo', 1256485456);
var animal2b = new Animal(24, 'perro', 'doberman', 'Gaston', 541, '20/01/2015', 20, 16, 'Cristian', 7578587);
var animal2a = new Animal(45, 'perro', 'doberman', 'Lorena', 545, '20/01/2014', 22, 17, 'Pablo', 45375);


//Instancio el RegistroDeAnimales
// var registroDeAnimales = new RegistroDeAnimales();
var nuevos = [];
nuevos.push(animal2b);
nuevos.push(animal2a);
nuevos.push(animal2);
nuevos.push(animal1bb);
nuevos.push(animal1ba);
nuevos.push(animal1ab);
nuevos.push(animal1aa);
nuevos.push(animal1b);
nuevos.push(animal1a);
nuevos.push(animal1);



// registroDeAnimales.guardar();
createAnimal(nuevos);

// createAnimal(new Animal (80, 'lombriz', 'roja', 'Paulina', 545, '20/01/2015', 7, 5, 'Pedro', 45375));

export var animal1bb;