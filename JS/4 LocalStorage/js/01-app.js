//! Escribir
localStorage.setItem('nombre',1);

const meseses={
    1:"enero",
    2:"febrero",
}

const meses=["enero","febrero","marzo"];

const productoString=JSON.stringify(producto);
localStorage.setItem('producto',productoString);


//! Leer
const nombre=localStorage.getItem('nombre');
console.log(nombre);

///para leer JSON
const productoJSON=localStorage.getItem('producto');
console.log(JSON.parse(productoJSON));


//! Borrar

localStorage.removeItem('nombre');

//borra todo localstorage
localStorage.clear();

//! Actualizar
const mesesArray=JSON.parse(localStorage.getItem('meses'));
mesesArray.push('Nuevo Mes');
localStorage.setItem('meses',JSON.stringify(mesesArray))
