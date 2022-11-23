///import modelo
import Veterinario from "../models/Veterinario.js";
//importar JWT
import generarJWT from "../helpers/generarJWT.js";

//registrar
const registrar = async (req,res) => {
    //destructuring
    const {email} = req.body;

    //prevenir usuarios duplicados
    //busca una coincidencia findOne({email})
    //en este caso se para como objeto lo que se va a buscar
    //findOne({email}) = findOne({email:email})
    const existeUsuario = await Veterinario.findOne({email});
    
    //si existe usuario
    if (existeUsuario) {
        //existe el usuario
        const error = new Error('Usuario ya registrado');
        //return para ya no ejecutar las siguientes lineas
        return res.status(400).json({msg: error.message});
    }

    //trycatch en caso de haber algun error a la hora de registrar 
    try {
        //guardar un nuevo veterinario
        //crear una instancia de veterinario
        const veterinario = new Veterinario(req.body);
        //await
        const veterinarioGuardado = await veterinario.save();

        //en caso de exito
        res.json(veterinarioGuardado);

    } catch (error) {
        console.log(error);
    }


    
};
//perfil
const perfil = (req,res) => {

    //destructuring
    const { veterinario } = req; 

    res.json({ perfil: veterinario });
};
//funcion para confirmar el correo/email
const confirmar = async (req, res) => {
    //ller el parametro "token"
    const {token} = req.params;
    //pasamos el parametro
    const usuarioConfirmar = await Veterinario.findOne({token});
    
    //si no hay usuario con ese token
    if (!usuarioConfirmar) {
        //mostrar error mensaje
        const error = new Error("Token no válido");
        return res.status(404).json({msg: error.message});
    }
    
    //en caso de que exista el token
    try {
        //modificar los datos
        //poner el token en null
        usuarioConfirmar.token = null;
        //cambiar el campo confirmado a true
        usuarioConfirmar.confirmado = true;
        //guardar los cambios
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        //para debuggear el error en caso de que haya
        console.log(error);
    }
}

//autenticar usuario LOGIN
const autenticar = async (req, res) => {
    //destructuring
    const {email, password} = req.body;
    //comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});

    //si no existe el usuario
    if (!usuario) {
        //mostrar error mensaje
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    //comprobar si la cuenta esta confirmada o no
    if(!usuario.confirmado) {
        //mensaje de error
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    //Revisar el password si es correcto
    if (await usuario.comprobarPassword(password)) {
        //autenticar
        res.json({token:generarJWT(usuario.id)});
        
        
        console.log("password correcto");
    }else {
        //mensaje de error
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }


};

//export funciones
export { registrar, perfil, confirmar, autenticar }