import React, { useState, useContext } from "react";
import packageJson from '../../../package.json';
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context";
import logo3 from "../../images/Logo3.jpg";
import logo1 from "../../images/Logo1.jpg";
import api from "../../services/api";

const Login = () => {
    const history = useHistory();
    const { signIn } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async e => {
        e.preventDefault();

        setCarregando(true);

        if (!email || !senha) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
            try {
                let response = await api.post("/login", { email, senha });
                if (response.data.error) {
                    setCarregando(false);
                    setError(response.data.error);
                } else {
                    signIn(response.data);

                    setCarregando(false);
                    history.push("/dashboard");
                }

            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <main style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
            >
                <img src={logo3} alt="Logo Sistema CEM" style={{
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
                    width: "24vw",
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
                            Login
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="Digite seu email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    readOnly={carregando}
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="senha">Senha</label>
                                <input
                                    type="password"
                                    id="senha"
                                    className="form-control"
                                    placeholder="Digite sua senha..."
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    readOnly={carregando}
                                />
                            </div>

                            <button className="btn btn-success btn-block" style={{
                                fontSize: 18,
                                fontWeight: 700,
                                lineHeight: 1.2
                            }}
                                disabled={carregando}
                            >
                                Entrar
                            </button>
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

export default Login;