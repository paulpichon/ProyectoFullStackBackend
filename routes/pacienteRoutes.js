///express
import express from "express";
//llamamos a router
const router = express.Router();
//importar agregaPaciente y obtenerPacientes
import {
    agregarPaciente, 
    obtenerPacientes
    } from '../controllers/pacienteController.js';
//importar checkAuth
import checkAuth from '../middleware/authMiddleware.js';
//protegemos agregarPaciente con checkAuth
//para agregar un paciente debes tener una cuenta
//para obtener pacientes debes tener checkuth
router
    .route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

//exportar
export default router;