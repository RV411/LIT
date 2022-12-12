//* campos formulario
let DB;
const mascotaInput=document.querySelector('#mascota');
const propietarioInput=document.querySelector('#propietario');
const telefonoInput=document.querySelector('#telefono');
const fechaInput=document.querySelector('#fecha');
const horaInput=document.querySelector('#hora');
const sintomasInput=document.querySelector('#sintomas');

//* UI
const formulario=document.querySelector('#nueva-cita');
const contenedorCitas=document.querySelector('#citas');

let editando;

window.onload=()=>{
    eventListeners();

    crearDB();
}

class Citas{

    constructor(){
        this.citas=[];
    }

    agregarCita(cita){
        this.citas=[...this.citas,cita];
    }

    eliminarCita(id){
        this.citas=this.citas.filter(cita=>cita.id!==id);
    }

    editarCita(citaActualizada){
        this.citas=this.citas.map(cita=>cita.id===citaActualizada.id?citaActualizada:cita);
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        //* Crear div
        const divMensaje=document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //* Agregar clase en base al tipo de error
        if (tipo==='error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //* Mensaje de error
        divMensaje.textContent=mensaje;

        //* Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        //* Quitar alerta despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas(){
        this.limpiarHTML();
        this.textoHeading(citas);
        const objectStore=DB.transaction('citas').objectStore('citas');
        citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;

            const divCita=document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id=id;

            //* Scripting de los elementos de la cita
            const mascotaParrafo=document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent=mascota;

            const propietarioParrafo=document.createElement('p');
            propietarioParrafo.innerHTML=`
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const telefonoParrafo=document.createElement('p');
            telefonoParrafo.innerHTML=`
                <span class="font-weight-bolder">Telefono: </span>${telefono}
            `;

            const fechaParrafo=document.createElement('p');
            fechaParrafo.innerHTML=`
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            const horaParrafo=document.createElement('p');
            horaParrafo.innerHTML=`
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo=document.createElement('p');
            sintomasParrafo.innerHTML=`
                <span class="font-weight-bolder">Sintomas: </span>${sintomas}
            `;

            //* Boton para eliminar cita
            const btnEliminar=document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML='Eliminar &times;';
            btnEliminar.onclick=()=>eliminarCita(id);

            //* Boton para editar cita
            const btnEditar=document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML='Editar &times;';
            btnEditar.onclick=()=>cargarEdicion(cita);

            //* Agregar parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            //* agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui=new UI();
const administrarCitas=new Citas();


//* Registrar evento

function eventListeners() {
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita);
}

//* Objeto principal
const citaObj={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:'',
}


//* Agrega datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name]=e.target.value;
}

function nuevaCita(e) {
    e.preventDefault();
    const{mascota,propietario,telefono,fecha,hora,sintomas}=citaObj;

    if (mascota===''|| propietario===''|| telefono===''|| fecha===''|| hora===''|| sintomas==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente'); 
        //* Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        //* Pasar el objeto de la cita a edicion
        formulario.querySelector('button[type="submit"]').textContent='Crear Cita';

        //* quitamos el modo edicion
        editando=false;
    }else{
        //* Generar un id unico
        citaObj.id=Date.now();

        //* Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //* Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});
        const transaction=DB.transaction(['citas'],'readwrite');// Insertar registro en IndexDB
        const objectStore=transaction.objectStore('citas');
        objectStore.add(citaObj);
        transaction.oncomplete=function(){
            console.log('cita agregada');
            //* Mensaje de agregado correctamente
            ui.imprimirAlerta('Se agrego correctamente');
        }
        
    }

    //* Reiniciar el objeto para la validacion
    reiniciarObjeto();

    //* Reiniciar el formulario
    formulario.reset();

    //* imprimir las citas
    ui.imprimirCitas();
}

function reiniciarObjeto() {
    citaObj.mascota='';
    citaObj.propietario='';
    citaObj.telefono='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

function eliminarCita(id){
    //* Eliminar la cita
    administrarCitas.eliminarCita(id);

    //* Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //* Refrescar las citas
    ui.imprimirCitas();
}

function cargarEdicion(cita){
    const{mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;

    //* Llenar los inputs
    mascotaInput.value=mascota;
    propietarioInput.value=propietario;
    telefonoInput.value=telefono;
    fechaInput.value=fecha;
    horaInput.value=hora;
    sintomasInput.value=sintomas;

    //* Llenar el objeto
    citaObj.mascota=mascota;
    citaObj.propietario=propietario;
    citaObj.telefono=telefono;
    citaObj.fecha=fecha;
    citaObj.hora=hora;
    citaObj.sintomas=sintomas;
    citaObj.id=id;

    //* Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent='Guardar Cambios';

    //* Agregar el id al objeto
    editando=true;
}

function crearDB(){
    const crearDB = window.indexedDB.open('citas',1);

    crearDB.onerror=function () {
        console.log('Error');
    }

    crearDB.onsuccess=function(){
        console.log('Exito');

        DB=crearDB.result;
    }

    //Definir el schema
    crearDB.onupgradeneeded=function(e){
        const db=e.target.result;

        const objectStore= db.createObjectStore('citas',{
            keyPath:'id',
            autoIncrement:true
        });

        objectStore.createIndex('mascota','mascota',{unique:false});
        objectStore.createIndex('propietario','propietario',{unique:false});
        objectStore.createIndex('telefono','telefono',{unique:false});
        objectStore.createIndex('fecha','fecha',{unique:false});
        objectStore.createIndex('hora','hora',{unique:false});
        objectStore.createIndex('sintomas','sintomas',{unique:false});
        objectStore.createIndex('id','id',{unique:true});
    }
}