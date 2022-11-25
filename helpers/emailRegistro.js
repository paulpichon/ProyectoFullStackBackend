import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    //destructuring
    const {email, nombre, token} = datos;

    //enviar EMAIL
    const info = await transporter.sendMail({
        from: "APV - ADMINISTADOR DE PACIENTES DE VETERINARIA",
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuienta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
                <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: 
                    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
                </p>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
    });

    console.log("MENSAJE ENVIADO: %s", info.messageId );

}

export default emailRegistro;