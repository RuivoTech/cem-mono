import Contato from "../Model/Contato";
import Endereco from "../Model/Endereco";

const contato = new Contato();
const endereco = new Endereco();

class Visitante {
    constructor() {
        this.explicitType = "visitante";
        this.id = 0;
        this.nome = "";
        this.querVisita = "";
        this.dataVisita = "";
        this.dataCadastro = "";
        this.religiao = "";
        this.contato = contato;
        this.endereco = endereco;
    }
}

export default Visitante;