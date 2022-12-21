// const express=requiere('express');
import express from "express";
import router from '../routes/index.js'
import db from '../config/db.js'

const app=express();

//* conectar base de datos
db.authenticate()
    .then(()=>console.log('Base de datos'))
    .catch(error=>console.log(error))

//* definir puerto
const port =process.env.PORT||4000;

//habilitar al PUG
app.set('view engine','pug');

app.use((req,res,next)=>{
    const year=new Date();
    res.locals.actualyear=year.getFullYear();
    res.locals.nombresitio="Agencia de viajes";
    return next();          //? obliga a pasar al siguiente use
})

//Integrar la carpeta public
app.use(express.static('public'));

//Agregar router
app.arguments('/',router);

app.listen(port,()=>{
    console.log(`Servidor .... ${port}`);
})