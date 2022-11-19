//importar JWT
import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";


//revisar autenticacion para el control de paginas que puede o no ver un usuario
const checkAuth = async (req, res, next) => {
    let token;
    
    //comprobando que se envie un token y al mismo tiempo un startsWith('Bearer')
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer') 
    ) {
        try {
            //console.log(req.headers.authorization);
            //el console log nos muestra bearer un espacio mas el token debemos quitar el espacio y dejar solo el token

            //separar cuando haya un espacio
            //y sea el token en la posicion [1]
            token = req.headers.authorization.split(' ')[1];
            
            //decoded
            //.verify() verifica el token, con nuestra palabra secreta
            //JWT_SECRET = es nuestra palabra secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //.select() en el podemos poner los campos que no queremos que nos traiga la respuesta
            //crea una sesion con el veterinario autenticado
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            );

            return next();

        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({msg: e.message});
        }
    }

    //en caso de no haya token
    if (!token) {
        const error = new Error('Token no válido o inexistente');
        res.status(403).json({msg: error.message});
    }
    next();
};

export default checkAuth;