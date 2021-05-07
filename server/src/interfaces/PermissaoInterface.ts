export interface Permissao {
    id: number,
    chEsUsuario: string,
    menuPermissao: string,
    descricao: string,
    chEsMenuPermissao: string,
    inserir: boolean,
    alterar: boolean,
    visualizar: boolean,
    remover: boolean
}