//registrar
const registrar = (req,res) => {
    res.json({msg: "REGISTRANDO USUARIO"});
};
//perfil
const perfil = (req,res) => {
    res.json({msg: "MOSTRANDO PERFIL"});
};

//export
export {
    registrar, perfil
}