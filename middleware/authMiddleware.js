//revisar autenticacion para el control de paginas que puede o no ver un usuario
const checkAuth = (req, res, next) => {
    
    //comprobando que se envie un token y al mismo tiempo un startsWith('Bearer')
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer') 
    ) {
        console.log("si tiene el token con bearer");   
    }

    //en caso de que no haya token
    const error = new Error('Token no válido o inexistente');
    res.status(403).json({msg: error.message});

    next();
};

export default checkAuth;