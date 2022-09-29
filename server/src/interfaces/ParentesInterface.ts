import { Filhos } from "./FilhosInterface";

export interface Parentes {
    chEsMembro?: number,
    chEsConjuge?: number,
    chEsPai?: number,
    chEsMae?: number,
    nomeConjuge?: string,
    nomePai?: string,
    nomeMae?: string,
    filhos: Filhos[]
}