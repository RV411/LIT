import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import { mascotaInput,propietarioInput,telefonoInput,fechaInput,horaInput,sintomasInput,formulario } from "./selectores.js";

const administrarCitas=new Citas();
const ui=new UI(administrarCitas); 

let editando=false;

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
export function datosCita(e) {
    citaObj[e.target.name]=e.target.value;
}

export function nuevaCita(e) {
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

        //* Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }

    //* Reiniciar el objeto para la validacion
    reiniciarObjeto();

    //* Reiniciar el formulario
    formulario.reset();

    //* imprimir las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota='';
    citaObj.propietario='';
    citaObj.telefono='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

export function eliminarCita(id){
    //* Eliminar la cita
    administrarCitas.eliminarCita(id);

    //* Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //* Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita){
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


