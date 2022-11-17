//registrar
const registrar = (req,res) => {
    res.send("DESDE API/VETERINARIOS");
};
//perfil
const perfil = (req,res) => {
    res.send("DESDE API/VETERINARIOS/perfil");
};

//export
export {
    registrar, perfil
}