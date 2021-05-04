import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export class Animal {
    constructor(id, tipo, raza, nombre, nroRegistro, fechaNacimiento, madreId, padreId, nombreDuenio, telefonoDuenio) {
        this.id = id;
        this.tipo = tipo;
        this.raza = raza;
        this.nombre = nombre;
        this.nroRegistro = nroRegistro;
        this.fechaNacimiento = fechaNacimiento;
        this.duenio = this.agregarDuenio(nombreDuenio, telefonoDuenio);
        this.familia = this.agregarFamilia(madreId, padreId);
        this.crias = [];
    }

    agregarDuenio(nombreDuenio, telefonoDuenio){
        return new Duenio(nombreDuenio, telefonoDuenio);
    }

    agregarFamilia(madreId, padreId){
        return new Familia(madreId, padreId);
    }

    agregarCria(criaId){
        this.crias.push(criaId);
    }
}

class Duenio {
    constructor(nombreDuenio, telefonoDuenio) {
        this.nombre = nombreDuenio;
        this.telefono = telefonoDuenio;
    }
}

class Familia {
    constructor(madreId, padreId) {
        // this.crias = [];
        this.madreId = madreId;
        this.padreId = padreId;
    }
    // agregarCria(criaId){
    //     this.crias.push(criaId);
    // }
}

export class RegistroDeAnimales {
    constructor() {
        this.registro = [];
        this.leer();
    }

    agregarAnimal(animal) {
        var pude = true;

        if (this.buscarAnimalPorId(animal.id)/*!=null*/) {
            pude = false;//ya está en la lista
        }
        else {
            this.registro.push(animal);
            const padre = this.buscarAnimalPorId(animal.familia.madreId);
            const madre = this.buscarAnimalPorId(animal.familia.padreId);

            if(madre != null && padre != null){
                padre.agregarCria(animal.id);
                madre.agregarCria(animal.id);
            }
        }

        return pude;
    }

    actualizarAnimal(animal) {
        let i = 0;
        let pude = false;

        while (i < this.registro.length && !pude) {
            if (this.registro[i].id == animal.id) {
                this.registro[i] = animal;
                pude = true;
            }else {
                i++;
            }
        }
        if(!pude){
            console.error('No es posible actualizar ya que ese animal no existe');
        }
    }

    guardar() {
        if(this.registro.length > 0){
            let txt = JSON.stringify(this.registro);

            fs.writeFile(path.resolve(`${__dirname}/api`, 'db.json'), txt, (err) => {
                if (err) {
                    console.error("Los datos no pudieron ser grabados");
                }
                else {
                    console.log("El registro fue grabado");
                }
            });
        }
    }

    leer() {
        const __dirname = path.resolve();

        fs.readFile(path.resolve(`${__dirname}/api`, 'db.json'), 'utf-8', (err, data) => {
            if (!err) {
                this.registro = JSON.parse(data);
            }
        })
    }

    buscarAnimalPorId(animalId, callback) {
        let buscado = null;
        let i = 0;

        while (i < this.registro.length && buscado == null) {
            if (this.registro[i].id == animalId) {
                buscado = this.registro[i];
            }
            else {
                i++;
            }
        }

        //Hacer algo con la callback...

        return buscado;
    }

    buscarAnimalPorRegistro(nroRegistro, callback) {
        let buscado = null;
        let i = 0;

        while (i < registo.length && buscado == null) {
            if (registro[i].nroRegistro == nroRegistro) {
                buscado = registro[i];
            }
            else {
                i++;
            }
        }

        //Hacer algo con la callback...

        return buscado;
    }

    obtenerAnimalesPorDuenio(nombreDuenio, callback) {
        let seleccion = [];

        this.registro.forEach(animal => {
            if (animal.nombreDuenio == nombreDuenio) {
                seleccion.push(animal);
            }
        });

        return seleccion;
    }


    //RegistroDeAnimales.arbolGenealogicoHaciaAbajo(animal, profundidad, callback(animal, relacion = null))
    arbolGenealogicoHaciaAbajo(animal, profundidad, callback) {
        let arbol = [];
        let descNula = false;

        const arrNulo = function (array) {
            let cont = 0;

            array.forEach((element) => {
                if (element == null) cont++;
            });
            return cont == array.length;
        };

        if (animal == null || animal == undefined)
            throw Error("Error al ingresar el parametro");

        arbol[0] = [];
        arbol[0][0] = animal;

        for (let i = 0, fSig = []; i < profundidad && !descNula; i++, fSig = []) {
            for (let j = 0, act = null; j < arbol[i].length; j++) {
                act = arbol[i][j];

                // if (act != null) {
                    //cargo los hijos la fila aux.
                    var crias = [];
                    
                    act.crias.forEach(idCria => {
                        var cria = this.buscarAnimalPorId(idCria);
                        if(cria != null){
                            crias.push(cria);
                        }
                    });

                    fSig = fSig.concat(crias);
                // } else {
                //     //sino, cargo nulos(?) en la fila aux.
                //     //fSig = fSig.concat(null);
                // }
            }

            //si la fila no es nula => push()
            if (!arrNulo(fSig) || !fSig.length == 0) {
                arbol.push(fSig);
            } else {
                descNula = true;
            }
        }
        return arbol;
    }

    arbolGenealogicoHaciaArriba(animal, profundidad, callback) {
        let arbol = [];
        let ascNula = false;

        const arrNulo = function (array) {
            let nulos = 0;

            array.forEach((element) => {
                if (element == null) nulos++;
            });
            return nulos == array.length;
        };

        if (animal == null || animal == undefined)
            throw Error("Error al ingresar el parametro");

        arbol[0] = [];
        arbol[0][0] = animal;

        for (let i = 0, fSig = []; i < profundidad && !ascNula; i++, fSig = []) {//FILAS
            for (let j = 0, act = null; j < arbol[i].length; j++) {//COLUMNAS
                act = arbol[i][j];

                if (act != null) {
                    //cargo los padres en la fila sigiente.
                    const madre = this.buscarAnimalPorId(act.familia.madreId);
                    const padre = this.buscarAnimalPorId(act.familia.padreId);

                    fSig = fSig.concat([madre,padre]);
                } else {
                    //sino, cargo un par de nulos en la fila sigiente a la actual.
                    fSig = fSig.concat([null, null]);
                }
            }

            //si la fila no es nula => push()
            if (!arrNulo(fSig)) {
                arbol.push(fSig);
            } else {
                ascNula = true;
            }
        }
        return arbol;
    }
}

var registroDeAnimales = new RegistroDeAnimales();
export var registroDeAnimales;
// module.exports = {Animal, RegistroDeAnimales};
// export default [Animal, RegistroDeAnimales};