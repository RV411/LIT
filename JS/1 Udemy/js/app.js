const carrito =document.querySelector('#carrito');
const contenedorCarrito =document.querySelector('#contenedor-carrito tbody');
const vaciarCarritoBtn =document.querySelector('#vaciar. carrito');
const listaCursos =document.querySelector('#lista- cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners() {
    //agregar curso "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);
}

// function
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// lee el contenido del HTML al que le damos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Agregar al carrito
    articulosCarrito=[...articulosCarrito,infoCurso];

    console.log(infoCurso);

    carritoHTML();
}

function carritoHTML(){
    limpiarHTML();

    articulosCarrito.forEach(curso=>{
        const{imagen,titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">x</a>
        </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {
    //* forma lenta    
    //articulosCarrito.innerHTML='';

    //* forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}
