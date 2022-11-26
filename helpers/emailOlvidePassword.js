import nodemailer from 'nodemailer';
//CONFIGURACION CUANDO SE USA UN SMTP EXTERNO 
//https://stackoverflow.com/questions/43472705/error-hostname-ip-doesnt-match-certificates-altnames-node-js/45706464#45706464
const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true,
        tls: { 
            rejectUnauthorized: false 
        },
        name: "APV"
    });


    //destructuring
    const {email, nombre, token} = datos;

    //enviar EMAIL
    const info = await transporter.sendMail({
        from: 'Administrador de Pacientes de Veterianaria',
        to: email,
        subject: 'Reestablece tu contaseña',
        text: 'Reestablece tu contaseña',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>

                <p>Sigue el siguiente enlace para generar un nuevo password: 
                    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
                </p>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `,
    });

    console.log("MENSAJE ENVIADO: %s", info.messageId );

}

export default emailOlvidePassword;