//MODELO DE PACIENTES
//importar mongoose
import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        propietario: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        veterinario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veterinario'
        }
    }, 
    {
        timestamps: true
    }
);

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;