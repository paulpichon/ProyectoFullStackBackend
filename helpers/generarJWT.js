//GENERAR JWT
import jwt from 'jsonwebtoken';
//pasamos como parametro el id del usuario
const generarJWT = (id) => {
    //id:id = id
    return jwt.sign({id}, process.env.JWT_SECRET, {
        //tiempo de expiracion del token
        expiresIn: '30d'
    });

}


//exportar funcion
export default generarJWT;