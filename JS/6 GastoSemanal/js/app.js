// Variable y Selectores
const formulario =document.querySelector('#agregar-gasto');
const gastoListado=document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);
}

// Classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
        this.gastos=[];
    }

    nuevoGasto(gasto){
        this.gastos=[...this.gastos,gasto];
    }

    calcularRestante(){
        const gastado=this.gastos.reduce((total,gasto)=>total+gasto.cantidad,0);
        this.restante=this.presupuesto-gastado;
    }

    eliminarGasto(id){
        this.gastos=this.gastos.filter(gasto=>gasto.id!==id);
        this.calcularRestante();
    }
}

class UI{

    insertarPresupuesto(cantidad){
        const{presupuesto,restante}=cantidad;
        document.querySelector('#total').textContent=presupuesto;
        document.querySelector('#restante').textContent=restante;

    }

    imprimirAlerta(mensaje,tipo){
        const divMensaje=document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent=mensaje;

        //insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //quitar mensaje
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos){
        this.limpiarHTML();
        //iterar gastos
        gastos.forEach(gasto=>{
            const {cantidad,nombre,id}=gasto;

            // Crer un LI
            const nuevoGasto=document.createElement('li');
            nuevoGasto.className='list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id=id;// poner dataid='id' en <li></li>

            //agregar HTML del gasto
            nuevoGasto.innerHTML=`${nombre} <span class="" badge-primary badge-pill> $ ${cantidad} </span>`;

            //Boton borrar el gasto
            const btnBorrar=document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.innerHTML='Borrar &times';
            btnBorrar.onclick=()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent=restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const{presupuesto,restante}=presupuestoObj;
        const restanteDiv=document.querySelector('.restante');

        if((presupuesto/4)>restante){
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto/2)>restante){
            restanteDiv.classList.remove('alert-success','alert-danger');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-warning','alert-danger');
            restanteDiv.classList.add('alert-success');
        }


        if(restante<=0){
            ui.imprimirAlerta('Presupuesto se agoto','error');
            formulario.querySelector('button[type="submit"]').disabled=true;
        }

    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

}

const ui=new UI();
let presupuesto;


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario=prompt('¿Cual es el presupuesto?');

    if(presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario<=0){
        window.location.reload();
    }

    //presupuesto valido
    presupuesto=new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
}


function agregarGastos(e) {
    e.preventDefault();
    const nombre=document.querySelector('#gasto').value;
    const cantidad=Number(document.querySelector('#cantidad').value);

    if(nombre==='' || cantidad===''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if(cantidad<=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no validad','error');
        return;
    }

    const gasto={nombre,cantidad,id:Date.now()};

    //añade el nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado Correctamente');

    const {gastos,restante}=presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

function eliminarGasto(id) {
    //elimina de la lista
    presupuesto.eliminarGasto(id);

    //elimina del HTML
    const {gastos,restante}=presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}
