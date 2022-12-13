/***    Explicit binding
 * 
 ***/

function persona(el1,el2) {
    console.log(`Mi nombre es ${this.nombre} y escucho ${el1} y ${el2}`);
}

const informacion={
    nombre:'Juan'
}

const musicaFavorita=['Rock','Jazz'];

persona.call(informacion,musicaFavorita[0],musicaFavorita[1]);

persona.apply(informacion,musicaFavorita);

const nuevaFn=persona.bind(informacion,musicaFavorita[0],musicaFavorita[1]);
nuevaFn();


/***    Event Loop
 * 
 ***/

console.log('Primero1')

setTimeout(()=>{
    console.log('Ultimo');
},0);

new Promise(function(resolve){
    resolve('Cuarto4...')
}).then(console.log);

function hola() {
    console.log('Tercero3');
}

hola();

/***    SELF
 * 
 ***/
window.onload=()=>{
    console.log('Ventana window');
}

self.onload=()=>{
    console.log('Ventana self');
}

