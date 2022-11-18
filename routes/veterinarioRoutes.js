//express
import express from 'express';
//router
const router = express.Router();
//controladores
import { registrar, perfil, confirmar } from '../controllers/veterinarioController.js'

//registrar
router.post('/', registrar);
//perfil
router.get('/perfil', perfil);
//confirmar email
router.get('/confirmar/:token', confirmar);


export default router;