///express
import express from "express";
//llamamos a router
const router = express.Router();
//importar agregaPaciente y obtenerPacientes
import {
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
    } from '../controllers/pacienteController.js';
//importar checkAuth
import checkAuth from '../middleware/authMiddleware.js';
//protegemos agregarPaciente con checkAuth
//para agregar un paciente debes tener una cuenta
//para obtener pacientes debes tener checkuth
//obtener todos los PACIENTES
router
    .route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

//obtener un solo PACIENTE
router
    .route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)


//exportar
export default router;