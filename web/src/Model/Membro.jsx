import Parentes from "./Parentes";
import Contato from "./Contato";
import Endereco from "./Endereco";
import Igreja from "./Igreja";
import MinisterioMembro from "./MinisterioMembro";

const parentes = new Parentes();
const contato = new Contato();
const endereco = new Endereco();
const igreja = new Igreja();
const ministeriosMembro = new MinisterioMembro();

class Membro {
    constructor() {
        this.explicitType = "membro";
        this.id = 0;
        this.nome = "";
        this.identidade = "";
        this.dataNascimento = "";
        this.idade = "";
        this.sexo = 0;
        this.profissao = "";
        this.estadoCivil = "";
        this.ativo = "";
        this.parentes = parentes;
        this.contato = contato;
        this.endereco = endereco;
        this.igreja = igreja;
        this.ministerios = [ministeriosMembro];
        this.chEsContato = "";
        this.chEsEndereco = "";
        this.chEsIgreja = ""
    }
}

export default Membro;