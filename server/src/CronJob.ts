import knex from "./database/connection";

class CronJob {
    async verifyEvents() {
        const date = new Date();
        const data = new Date();
        console.log("Verificação iniciada", date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }));

        knex("eventos").update({ status: false })
            .where("dataInicio", "<", data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(" ")[0])
            .andWhere("status", "=", true)
            .then(_ => {
                console.log("Verificação finalizada", date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }));
            })
            .catch(error => console.log(error));


    }
}

export default CronJob;