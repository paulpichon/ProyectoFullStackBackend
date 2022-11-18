///import modelo
import Veterinario from "../models/Veterinario.js";

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
    res.json({msg: "MOSTRANDO PERFIL"});
};
//funcion para confirmar el correo/email
const confirmar = (req, res) => {
    console.log(req.params.token);
    res.json({msg: 'Confirmando cuenta'});
}


//export
export {
    registrar, perfil, confirmar
}