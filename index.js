//importar express anteriormente
// const express = require("express");

//importar express forma actual
import express from "express";

//llamar la funcion de EXPRESS
const app = express();

//.USE(), es como EXPRESS maneja el routing(rutas)
//req = es lo que estoy enviando
//res = lo que estoy recibiendo
app.use('/', (req, res) => {
    res.send('Hola Mundo');
});

//puerto de conexion
app.listen(4000, () => {
    console.log("Servidor funcionando en el puerto 4000");
});