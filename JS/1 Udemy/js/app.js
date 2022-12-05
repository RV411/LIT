// variables
const carrito =document.querySelector('#carrito');
const contenedorCarrito =document.querySelector('#contenedor-carrito tbody');
const vaciarCarritoBtn =document.querySelector('#vaciar. carrito');
const listaCursos =document.querySelector('#lista- cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners() {
    //agregar curso "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //eliminar curso
    carrito.addEventListener('click',eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[];
        limpiarHTML();
    })
}

// function
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId=e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(curso=> curso.id!==cursoId);
        carritoHTML();//? iterar sobre el carrito y mostrar su HTML
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
    const exist=articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if(exist){
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
    }else{
        articulosCarrito=[...articulosCarrito,infoCurso];
    }

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
            <a href="#" class="borrar-curso" data-id="${id}">x</a>{

            }else{

            }
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
