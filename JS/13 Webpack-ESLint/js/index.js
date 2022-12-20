// const express=requiere('express');
import express from "express";
import router from '../routes/index.js'

const app=express();

const port =process.env.PORT||4000;

//habilitar al PUG
app.set('view engine','pug');

app.use((req,res,next)=>{
    const year=new Date();
    res.locals.actualyear=year.getFullYear();
    return next();          //? obliga a pasar al siguiente use
})

//Integrar la carpeta public
app.use(express.static('public'));

//Agregar router
app.arguments('/',router);

app.listen(port,()=>{
    console.log(`Servidor .... ${port}`);
})