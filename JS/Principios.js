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

/***    Velocidad de un codigo
 * 
 ***/

const inicio=performance.now();
for (let i = 0; i < 1000000000; i++) {
    
}
const fin=performance.now();
console.log(`El codigo tardó ${fin-inicio} milisegundos`);


/***     
 * * <script src="js/app.js" async></script>
 * ? Async :    Descarga y ejecuta el codigo de forma inmediata despues de que se carga la pagina
 * * <script src="js/app.js" defer></script>
 * ? Defer:     No ejecuta el codigo hasta que el HTML se haya cargado por completo
 ***/


/***
 * 
 * * Cuando queremos saber que variables se estan usando en el codigo
 * ? debugger;
 * 
 ***/  


/***
 * 
 * * Ir a Memory y tomar un SnapShot
 * * Saber que funciones gastan mas memoria
 * ? SnapShot
 * 
 ***/  




/*** Seguridad   
 *  ? 1. No usar variables globales
 * ? 2. No usar eval()
 * ? 3. No usar innerHTML(solamente para leer datos donde la fuente es segura)
 * ? 4. No usar funciones con parametros dinamicos
 * ! 5. No usar DOM Scripting (escapa datos y evita riesgos), usar textContent
 * ? 6. Usar JWT o Auth0
 * ? 7. Usar HTTPS
 * ? 8. Usar CORS
 * ? 9. Usar CSP
 * ? 10. Usar SRI
 * ? 11. XSS
 * ? 12. SQL Injection
 * ? 13. CSRF
 * ? 14. Clickjacking
 * ! 15  Dependencias, verificar que no tengan vulnerabilidades SNYK.IO
 * ? 16. Usar un framework de seguridad
 * ! 17. Hashear informacion sensible BCRYPT
 *  
 ***/