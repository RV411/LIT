//variables
const formulario=document.querySelector('#formulario');
const listaTweets=document.querySelector('#lista-tweets');
let tweets=[];

//eventos
eventListeners();

function eventListeners() {
    //cuando se agrega
    formulario.addEventListener('submit',agregarTweet);

    //cuando esta en el localStorage
    document.addEventListener('DOMContentLoaded',()=>{
        tweets=JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}

//funciones
function agregarTweet(e) {
    e.preventDefault();

    const tweet=document.querySelector('#tweet').value;

    if(tweet===''){
        mostrarError('No puede ir vacio');
        return;
    }

    const tweetObj={
        id:Date.now(),
        tweet
    }
    //Añadir el tweet
    tweets=[...tweets,tweetObj];

    crearHTML();

    formulario.reset();
}

function mostrarError(mensaje) {
    const mensajeError=document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('error');

    //insertando en el contenido
    const contenido= document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina alerta tras 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();

    if(tweets.length>0){
        tweets.forEach(tweet=>{
            const btnEliminar=document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X';
            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id);
            }

            const li=document.createElement('li');

            li.innerText=tweet.tweet

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets=tweets.filter(tweet=>tweet.id!==id);
}

