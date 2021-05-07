import React, { useState, useEffect } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useToasts } from "react-toast-notifications";

import Membro from "../../../Model/Membro";
import api from "../../../services/api";
import Utils from "../../../componentes/Utils";
import Autocomplete from "../../../componentes/Autocomplete";
import Tabela from "../../../componentes/Tabela";
import Coluna from "../../../componentes/Coluna";
import Axios from "axios";
import { getSession } from "../../../services/auth";

const FormModal = ({ data, show, handleShow, className, membros, ministerios }) => {
    const [membro, setMembro] = useState({ ministerios: [] });
    const [idMembro, setIdMembro] = useState(0);
    const [tabAtivo, setTabAtivo] = useState("perfil");
    const [carregando, setCarregando] = useState(false);
    const [filhos, setFilhos] = useState([]);
    const [value, setValue] = useState("");
    const { addToast, removeAllToasts } = useToasts();
    const session = getSession();

    useEffect(() => {
        setIdMembro(data);
        removeAllToasts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        const fetchMembro = async () => {
            const response = idMembro > 0 ? await api.get("/membros/" + idMembro, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }) : { ministerios: [] };

            setMembro(response.data);
            setFilhos(response.data.parentes.filhos);
        }
        if (idMembro > 0) {
            fetchMembro();
        } else {
            handleLimpar();
        }

    }, [idMembro]);

    const toggle = tab => {
        if (tabAtivo !== tab) setTabAtivo(tab);
    }

    const handleSubmit = async () => {
        let response = "";
        setCarregando(true);

        const novoMembro = new Membro();

        novoMembro.id = membro?.id ? membro?.id : 0;
        novoMembro.nome = membro?.nome;
        novoMembro.identidade = membro?.identidade;
        novoMembro.dataNascimento = membro?.dataNascimento;
        novoMembro.dataCasamento = membro?.dataCasamento;
        novoMembro.sexo = membro?.sexo;
        novoMembro.profissao = membro?.profissao;
        novoMembro.estadoCivil = membro?.estadoCivil;
        novoMembro.chEsConjuge = membro?.chEsConjuge;
        novoMembro.conjuge = membro?.conjuge;
        novoMembro.ativo = 0;

        novoMembro.contato.id = membro?.contato?.id;
        novoMembro.contato.email = membro?.contato?.email;
        novoMembro.contato.telefone = membro?.contato?.telefone;
        novoMembro.contato.celular = membro?.contato?.celular;

        novoMembro.endereco.id = membro?.endereco?.id;
        novoMembro.endereco.cep = membro?.endereco?.cep;
        novoMembro.endereco.cidade = membro?.endereco?.cidade;
        novoMembro.endereco.uf = membro?.endereco?.uf;
        novoMembro.endereco.logradouro = membro?.endereco?.logradouro;
        novoMembro.endereco.numero = membro?.endereco?.numero;
        novoMembro.endereco.complemento = membro?.endereco?.complemento;

        novoMembro.parentes.chEsConjuge = membro?.parentes?.chEsConjuge;
        novoMembro.parentes.conjuge = membro?.parentes?.conjuge;
        novoMembro.parentes.chEsPai = membro?.parentes?.chEsPai;
        novoMembro.parentes.nomePai = membro?.parentes?.nomePai;
        novoMembro.parentes.chEsMae = membro?.parentes?.chEsMae;
        novoMembro.parentes.nomeMae = membro?.parentes?.nomeMae;
        novoMembro.parentes.filhos = filhos;

        novoMembro.igreja.id = membro?.igreja?.id;
        novoMembro.igreja.ehBatizado = membro?.igreja?.ehBatizado;
        novoMembro.igreja.dataBatismo = membro?.igreja?.dataBatismo;
        novoMembro.igreja.igrejaBatizado = membro?.igreja?.igrejaBatizado;
        novoMembro.igreja.ultimoPastor = membro?.igreja?.ultimoPastor;
        novoMembro.igreja.ultimaIgreja = membro?.igreja?.ultimaIgreja;

        novoMembro.ministerios = membro?.ministerios;

        if (Number(novoMembro.id) !== 0) {
            response = await api.put("/membros", novoMembro, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        } else {
            response = await api.post("/membros", novoMembro, {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            });
        }

        if (!response.data.error) {
            addToast("Membro salvo com sucesso!", { appearance: "success" });
            handleLimpar();
            setFilhos([]);
        } else {
            console.error(response.data.error);
            addToast("Alguma coisa deu errado, por favor falar com o administrador!", { appearance: "error" });
        }

        setCarregando(false);
    }

    const handleChange = event => {
        const [item, subItem] = event.target.name.split(".");

        if (subItem) {
            setMembro({
                ...membro,
                [item]: {
                    ...membro[item],
                    [subItem]: event.target.value
                }
            });
        } else {
            setMembro({
                ...membro,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleClick = (item, id, nome) => {
        const dataCasamento = nome === "nomeConjuge" ? item.dataCasamento : membro?.dataCasamento;

        setMembro({
            ...membro,
            parentes: {
                ...membro?.parentes,
                [id]: item.id,
                [nome]: item.nome
            },
            dataCasamento
        });
    }

    const handleChangeNome = (event) => {

        if (event.target.value === "") {
            handleLimpar();
        } else {
            setMembro({
                ...membro,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSelectMembro = (item) => {
        setIdMembro(item.id);
    }

    const handleValue = event => {
        setValue(event.target.value);
    }

    const handleLimpar = () => {
        setMembro({
            id: "",
            nome: "",
            dataCasamento: "",
            dataNascimento: "",
            identidade: "",
            sexo: "",
            estadoCivil: "",
            profissao: "",
            contato: {
                email: "",
                celular: "",
                telefone: ""
            },
            endereco: {
                cep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                cidade: "",
                uf: ""
            },
            parentes: {
                chEsConjuge: "",
                nomeConjuge: "",
                chEsPai: "",
                nomePai: "",
                chEsMae: "",
                nomeMae: "",
                filhos: []
            },
            igreja: {
                ehBatizado: "",
                dataBatismo: "",
                igrejaBatizado: "",
                ultimoPastor: "",
                ultimaIgreja: ""
            },
            ministerios: []
        });
    }

    const selecionarFilho = (item) => {
        const id = item.id ? item.id : item.chEsFilho;
        const filhoExiste = filhos.findIndex(filho => filho.chEsFilho === id);

        if (filhoExiste >= 0) {
            const filhosFiltrados = filhos.filter(filho => filho.chEsFilho !== id);

            setFilhos(filhosFiltrados);
        } else {
            setFilhos([
                ...filhos,
                {
                    chEsFilho: item.id,
                    nome: item.nome,
                    email: item.contato.email,
                    telefone: item.contato.telefone,
                    celular: item.contato.celular
                }
            ]);
        }

        setValue("");
    }

    const handleChangeMinisterio = async (item) => {
        const minsiterioExiste = membro?.ministerios.findIndex(ministerio => ministerio.chEsMinisterio === item.id);

        if (minsiterioExiste >= 0) {
            const ministeriosFiltrados = membro?.ministerios.filter(ministerio => ministerio.chEsMinisterio !== item.id);

            setMembro({
                ...membro,
                ministerios: ministeriosFiltrados
            });
        } else {
            setMembro({
                ...membro,
                ministerios: [
                    ...membro.ministerios,
                    {
                        chEsMinisterio: item.id,
                        checked: true
                    }
                ]
            });
        }
    }

    const handleBlur = async evento => {
        let data = await Axios.get("https://viacep.com.br/ws/" + evento.target.value + "/json/");

        data = data.data;

        setMembro({
            ...membro,
            endereco: {
                ...membro?.endereco,
                logradouro: data.logradouro,
                cidade: data.localidade,
                uf: data.uf
            }
        });
    }

    const opcoesFilhos = (item) => {
        return (
            <>
                <button
                    key={item.chEsFilho + "remover"}
                    type="button"
                    onClick={() => selecionarFilho(item)}
                    value={item.chEsFilho}
                    className="btn btn-danger btn-xs"
                    title="Remover filho"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </>
        )
    }

    const isChecked = (item) => {
        const checked = membro?.ministerios ? membro.ministerios.filter((ministerio) => {
            return Number(ministerio?.chEsMinisterio) === item.id && ministerio.checked;
        }) : [false];

        return checked[0];
    }

    return (
        <>
            <Modal isOpen={show} toggle={handleShow} className={className}>
                <ModalHeader toggle={handleShow}>
                    {membro?.id ? `#${membro.id} - ` + membro?.nome :
                        "Novo Membro"
                    }
                </ModalHeader>
                <ModalBody>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'perfil' ? "active" : ""}
                                    onClick={() => { toggle('perfil'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Perfil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'contato' ? "active" : ""}
                                    onClick={() => { toggle('contato'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Contato
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'endereco' ? "active" : ""}
                                    onClick={() => { toggle('endereco'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Endereço
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'parentes' ? "active" : ""}
                                    onClick={() => { toggle('parentes'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Familia
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'igreja' ? "active" : ""}
                                    onClick={() => { toggle('igreja'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Dados Igreja
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={tabAtivo === 'ministerio' ? "active" : ""}
                                    onClick={() => { toggle('ministerio'); }}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    Ministério
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabAtivo}>
                            <TabPane tabId="perfil">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                            <div className="form-group">
                                                <label htmlFor="nome">Nome:</label>
                                                <Autocomplete
                                                    className="form-control"
                                                    id="nome"
                                                    name="nome"
                                                    suggestions={membros}
                                                    onChange={handleChangeNome}
                                                    onClick={(item) => handleSelectMembro(item)}
                                                    value={membro?.nome}
                                                    field="nome"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="sexo">Sexo:</label>
                                                <select
                                                    className="custom-select"
                                                    id="sexo"
                                                    name="sexo"
                                                    value={membro?.sexo}
                                                    onChange={handleChange}
                                                >
                                                    <option value="0">Escolha...</option>
                                                    <option value="1">Homem</option>
                                                    <option value="2">Mulher</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                                <input className="form-control" id="dataNascimento" name="dataNascimento" type="date"
                                                    value={Utils.converteData(membro?.dataNascimento, "YYYY-MM-DD")} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="estadoCivil">Estado Civil:</label>
                                                <select className="custom-select" id="estadoCivil" name="estadoCivil" value={membro?.estadoCivil}
                                                    onChange={handleChange}>
                                                    <option value="0">Escolha...</option>
                                                    <option value="1">Solteiro(a)</option>
                                                    <option value="2">Casado(a)</option>
                                                    <option value="3">Divorciado(a)</option>
                                                    <option value="4">Viúvo(a)</option>
                                                    <option value="5">Separado(a)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="indentidade">Identidade:</label>
                                                <input
                                                    className="form-control"
                                                    id="indentidade"
                                                    name="identidade"
                                                    type="text"
                                                    value={membro?.identidade}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="profissao">Profissão:</label>
                                                <input className="form-control" id="profissao" name="profissao" type="text"
                                                    value={membro?.profissao} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="contato">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail:</label>
                                                <input className="form-control" id="email" name="contato.email" type="email"
                                                    value={membro?.contato?.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="telefone">Telefone:</label>
                                                <input className="form-control" id="telefone" name="contato.telefone" type="text"
                                                    value={membro?.contato?.telefone} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="celular">Celular:</label>
                                                <input className="form-control" id="celular" name="contato.celular" type="text"
                                                    value={membro?.contato?.celular} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="endereco">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <label htmlFor="cep">CEP:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-map-marker"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cep"
                                                    name="endereco.cep"
                                                    onChange={handleChange}
                                                    value={membro?.endereco?.cep}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6"></div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="logradouro">Endereço:</label>
                                                <input
                                                    className="form-control"
                                                    id="logradouro"
                                                    name="endereco.logradouro"
                                                    type="text"
                                                    value={membro?.endereco?.logradouro}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <div className="form-group">
                                                <label htmlFor="numero">Número:</label>
                                                <input
                                                    className="form-control"
                                                    id="numero"
                                                    name="endereco.numero"
                                                    type="text"
                                                    value={membro?.endereco?.numero}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="complemento">Complemento:</label>
                                                <input
                                                    onChange={handleChange}
                                                    value={membro?.endereco?.complemento}
                                                    className="form-control"
                                                    id="complemento"
                                                    name="endereco.complemento"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="cidade">Cidade:</label>
                                                <input
                                                    className="form-control"
                                                    id="cidade"
                                                    name="endereco.cidade"
                                                    type="text"
                                                    value={membro?.endereco?.cidade}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="uf">Estado:</label>
                                                <input className="form-control" id="uf" name="endereco.uf" type="text"
                                                    value={membro?.endereco?.uf} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="parentes">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                            <div className="form-group">
                                                <label htmlFor="nomeConjuge">Nome do Cônjuge:</label>
                                                <Autocomplete
                                                    className="form-control"
                                                    id="nomeConjuge"
                                                    name="parentes.nomeConjuge"
                                                    suggestions={membros}
                                                    onChange={handleChange}
                                                    onClick={(item) => handleClick(item, "chEsConjuge", "nomeConjuge")}
                                                    value={membro?.parentes?.nomeConjuge}
                                                    field="nome"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="dataCasamento">Data de Casamento:</label>
                                                <input
                                                    className="form-control"
                                                    id="dataCasamento"
                                                    name="dataCasamento"
                                                    type="date"
                                                    value={Utils.converteData(membro?.dataCasamento, "YYYY-MM-DD")}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="nomePai">Nome do Pai:</label>
                                                <Autocomplete className="form-control" id="nomePai" name="parentes.nomePai" suggestions={membros}
                                                    onChange={handleChange} onClick={(item) => handleClick(item, "chEsPai", "nomePai")}
                                                    value={membro?.parentes?.nomePai} field="nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="nomeMae">Nome da Mãe:</label>
                                                <Autocomplete className="form-control" id="nomeMae" name="parentes.nomeMae" suggestions={membros}
                                                    onChange={handleChange} onClick={(item) => handleClick(item, "chEsMae", "nomeMae")}
                                                    value={membro?.parentes?.nomeMae} field="nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="filhos">Filhos:</label>
                                                <Autocomplete
                                                    className="form-control"
                                                    id="filhos"
                                                    suggestions={membros}
                                                    onClick={(item) => selecionarFilho(item)}
                                                    onChange={handleValue}
                                                    field="nome"
                                                    value={value}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <Tabela data={filhos}>
                                                    <Coluna titulo="Nome" campo="nome" tamanho="12" />
                                                    <Coluna titulo="E-mail" campo="email" tamanho="12" />
                                                    <Coluna titulo="Celular" campo="celular" tamanho="8" />
                                                    <Coluna
                                                        titulo="Opções"
                                                        campo="id"
                                                        corpo={(item) => opcoesFilhos(item)}
                                                        tamanho="5"
                                                    />
                                                </Tabela>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="igreja">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                            <div className="form-group">
                                                <label>É Batizado?</label>
                                                <div className="custom-control custom-radio">
                                                    <input
                                                        type="radio"
                                                        className="custom-control-input"
                                                        id="ehBatizadoSim"
                                                        name="igreja.ehBatizado"
                                                        value="0"
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                        checked={Number(membro?.igreja?.ehBatizado) === 0}
                                                    />
                                                    <label className="custom-control-label" htmlFor="ehBatizadoSim">Sim</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input
                                                        type="radio"
                                                        className="custom-control-input"
                                                        id="ehBatizadoNao"
                                                        name="igreja.ehBatizado"
                                                        value="1"
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                        checked={Number(membro?.igreja?.ehBatizado) === 1}
                                                    />
                                                    <label className="custom-control-label" htmlFor="ehBatizadoNao">Não</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <div className="form-group">
                                                <label htmlFor="dataBatismo">Data do Batismo:</label>
                                                <input
                                                    className="form-control"
                                                    id="dataBatismo"
                                                    name="igreja.dataBatismo"
                                                    type="date"
                                                    value={membro?.igreja?.dataBatismo}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="igrejaBatizado">Igreja Batizado:</label>
                                                <input
                                                    className="form-control"
                                                    id="igrejaBatizado"
                                                    name="igreja.igrejaBatizado"
                                                    type="text"
                                                    value={membro?.igreja?.igrejaBatizado}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="ultimoPastor">Ultimo Pastor:</label>
                                                <input
                                                    className="form-control"
                                                    id="ultimoPastor"
                                                    name="igreja.ultimoPastor"
                                                    type="text"
                                                    value={membro?.igreja?.ultimoPastor}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="ultimaIgreja">Ultima Igreja:</label>
                                                <input
                                                    className="form-control"
                                                    id="ultimaIgreja"
                                                    name="igreja.ultimaIgreja"
                                                    type="text"
                                                    value={membro?.igreja?.ultimaIgreja}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="ministerio">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ height: "2vh", marginTop: '2vh' }}>
                                            <div className="row">
                                                <div className="col-4">
                                                    Descrição
                                                </div>
                                                <div className="col-2">
                                                    Faz parte?
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group col-md-12 float-left overflow-auto" style={{ maxHeight: '40vh' }}>
                                            <ul className="list-group bg-transparent">
                                                {ministerios.map((ministerio) => {
                                                    return (
                                                        <>
                                                            <li
                                                                key={ministerio.id}
                                                                className="list-group-item bg-transparent border-white pl-2"
                                                            >
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        {ministerio.nome}
                                                                    </div>
                                                                    <div className="col-2 text-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            value={ministerio.id}
                                                                            id={ministerio.id}
                                                                            onChange={() => handleChangeMinisterio(ministerio)}
                                                                            name="permissoes.visualizar"
                                                                            checked={isChecked(ministerio)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="success" onClick={() => handleSubmit()} disabled={carregando}>Salvar</Button>{' '}
                    <Button
                        type="button"
                        color="danger"
                        onClick={membro.id > 0 ? handleLimpar : handleShow}
                        disabled={carregando}
                    >
                        {membro.id > 0 ? "Limpar" : "Cancelar"}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;