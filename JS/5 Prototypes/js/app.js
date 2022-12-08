//Constructores
function Seguro(marca,year,tipo) {
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}

//Realiza cotizacion

Seguro.prototype.cotizarSeguro=function() {
    /**
      * 1   America
      * 2   Asia
      * 3   Europa
    */
   let cantidad;
   const base=2000;

   switch (this.marca) {
    case '1':
        cantidad=base*1.15;
        break;
    case '2':
        cantidad=base*1.25;
        break;
    case '3':
        cantidad=base*1.35;
        break;
    default:
        break;
   }

   const diferencia=new Date().getFullYear()- this.year;
   cantidad-=((diferencia*3)*cantidad)/100;

   /**
    * Basico 30%
    * Completo 50%
   */
   if (this.tipo==='basico') {
    cantidad*=1.30;
   } else {
    cantidad*=1.50;
   }

   return cantidad;
}

function UI() {}

// Llena los años
UI.prototype.llenarOpciones=()=>{
    const max=new Date().getFullYear(),
          min=max-20;

    const selectYear=document.querySelector('#year');

    for(let i=max;i>min;i--){
        let option=document.createElement('option');
        option.value=i;
        option.textContent=i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje=(mensaje,tipo)=>{
    const div=document.createElement('div');

    if(tipo==='error'){
        div.classList.add('error');        
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje','mt-10');
    div.textContent=mensaje;

    //insertar HTML
    const formulario=document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado=function(total,seguro) {
    const{marca,year,tipo}=seguro;

    let textBrand;
    switch (marca) {
        case '1':
            textBrand='AMERICANO';
            break;
        case '2':
            textBrand='ASIATICO';
            break;
        case '3':
            textBrand='EUROPEO';
            break;
        default:
            break;
       }

    // crear resultado
    const div=document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textBrand}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal" capitalize>${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
        `;
        
    const resultadoDiv=document.querySelector('#resultado');

    const spinner=document.querySelector('#cargando');
    spinner.style.display='block';

    setTimeout(() => {
        spinner.style.display='none';
        resultadoDiv.appendChild(div);

    }, 3000);
}


//instanciar el UI
const ui=new UI();

document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();
})

eventListeners();
function eventListeners() {
    const formulario=document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);

}

function cotizarSeguro(e) {
    e.preventDefault();

    //leer la marca
    const marca=document.querySelector('#marca').value;

    //leer año
    const year=document.querySelector('#year').value;

    //tipo cobertura
    const tipo=document.querySelector('input[name="tipo"]:checked').value;

    if(marca===''||year===''||tipo===''){
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }

    ui.mostrarMensaje('Cotizando ...','exito'); 

    //Ocultar las cotizaciones
    const resultados=document.querySelector('#resultado div');
    if (resultados!=null) {
        resultados.remove();
    }

    
    // instanciar el seguro
    const seguro=new Seguro(marca,year,tipo);
    const total=seguro.cotizarSeguro();


    ui.mostrarResultado(total,seguro);
}