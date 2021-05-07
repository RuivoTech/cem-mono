class Permissao {
    constructor() {
        this.explicitType = "permissao";
        this.id = 0;
        this.chEsUsuario = 0;
        this.chEsMenuPermissao = 0;
        this.inserir = false;
        this.alterar = false;
        this.visualizar = false;
        this.remover = false;
        this.menuPermissao = "";
    }
}
export default Permissao;