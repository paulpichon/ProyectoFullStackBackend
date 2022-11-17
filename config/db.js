//importar moongose
import mongoose from 'mongoose';

//conexxion de la DB
const conectarDB = async () => {
    //se usa trycatch, para que en caso de que haya un error puedamos ver cual es
    try {
        //conectar con BD
        //mongodb+srv://root:<password>@cluster0.5yckrx6.mongodb.net/?retryWrites=true&w=majority
        //esa conexion biene desde la pagina de mongodb
        const db = await mongoose.connect( process.env.MONGO_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
            //una vez hecha la conexion
            //.host = nos dara una url
            //.port = nos dara el puerto donde se esta conectando
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {
        //imprime un mensaje de error
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

//exportar conectarDB
export default conectarDB;