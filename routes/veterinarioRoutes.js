//express
import express from 'express';
//router
const router = express.Router();
//controladores
import { 
    registrar, 
    perfil, 
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil 
} from '../controllers/veterinarioController.js';
//importar el middleware
import checkAuth from '../middleware/authMiddleware.js';

//AREA PUBLICA
//registrar
router.post('/', registrar);
//confirmar email
router.get('/confirmar/:token', confirmar);
//autenticar
router.post('/login', autenticar);
//link para restaurar contraseña
router.post('/olvide-password', olvidePassword);

//AL USAR EL MISMO LINK PODEMOS HACER LO SIGUIENTE CON EXPRESS
//link que contendra el token con el usuario que solicito recuperar la contraseña
//router.get('/olvide-password/:token', comprobarToken);
//restablecer la contraseña en el mismo link
//router.post('/olvide-password/:token', nuevoPassword);

//OTRA FORMA DE HACER LO QUE HACEN LAS 2 LINEAS DE ARRIBA
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


//AREA PRIVADA
//PERFIL
//checkAuth = va a revisar si esta autenticado
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);

export default router;