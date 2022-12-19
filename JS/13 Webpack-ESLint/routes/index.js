import express from "express";

const router=express.Router();
router.get('/',(req,res)=>{
    res.send('Inicio');
});

router.get('/nosotros',(req,res)=>{
    const viajes='Cambiando  el texto';

    res.render('nosotros',{
        viajes
    });
});
