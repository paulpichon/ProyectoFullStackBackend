//importar paciente
import Paciente from "../models/Paciente.js";

//agregar pacientes
const agregarPaciente = (req, res) => {

    const paciente = new Paciente(req.body);
    

    try {
        
    } catch (error) {
        console.log( error );
    }

};
//
const obtenerPacientes = (req, res) => {}

export {agregarPaciente, obtenerPacientes};