import React, { useState } from "react";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

import logo from "../../assets/images/logo.png";
import fundo from "../../assets/images/fundo.png";

import { styles } from "./styles";

const EditItem = ({ navigation }) => {
    const [text, setText] = useState("");
    const [reference, setReference] = useState("");
    const [devocionalOuReflexao, setDevocionalOuReflexao] = useState(false);

    function handleSubmit() {
        console.log(text);
    }

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
                    <FontAwesomeIcon icon={faArrowLeft} color="#f37835" size={30} />
                </TouchableOpacity>
                <Image source={logo} width={5} height={5} style={styles.logo} />
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonCheck}>
                    <FontAwesomeIcon icon={faCheck} color="#f37835" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.switch}>
                    <Switch
                        trackColor={{
                            false: "#464646",
                            true: "#464646"
                        }}
                        thumbColor={devocionalOuReflexao ? "#2c3f50" : "#e24443"}
                        ios_backgroundColor="#464646"
                        value={devocionalOuReflexao}
                        onValueChange={() => setDevocionalOuReflexao(!devocionalOuReflexao)}
                    />
                    <Text style={styles.switchText}>{devocionalOuReflexao ? "Reflexão" : "Devocional"}</Text>
                </View>
                <TextInput
                    style={styles.reference}
                    value={reference}
                    onChangeText={text => setReference(text)}
                    placeholder="Referência(s) da Bíblia"
                    placeholderTextColor="#464646"
                />
                <TextInput
                    style={styles.text}
                    multiline={true}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    numberOfLines={20}
                    scrollEnabled
                    placeholder="Escreva seu devocional/reflexão aqui..."
                    placeholderTextColor="#464646"
                />
            </View>
        </>
    )
}

export default EditItem;