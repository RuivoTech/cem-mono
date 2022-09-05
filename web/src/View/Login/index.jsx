import React, { useState, useContext } from "react";
import packageJson from '../../../package.json';
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, Link, TextField, Typography } from "@mui/material";
import { Copyright, LockOutlined } from "@mui/icons-material";

import { AuthContext } from "../../context";
import api from "../../services/api";

const Login = () => {
    const date = new Date();
    const year = date.getFullYear();
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!email) {
            setEmailError(!emailError);
            setLoading(false);
            return;
        }

        if (!password) {
            setPasswordError(!passwordError);
            setLoading(false);
            return;
        }

        api.post("/login", { email, senha: password })
            .then(response => {
                signIn(response.data);
                setLoading(false);
                navigate("/dashboard");
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401)
                    setError(error.response.data.message)
            })

        return;
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={event => setEmail(event.currentTarget.value)}
                        value={email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.currentTarget.value)}
                        value={password}
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                    {loading && <CircularProgress />}
                    {error.length > 0 && <Typography component="h2" variant="h6" color="orangered">{error}</Typography>}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    height: "10em",
                    fontSize: "0.8rem"
                }}
            >
                <Box>
                    Copyright <Copyright fontSize="small" /> {" "}
                    <Link href="https://github.com/RuivoTech" color="inherit" target="_blank">
                        RuivoTech
                    </Link>{" "}
                    {year}
                </Box>

                <Link href={`https://github.com/RuivoTech/tree/${packageJson.version}`} color="inherit" target="_blank">
                    V{packageJson.version}
                </Link>
            </Box>
        </Container>
    );
}

export default Login;