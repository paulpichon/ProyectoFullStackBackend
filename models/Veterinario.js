//importar moongose
import mongoose from "mongoose";

//estructura modelo de veterinario
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {

    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

//registrar en mongo, se pasa como segundo parametro veterinarioSchema
const veterinario = mongoose.model("Veterinario", veterinarioSchema);

//importar para usar en otros lugares
export default veterinario;