import React, { useState } from 'react';
import { Image, ImageBackground, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faArrowRight, faEnvelope, faPhone, faKey } from '@fortawesome/free-solid-svg-icons';

import Menu from '../../Components/Menu';
import fundo from "../../assets/images/fundo.png";
import avatarLogin from "../../assets/images/avatar-login.png";

import { styles } from './styles';

const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

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
                        <View style={styles.registerTitle}>
                            <Text style={styles.registerTitleText}>
                                Olá, Visitante,{"\n"}
                                <Text style={styles.registerTitleSubText}>
                                    seja bem-vindo
                            </Text>
                            </Text>
                        </View>
                        <View style={styles.registerContent}>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faUser} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    keyboardType="default"
                                    placeholder="Nome completo..."
                                    placeholderTextColor="#FFFFFF"
                                    autoCapitalize="words"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faEnvelope} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={email}
                                    keyboardType="email-address"
                                    onChangeText={text => setEmail(text)}
                                    placeholder="E-mail..."
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faPhone} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={email}
                                    keyboardType="phone-pad"
                                    onChangeText={text => setEmail(text)}
                                    placeholder="Celular..."
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faPhone} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={email}
                                    keyboardType="phone-pad"
                                    onChangeText={text => setEmail(text)}
                                    placeholder="Data de nascimento..."
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesomeIcon icon={faKey} color="#FFFFFF" size={30} />
                                <TextInput
                                    style={styles.inputText}
                                    value={email}
                                    keyboardType="default"
                                    onChangeText={text => setEmail(text)}
                                    placeholder="Senha..."
                                    placeholderTextColor="#FFFFFF"
                                />
                            </View>
                            <View style={styles.buttonContainer}>
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

export default Register;