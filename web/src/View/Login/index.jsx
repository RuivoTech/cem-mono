import React, { useState, useContext } from "react";
import packageJson from '../../../package.json';
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context";
import agenda from "../../images/agenda.jpeg";
import api from "../../services/api";
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

const Login = () => {
    const history = useHistory();
    const { signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = async event => {
        event.preventDefault();

        setLoading(true);

        if (!email) {
            setEmailError(!emailError);
            return;
        }

        if (!password) {
            setPasswordError(!passwordError);
            return;
        }

        try {
            let response = await api.post("/login", { email, senha: password });
            if (response.data.error) {
                setLoading(false);
                return;
            }

            signIn(response.data);

            setLoading(false);
            history.push("/dashboard");
        } catch (error) {
            console.log(error);
        }

        return;
    };

    return (
        <Grid container component="main" style={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                style={{
                    backgroundImage: `url(${agenda})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "#cccccc",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    style={{
                        margin: "4em 2em",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center"
                    }}
                >
                    <Avatar style={{ margin: "1em", bgcolor: 'purple' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box marginTop={1} component="form" onSubmit={handleLogin}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={event => setEmail(event.currentTarget.value)}
                            error={emailError}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-passord"
                            onChange={event => setPassword(event.currentTarget.value)}
                            error={passwordError}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: "1em",
                                marginBottom: "0.7em"
                            }}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;