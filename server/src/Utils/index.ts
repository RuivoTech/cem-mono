import { FiltroConstantes } from "../Utils/FiltroConstantes";

interface Filter {
    dataInicio: string,
    dataFim: string,
    diaInicio: string,
    diaFim: string,
    aniversariante: string,
    ministerio: string,
    sexo: string,
    estadoCivil: string,
    nome: string
}

class Utils {
    montarQuery(filters: Filter) {
        let where = "";
        const values = [""];

        Object.keys(filters).forEach((key) => {
            if (where) {
                where += " AND ";
            }

            where += FiltroConstantes[key as keyof Filter];
            if (FiltroConstantes[key as keyof Filter].indexOf("?") !== -1) {
                values.push(filters[key as keyof Filter]);
            }
        });

        values[0] === "" ? values.shift() : null;

        return { where, values };
    }
}

export default Utils;
