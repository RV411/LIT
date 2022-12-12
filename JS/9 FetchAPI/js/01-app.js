/*** Cargar TXT
 * 
 ***/
const cargarTxtBtn= document.querySelector('#cargarTxt');
cargarTxtBtn.addEventListener('click',obtenerDatosTXT);

function obtenerDatosTXT() {
    const url='datos/datos.txt'

    fetch(url)
        .then(respuesta=>{
            console.log(respuesta);
            console.log(respuesta.status);
            console.log(respuesta.statusText);
            console.log(respuesta.url);
            console.log(respuesta.type);

            return respuesta.text();
        })
        .then(datos=>{      //* imprimir datos
            console.log(datos);
        })
        .catch(error=>{
            console.log(error);
        })
}

/*** Cargar JSON
 * 
 ***/
document.addEventListener('DOMContentLoaded',obtenerDatosJSON); //! de forma automatica

const cargarJSONBtn=document.querySelector('#cargarJSON');      //! se debe de hacer click
cargarJSONBtn.addEventListener('click',obtenerDatosJSON);

function obtenerDatosJSON() {
    const url1='data/empleado.json';
    fetch(url1)
        .then(respuesta=> respuesta.json())
        .then(resultado=>mostrarHTML1(resultado))

    const url2='data/empleados.json';
    fetch(url2)
        .then(respuesta=> respuesta.json())
        .then(resultado=>mostrarHTML2(resultado))
    
    const url3='https://picsum.photos/list';
    fetch(url3)
        .then(respuesta=> respuesta.json())
        .then(resultado=>mostrarHTML3(resultado))
}

function mostrarHTML1({empresa,id,nombre,trabajo}) {
     const contenido=document.querySelector('.contenido');

     contenido.innerHTML=`
     <p>Empleado : ${nombre}</p>
     <p>ID : ${id}</p>
     <p>Empresa : ${empresa}</p>
     <p>Trabajo : ${trabajo}</p>
     `;
}

function mostrarHTML2(empleados) {
    const contenido=document.querySelector('.contenido');
    let html='';

    empleados.forEach(empleado => {
        const {empresa,id,nombre,trabajo}=empleado;

        html +=`
            <p>Empleado : ${nombre}</p>
            <p>ID : ${id}</p>
            <p>Empresa : ${empresa}</p>
            <p>Trabajo : ${trabajo}</p>
        `;
    });
    contenido.innerHTML=html;
}

function mostrarHTML3(datos) {
    const contenido=document.querySelector('.contenido');
    let html='';

    datos.forEach(dato => {
        const {author,post_url}=dato;

        html +=`
            <p>Autor : ${author}</p>
            <a href:"${post_url}" target="_blank"> Ver Imagen</a>
        `;
    });
    contenido.innerHTML=html;
}






