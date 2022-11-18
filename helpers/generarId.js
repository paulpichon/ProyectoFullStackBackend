//Generar ID para el veterinario
const generarId = () => {
    //genera un id UNICO
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;