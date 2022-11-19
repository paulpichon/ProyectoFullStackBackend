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
} from '../controllers/veterinarioController.js';
//importar el middleware
import checkAuth from '../middleware/authMiddleware.js';

//registrar
router.post('/', registrar);
//confirmar email
router.get('/confirmar/:token', confirmar);
//autenticar
router.post('/login', autenticar);


//perfil
//checkAuth = va a revisar si esta autenticado
router.get('/perfil', checkAuth, perfil);


export default router;