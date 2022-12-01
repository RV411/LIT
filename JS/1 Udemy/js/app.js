const carrito =document.querySelector('#carrito');
const contenedorCarrito =document.querySelector('#contenedor-carrito tbody');
const vaciarCarritoBtn =document.querySelector('#vaciar. carrito');
const listaCursos =document.querySelector('#lista- cursos');

cargarEventListeners();
function cargarEventListeners() {
    //agregar curso "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso)
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
    }
    console.log(infoCurso);
}
