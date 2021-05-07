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
                dataConvertida = dia + '/' + mes + "/" + ano.substring(2, 4);
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
        for (let i = 0; i < quantidadeRetorno; i++) {
            retorno = retorno + " " + stringSplit[i];
        }

        return retorno;
    },
    converteMoeda: (value = 0, fromInput = false) => {
        console.log(value);
        const valueDisplay = (fromInput ? value / 100 : value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return valueDisplay;
    }
}

export default Utils;