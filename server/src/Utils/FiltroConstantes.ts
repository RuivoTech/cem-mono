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

export const FiltroConstantes: Filter = {
    dataInicio: "MONTH(m.dataNascimento) BETWEEN MONTH(?)",
    dataFim: "MONTH(?)",
    diaInicio: "DAY(m.dataNascimento) BETWEEN DAY(?)",
    diaFim: "DAY(?)",
    aniversariante: "MONTH(m.dataNascimento) = MONTH(CURRENT_DATE())",
    ministerio: "mm.chEsMinisterio = ?",
    sexo: "m.sexo = ?",
    estadoCivil: "m.estadoCivil = ?",
    nome: "m.nome LIKE '%?%'"
}