/***
 * 
 * * End to End - Simula clicks, llena formularios, 
 * ? Cypress
 * 
 * 
 * * Integracion - Revisa multiples partes del proyecto
 * ? Jest
 * 
 * * Unit - Revisa cada partes del proyecto
 * 
 * * Static - Revisar por errores en el codigo mientras se escribe
 * ? Typrescript
 ***/  


describe('Grupo de pruebas',()=>{   //* multiples test
    test('Hola Mundo',()=>{});      //* test o it
    test('Hola Jest',()=>{});
});

//! Funciona para String y arrays

const password="123456"
describe('Valida que no este vacio y sea de 6',()=>{   //* multiples test
    test('6 caracteres',()=>{//* test o it
        expect(password).toHaveLength(6);
    });      

    test('No este vacio',()=>{//* test o it
        expect(password).not.toHaveLength(0);
    });
});

//! Objetos

const cliente={
    nombre:'MALO',
    balance:500
};

describe('Testing al cliente',()=>{
    test('El cliente es premium',()=>{
        expect(cliente.balance).toBeGreaterThan(400);
    })

    test('MALO',()=>{
        expect(cliente.nombre).toBe('MALO');
    })

    test('No es otro cliente',()=>{
        expect(cliente.nombre).not.toBe('AMLO');
    });
});

//! Snapshot

const persona={
    nombre:'Aaron',
    balance:500,
    tipo:'Premium'
}

describe('Test',()=>{
    test('Es Aaron',()=>{
        expect(persona).toMatchSnapshot();
    })
})













