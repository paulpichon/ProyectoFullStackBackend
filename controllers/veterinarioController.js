///import modelo
import Veterinario from "../models/Veterinario.js";
//importar JWT
import generarJWT from "../helpers/generarJWT.js";
//importar generarId ya que lo usaremos para reestablecer contraseña
import generarId from "../helpers/generarId.js";
//IMPORTAR emailregistro
import emailRegistro from "../helpers/emailRegistro.js";
//emailOlvidePassword
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//registrar
const registrar = async (req,res) => {
    //destructuring
    const {email, nombre} = req.body;

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

        //ENVIAR EMAIL DE CONFIRMACION
        //llamar email registro
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

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

const olvidePassword = async (req, res) => {
    //destructuring
    const { email } = req.body;

    //verificar si el usuario existe
    //encontrar al primer registro que conincida
    //retorna un NULL en caso de no haber coincidencias
    const existeVeterinario = await Veterinario.findOne({email});
    //en caso de que no exista el veterinario
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message });
    }
    
    //en caso de que si exista el veterinario
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();

        //enviar email
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });

        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }


}
//validar el TOKEN cuando el usuario cambia su password
const comprobarToken = async (req, res) => {
    //destructuring
    //params es de la URL
    const { token } = req.params;
    //que sea un TOKEN que exista en la base de datos
    const tokenValido = await Veterinario.findOne({ token });

    //si el TOKEN es valido
    if (tokenValido) {
        //el TOKEN es valido el usuario existe
        res.json({ msg: "Token valido y el usuario existe" });
    }else {
        const error = new Error("Token no valido");
        return res.json({ msg: error.message });
    }

}
//NUEVO PASSWORD
const nuevoPassword = async (req, res) => {
    //obtener TOKEN desde la URL
    const { token } = req.params;
    
    //obtener nueva PASSWORD desde BODY
    const { password } = req.body;
    //busca el token y lo valida que exista
    const veterinario = await Veterinario.findOne({token});
    //si no existe el veterinario
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    //en caso de que exista y sea valido el token
    try {
        //una vez que se haya usado el token se deja como NULL
        veterinario.token = null;
        //se cambia el password
        veterinario.password = password;
        //guardar los cambios
        await veterinario.save();
        res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
        console.log( error );
    }

}

//export funciones
export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword }