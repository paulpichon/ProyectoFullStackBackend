//importar paciente
import Paciente from "../models/Paciente.js";

//agregar pacientes
const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body);
    //definiendo el ID del veterinario
    paciente.veterinario = req.veterinario._id;

    try {
        //guardar los datos
        const pacienteAlmacenado = await paciente.save();
        //retornamos
        res.json(pacienteAlmacenado);

    } catch (error) {
        console.log( error );
    }

};
//obtener todos los pacientes
const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where("veterinario")
        .equals(req.veterinario);

    res.json(pacientes);

}

//obtener un solo paciente
const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    //si no hay paciente
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"});
    }

    //verificar si el veterinario que quiere obtener el paciente es el mismo que lo creo
    //se deben converit en string para que no sean Object.Id
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) {
        //mostrar mensaje de error
        return res.json({msg: "Accion no valida"});
    }

    //si hay paciente
    res.json(paciente);

}
//actualizar un solo paciente
const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    //si no hay paciente
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"});
    }

    //verificar si el veterinario que quiere obtener el paciente es el mismo que lo creo
    //se deben converit en string para que no sean Object.Id
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) {
        //mostrar mensaje de error
        return res.json({msg: "Accion no valida"});
    }

    //actualizar PACIENTE
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch (error) {
        console.log( error );
    }

}
//eliminar paciente
const eliminarPaciente = async (req, res) => {
    //verificar que quien quiere eliminar un registro es quien lo creo
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    //si no hay paciente
    if (!paciente) {
        return res.status(404).json({msg: "No encontrado"});
    }

    //verificar si el veterinario que quiere obtener el paciente es el mismo que lo creo
    //se deben converit en string para que no sean Object.Id
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString() ) {
        //mostrar mensaje de error
        return res.json({msg: "Accion no valida"});
    }

    try {
        
        await paciente.deleteOne();
        res.json({msg: "Paciente eliminado"});

    } catch (error) {
        console.log(error);
    }



}


export {
    agregarPaciente, 
    obtenerPacientes, 
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};