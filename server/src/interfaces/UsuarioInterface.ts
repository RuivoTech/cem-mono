import { Permissao } from "./PermissaoInterface";

export interface Usuario {
    id: number,
    nome: string,
    email: string,
    nivel: number,
    senha: string,
    salt: string,
    permissoes: Permissao[]
}