import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, Box, Container, Link, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Copyright, LockOutlined } from "@mui/icons-material";
import packageJson from '../../../package.json';

import { useAuth } from "../../context/auth";

const Login = () => {
    const navigate = useNavigate();
    const { Login } = useAuth();
    const date = new Date();
    const year = date.getFullYear();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);

        if (!email) {
            setEmailError(true);
            setLoading(false);
            return;
        } else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            setLoading(false);
            return;
        } else {
            setPasswordError(false);
        }

        const request = await Login(email, password);

        if (Boolean(request)) {
            navigate("/dashboard");
        }
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
                <Box noValidate sx={{ mt: 1 }}>
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
                        error={emailError}
                        helperText={emailError ? "Por favor, informe o seu e-mail!" : null}
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
                        error={passwordError}
                        helperText={passwordError ? "Por favor, informe a sua senha!" : null}
                        onKeyDown={event => event.key === "Enter" ? handleLogin() : null}
                    />
                    <LoadingButton
                        onClick={handleLogin}
                        loading={loading}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </LoadingButton>
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
                    Copyright <Copyright sx={{ fontSize: 12 }} /> {" "}
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