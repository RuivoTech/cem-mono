import React, { useState, useEffect } from "react";

import packageJson from "../../../package.json"

import api from "../../services/api";
import { useToasts } from "react-toast-notifications";

import logo2 from "../../images/Logo2.jpg";
import logo1 from "../../images/Logo1.jpg";

const Inscricoes = () => {
    const [inscricao, setInscricao] = useState({});
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState("");
    const { addToast } = useToasts();

    useEffect(() => {
        const fetchEventos = async () => {
            document.title = "Inscrições para eventos do CEM";
            let request = await api.get("/eventosInscricao", {
                params: {
                    ativo: true
                }
            });

            setEventos(request.data);
        };

        fetchEventos();
    }, []);

    const onChange = event => {
        setInscricao({
            ...inscricao,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setCarregando(true);

        setInscricao({
            ...inscricao,
            pago: false
        })

        const request = await api.post("/inscricao", inscricao);

        if (!request.data.error) {
            addToast("Inscrição salva com sucesso!", { appearance: "success" });
            setInscricao({});
        } else {
            console.error(request.data.error);
            addToast("Desculpe, algo deu errado, por favor entre em contato com seu pastor.", { appearance: "error" });
            setError(request.data.error);
        }

        setCarregando(false);
    }

    return (
        <>
            <main style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
            >
                <img src={logo2} alt="Logo Sistema CEM" style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: '50%',
                    height: "100vh",
                    opacity: 0.2,
                }}
                />
                <img src={logo1} alt="Logo Sistema CEM" style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    width: '50%',
                    height: "100vh",
                    opacity: 0.4,
                }}
                />

                <div className="card" style={{
                    width: "34vw",
                    borderRadius: "10px",
                    boxShadow: "15px 15px 12px 2px rgba(61, 61, 61, 0.8)"
                }}>
                    <div className="card-header">
                        <h3 style={{
                            textAlign: "center",
                            marginTop: "2vh",
                            lineHeight: 1,
                        }}
                        >
                            Inscrições para eventos do CEM
                        </h3>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form className="form-sigin" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="text" name="nome" onChange={onChange}
                                    placeholder="Nome completo" required />
                            </div>

                            <div className="form-group">
                                <select className="form-control evento" name="evento" onChange={onChange} required>
                                    <option value="">Escolha um evento</option>
                                    {eventos.map((evento) => {
                                        return <option key={evento.id} value={evento.id}>{evento.descricao}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <input className="form-control email" type="email" name="email" onChange={onChange}
                                    placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" name="celular" onChange={onChange}
                                    placeholder="Celular" required />
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                            </div>
                            <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit"
                                disabled={carregando}>Inscrever-se</button>
                            <hr className="my-4" />
                        </form>
                    </div>
                    <div className="card-footer" style={{
                        minHeight: "5vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <div>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <div>
                            <p className="h5">
                                <a
                                    href="https://github.com/RuivoTech"
                                    title="Todos os direitos reservados."
                                    target="_blank"
                                >
                                    &copy; RuivoTech
                                </a>
                            </p>
                            <span className="h6 font-weight-bold">
                                Versão <a
                                    href={`https://github.com/RuivoTech/cem-react/tree/${packageJson.version}`}
                                    target="_blank"
                                >
                                    {packageJson.version}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Inscricoes;