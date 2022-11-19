//express
import express from 'express';
//router
const router = express.Router();
//controladores
import { 
    registrar, 
    perfil, 
    confirmar,
    autenticar 
} from '../controllers/veterinarioController.js'

//registrar
router.post('/', registrar);
//perfil
router.get('/perfil', perfil);
//confirmar email
router.get('/confirmar/:token', confirmar);
//autenticar
router.post('/login', autenticar);


export default router;