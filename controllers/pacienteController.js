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
//
const obtenerPacientes = (req, res) => {}

export {agregarPaciente, obtenerPacientes};