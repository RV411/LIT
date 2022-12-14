/*** Constructor 
 * 
 ***/

class Persona{
    constructor(nombre,email){
    this.nombre=nombre;
    this.email=email;
    }
}

class Cliente extends Persona{
    constructor(nombre,email,empresa){
        super(nombre,email);
        this.empresa=empresa;
    }
}

const persona=new Persona('Juan','email@correo.com');
const Cliente=new Cliente('Juan','email@correo.com','ESCOM');


/*** Singleton 
 * 
 ***/

let instancia=null;

class Escomio{
    constructor(nombre,email){
        if(!instancia){
            this.nombre=nombre;
            this.email=email;
            instancia=this;
        }else{
            return instancia;
        }
    }
}

//? El segundo es la misma instacia del primero
const escum=new Escomio('Lolo','sae@cattt.com');
const escum2=new Escomio('Lolo2222','sae@cattt.com');



/*** Factory 
 *  Crea objetos
 *  basados en cierta condicion
 ***/

class InputHTML{
    constructor(type,nombre){
        this.type=type;
        this.nombre=nombre
    }

    crearInput(){
        return `<input type="${this.type}" name="${this.nombre}" id="${this.type}">`
    }
}

class HTMLFactory{
    crearElemento(tipo,nombre){
        switch (tipo) {
            case 'text':
                return new InputHTML('text',nombre)
            case 'email':
                return new InputHTML('email',nombre)                        
            default:
                return;
        }
    }
}

const elemento=new HTMLFactory();
const inputText=elemento.crearElemento('text','nombre-cliente');

const elemento2=new HTMLFactory();
const inputText2=elemento.crearElemento('email','email-cliente');

console.log(inputText.crearInput());




/*** Module 
 * 
 ***/

const modulo=(function () {
    const nombre='Juan';

    function hola() {
        console.log('hola');
    }

    return{
        nombre,
        hola
    }
})();


/*** Mixin ( Yo le entendi Heredar)
 * 
 ***/
 const functionesPersona={
    mostrarInformacion(){
        console.log(`Nombre Persona ${this.nombre} Email: ${this.email}`);
    },
    mostarNombre(){
        console.log(`Mi nombre es ${this.nombre} `)
    }
 }

// Añadir funciones a la clase Persona
Object.assign(Persona.prototype, functionesPersona);
Object.assign(Cliente.prototype, functionesPersona);

const persona3=new Persona('Juan','email@correo.com');
console.log(persona3);
cliente3.mostrarInformacion();

const cliente3=new Cliente('Juan','email@correo.com');
console.log(cliente3);
cliente3.mostarNombre();



/*** Namespace
 * 
 * ? Evita chocar con otras variables o funciones
 ***/

const restaurantApp={}; // aqui se guardaran const y function

restaurantApp.platillos=[
    {
        platillo:'pizza',
        precio:25
    },
];


restaurantApp.functiones={
    mostrarMenu:platillos=>{
        console.log('Bienvenidos a nuestro menu');

        platillos.forEach((platillo,index) => {
            console.log(`${index} : ${platillo.platillo} $${platillo.precio}`);
        });
    },
    ordenar:id=>{
        console.log(`Tu platillo ${restaurantApp.platillos[id].platillo} se esta preparando`);
    },
    agregarPlatillo:(platillo,precio)=>{
        const nuevo={
            platillo,
            precio
        };
        restaurantApp.platillos.push(nuevo);
    }
}

restaurantApp.functiones.ordenar(1);
restaurantApp.functiones.agregarPlatillo('Taco',20);

const{platillos}=restaurantApp;
restaurantApp.functiones.mostrarMenu(platillos);



/*** Mediator
 * 
 * ? Evita chocar con otras variables o funciones
 ***/

function Vendedor(nombre) {
    this.nombre=nombre;
    this.sala=null
}

Vendedor.prototype={
    oferta:(articulo,precio)=>{
        console.log(`Tenemos el siguiente articulo ${articulo}, iniciamos con un precio de ${precio}`);        
    },
    vendido:comprador=>{
        console.log(`Vendido a ${comprador}`);
    }
}

function Comprador(nombre) {
    this.nombre=nombre;
    this.sala=null
}

Comprador.prototype={
    oferta:(cantidad,comprador)=>{
        console.log(`${comprador.nombre} : ${cantidad}`);
    }
}

function Subasta() {
    let Compradores={};

    return {
        registrar:usuario=>{
            Compradores[usuario.nombre]=usuario;
            usuario.sala=this;
        }
    }
}


// Crear Objetos
const juan=new Comprador('Juan');
const pablo=new Comprador('Pablo');
const vendedor= new Vendedor('Vendedor de autos');
const subasta=new Subasta();

// Tienen que estar registrados
subasta.registrar(juan);
subasta.registrar(pablo);
subasta.registrar(vendedor);

vendedor.oferta('Mustang 66',300);
juan.oferta(350,juan);
pablo.oferta(450,pablo);
juan.oferta(500,juan);
pablo.oferta(700,pablo);

vendedor.vendido('Pablo');