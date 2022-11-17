//registrar
const registrar = (req,res) => {

    console.log(req.body);
    //destructuring
    const {nombre, email, password} = req.body;
    console.log(nombre);
    console.log(email);
    console.log(password);

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