//revisar autenticacion para el control de paginas que puede o no ver un usuario
const checkAuth = (req, res, next) => {
    console.log("desde mi middleware");

    next();
};

export default checkAuth;