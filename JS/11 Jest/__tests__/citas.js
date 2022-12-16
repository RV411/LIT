import Citas  from "../js/classes/Citas.js";

describe('Probar la clase de Citas',()=>{

    const citas=new Citas();
    const id=Date.now();

    test('Agregar una nueva cita',()=>{
        const citaObj = {
            id,
            mascota: 'Hook',
            propietario: 'Juan',
            telefono: '19030913',
            fecha: '10-12-2020',
            hora:'10:30',
            sintomas: 'Solo duerme'
        };
        citas.agregarCita(citaObj);

        //Prueba
        expect(citas).toMatchSnapshot();
    });

    test('Actualizar cita',()=>{
        const citaActualizada = {
            id,
            mascota: 'Captain',
            propietario: 'Juan',
            telefono: '19030913',
            fecha: '10-12-2020',
            hora:'10:30',
            sintomas: 'Solo duerme'
        };
        citas.editarCita(citaActualizada);

        expect(citas).toMatchSnapshot();
    });

    test('Eliminar cita',()=>{
        citas.eliminarCita(id);
        expect(citas).toMatchSnapshot();
    })
});