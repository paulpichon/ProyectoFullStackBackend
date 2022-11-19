//importar moongose
import mongoose from "mongoose";
//hashear una contraseña
import bcrypt, { genSalt } from 'bcrypt';
//importar generarID
import generarId from "../helpers/generarId.js";

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
        type: String,
        default: generarId
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

//hashear contraseña antes de almacenar en la base de datos
veterinarioSchema.pre('save', async function(next) {
    //si esta hasheado no lo vuelva a hashear
    if (!this.isModified('password')) {
        next();
    }

    //crear un salt
    const salt = await bcrypt.genSalt(10);
    //reescribir password por el hasheado
    this.password = await bcrypt.hash(this.password, salt);

});



//registrar en mongo, se pasa como segundo parametro veterinarioSchema
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

//importar para usar en otros lugares
export default Veterinario;