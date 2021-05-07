import React, { useState } from 'react';
import { Image, ImageBackground, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faKey, faArrowRight, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import Menu from '../../Components/Menu';
import fundo from "../../assets/images/fundo.png";
import avatarLogin from "../../assets/images/avatar-login.png";

import { styles } from './styles';

const Entrar = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Menu />
            <ImageBackground
                source={fundo}
                style={{
                    flex: 1,
                    resizeMode: "cover"
                }}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.keyboard}
                >
                    <View style={styles.container}>
                        <View style={styles.loginTitle}>
                            <Image source={avatarLogin} style={{ width: 200, height: 200 }} />
                            <Text style={styles.loginTitleText}>
                                Olá, Visitante,{"\n"}
                                <Text style={styles.loginTitleSubText}>
                                    seja bem-vindo
                            </Text>
                            </Text>
                        </View>
                        <View style={styles.loginContent}>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faUser} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    keyboardType="email-address"
                                    placeholder="E-mail..."
                                    placeholderTextColor="#FFFFFF"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faKey} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={senha}
                                    onChangeText={text => setSenha(text)}
                                    placeholder="Senha..."
                                    placeholderTextColor="#FFFFFF"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity style={styles.showPassword} onPress={() => setShowPassword(!showPassword)}>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="#FFFFFF" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={styles.forgotPassword}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text style={styles.forgotPasswordText}>
                                            Esqueci a Senha
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => { }} style={styles.buttonLogin}>
                                    <FontAwesomeIcon icon={faArrowRight} color="#FFFFFF" size={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.registerContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Registrar")}>
                                <Text style={styles.registerText}>
                                    Quero me cadastrar!!!
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </>
    );
}

export default Entrar;