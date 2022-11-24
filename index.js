//importar express anteriormente
// const express = require("express");

//importar express forma actual
import express from "express";
//leer las variables de entorno del archivo .env
//se debe instalar una dependencia dotenv
import dotenv from 'dotenv';
//imporatar CORS para que no haya problemas con las URL tanto del BACKEND como del FRONTEND
import cors from 'cors';
//importar el archivo que creamos de db.js
//al ser un archivo creado por nosotros debemos poner la extension del archivo en este caso .JS
import conectarDB from "./config/db.js";
//veterinario Routes al ser un archivo creado por mi se debe poner la extension .js
import veterinarioRoutes from './routes/veterinarioRoutes.js';
//pacientesRoutes
import pacienteRoutes from "./routes/pacienteRoutes.js";

//llamar la funcion de EXPRESS
const app = express();
//indicar que se van a enviar datos de tipo JSON()
app.use(express.json());

//busca el archivo .env y escanea las variables
dotenv.config();

//llamamos la conexion a la BD
conectarDB();

//configuracion de CORS
const dominiosPermitidos = ['http://localhost:5173'];

const corsOptions = {
    origin: function(origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1 ) {
            //El origen del REQUEST esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));


//.USE(), es como EXPRESS maneja el routing(rutas)
//req = es lo que estoy enviando
//res = lo que estoy recibiendo
//veterinarios
app.use('/api/veterinarios', veterinarioRoutes);
//pacientes
app.use("/api/pacientes", pacienteRoutes);

//procces.env.PORT : nos da un puerto en automatico
//en caso de no existir nos asigna al puerto 4000
const PORT = process.env.PORT || 4000;

//puerto de conexion
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${ PORT }`);
});