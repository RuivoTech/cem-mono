export interface Evento {
    id?: number,
    titulo: string,
    tipo: number,
    status: number,
    repete: boolean,
    diaSemana: number,
    frequencia: number,
    ehPago: boolean,
    valor: Number,
    dataInicio: string,
    dataFim: string,
    horaInicio: string,
    horaFim: string
}