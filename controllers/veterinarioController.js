///import modelo
import Veterinario from "../models/Veterinario.js";

//registrar
const registrar = async (req,res) => {
    //destructuring
    //const {nombre, email, password} = req.body;
    
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

//export
export {
    registrar, perfil
}