import { Contato } from "./ContatoInterface";
import { Endereco } from "./EnderecoInterface";

export interface Visitante {
    id: number,
    nome: string,
    dataVisita?: string,
    dataCadastro?: string,
    religiao?: string,
    querVisita?: string,
    profissao?: string,
    contato: Contato,
    endereco: Endereco
}