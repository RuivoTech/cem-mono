import { Filhos } from "./FilhosInterface";

export interface Parentes {
    chEsConjuge?: number,
    chEsPai?: number,
    chEsMae?: number,
    nomeConjuge?: string,
    noemPai?: string,
    nomeMae?: string,
    filhos: Filhos[]
}