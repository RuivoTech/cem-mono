const Utils = {
    converteData: (date, formato) => {
        let data = date ? new Date(`${date.split("T")[0]}T00:00:00`) : new Date("0000-00-00T00:00:00");
        const ano = data.getFullYear();
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const dia = ("0" + (data.getDate())).slice(-2);

        let dataConvertida = "";

        switch (formato) {
            case "DD/MM":
                dataConvertida = dia + '/' + mes;
                break;
            case "DD/MM/YY":
                dataConvertida = dia + '/' + mes + "/" + ano.toString().substring(2, 4);
                break;
            case "DD":
                dataConvertida = dia;
                break;
            case "MM/DD":
                dataConvertida = mes + "/" + dia;
                break;
            case "YYYY-MM-DD":
                dataConvertida = ano + "-" + mes + "-" + dia;
                break;
            default:
                dataConvertida = dia + '/' + mes + '/' + ano;
                break;
        }

        return data && ano !== "0000" && date !== null ? dataConvertida : "-";
    },
    separarString: (string, quantidadeRetorno) => {
        let stringSplit = string.split(" ");
        let retorno = "";
        if (stringSplit.length >= quantidadeRetorno) {
            for (let i = 0; i < quantidadeRetorno; i++) {
                retorno = retorno + " " + stringSplit[i];
            }
        } else {
            retorno = string;
        }

        return retorno;
    },
    converteMoeda: (value = 0) => {
        const valueDisplay = (value / 100).toLocaleString(
            'pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return valueDisplay;
    },
    mascaraTelefone(telefone) {
        let r = "";
        if (telefone) {
            r = telefone.replace(/\D/g, "");
            r = r.replace(/^0/, "");
            if (r.length > 10) {
                r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
            } else if (r.length > 5) {
                r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
            } else if (r.length > 2) {
                r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
            } else {
                r = r.replace(/^(\d*)/, "($1");
            }
        }
        return r;
    }
}

export default Utils;