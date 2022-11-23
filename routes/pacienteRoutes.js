///express
import express from "express";
//llamamos a router
const router = express.Router();
//importar agregaPaciente y obtenerPacientes
import {
    agregarPaciente, 
    obtenerPacientes
    } from '../controllers/pacienteController.js';

router.route('/').post(agregarPaciente).get(obtenerPacientes)

//exportar
export default router;