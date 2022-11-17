//express
import express from 'express';
//router
const router = express.Router();
//controladores
import { registrar, perfil } from '../controllers/veterinarioController.js'

//registrar
router.post('/', registrar);
//perfil
router.get('/perfil', perfil);


export default router;