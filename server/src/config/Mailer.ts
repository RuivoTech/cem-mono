import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class Mailer {
    async sendMail(email: String, nome: String, senha: String) {
        try {
            const remetente = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD
                }
            });

            await remetente.sendMail({
                from: "RuivoTech <ruivotech@gmail.com>",
                to: `${nome} <${email}>`,
                subject: "Seu acesso ao sistema CMC - Cadastro de Membros do CEM",
                html: `<p>Olá, ${nome}.</p>
                <p> Seus dados de acesso estão abaixo: </p>
                <p>
                    E-mail: <strong>${email}</strong>
                </p>
                <p>
                    Senha: <strong>${senha}</strong>
                </p>
                <p>
                    Para acessar o sistema clique no link abaixo: 
                </p>
                <p>
                    <a href="https://cem.ruivotech.com.br">CMC - Cadastro de Membros do CEM</a>
                </p>
                <p>
                    Ou caso o link não apareca copie o texto abaixo e cole no navagador:
                </p>
                <p>
                    https://cem.ruivotech.com.br
                </p>
                    `
            });

            console.log(`Email enviado para ${email} com sucesso!!`);

        } catch (error) {
            console.error(error);
        }
    }
}

export default Mailer;













