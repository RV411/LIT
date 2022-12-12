
/*** Notificaciones
 *
 ***/

 const notificarBtn=document.querySelector('#notificar');

 notificarBtn.addEventListener('click',()=>{
     Notification
         .requestPermission()
         .then(resultado=>{
             console.log('El resultado es ',resultado);
         })
 });
 
 const verNotificacion=document.querySelector('#verNotificacion');
 verNotificacion.addEventListener('click',()=>{
     if(Notification.permission==='granted'){
         const notificacion=new Notification('Notificación',{
             icon:'img/ccj.png',
             body:'Código con Juan'
         });
 
         notificacion.onclick=function(){
             window.open('https://www.youtube.com/c/CodigoConJuan');
         }
     }
 });
 
 
 /*** Interseccion Observer
  *
  *  Saber cuando un elemento esta visible en la pantalla
  ***/
 document.addEventListener('DOMContentLoaded',()=>{
     const observer=new IntersectionObserver((entries)=>{
         if(entries[0].isIntersecting){
             console.log('Ya esta visible');
         }
     });
     observer.observe(document.querySelector('.premium'));
 });
 
 /*** Internet
  * 
  ***/
 window.addEventListener('online',actualizarEstado);
 window.addEventListener('offline',actualizarEstado);
 
 function actualizarEstado(){
     if(navigator.onLine){
         console.log('Internet');
     }else{
         console.log('No Internet');
     }
 }
 
 /***  Full Screen
  * 
  ***/
 
 const abrirBtn=document.querySelector('#abrir-pantalla-completa');
 const salirBtn=document.querySelector('#salir-pantalla-completa');
 const video=document.querySelector('#video');
 
 abrirBtn.addEventListener('click',()=>{
     video.requestFullscreen();
 });
 
 salirBtn.addEventListener('click',()=>{
     document.exitFullscreen();
 })
 
 /*** Visibility State 
  * 
  ***/
 
 document.addEventListener('visibilitychange',()=>{
     if(document.visibilityState==='visible'){
         console.log('Dentro de la pestaña');
     }else{
         console.log('Fuera de la pestaña');
     }
 })
 
 /***  Speech Recognition
  * 
  ***/
 
 const salida=document.querySelector('#salida');
 const microfono=document.querySelector('#microfono');
 
 microfono.addEventListener('click',ejecutarSpeechAPI);
 
 function ejecutarSpeechAPI(){
     const SpeechRecognition=webkitSpeechRecognition;
     const recognition=new SpeechRecognition();
     
     recognition.start();    //* Inicializar grabación
 
     recognition.onstart=()=>{   //* Inicia grabación
         salida.classList.add('mostrar');
         salida.textContent='Escuchando...';
     }
 
     recognition.onspeechend=()=>{    //* Terminar grabación
         salida.textContent='Se termino de grabar';
         recognition.stop();           //* Detener grabación
     }
 
     recognition.onresult=(e)=>{     //* Mostrar Resultado 
         console.log(e.results[0][0]);
         const {confidence,transcript}=e.results[0][0];  //* Destructuring de objetos    confidence: porcentaje que trato de adivinar    transcript: Lo que estas diciendo
         const speech=document.createElement('p');   
         speech.innerHTML=`Grabado: ${transcript}`;  
         const seguridad=document.createElement('p');
         seguridad.innerHTML=`Seguridad: ${parseInt(confidence*100)}%`;
         salida.appendChild(speech);
         salida.appendChild(seguridad);
     }
 }
 
 /*** Service Worker
  * 
  * Sirve para manejar peticiones http
  *  - Cache
  *  - Push
  *  - Sync
  *  - Background Fetch
  *  - Notificaciones
  *  - Geolocalización
  *  - etc
  ***/
