import React, { useState } from "react";
import { FlatList, ImageBackground, RefreshControl, TouchableOpacity, View } from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";

import Menu from "../../Components/Menu";
import ItemList from "../../Components/ItemList";
import fundo from "../../assets/images/fundo.png";

import { styles } from "./styles";

import { data } from "./data";

const Home = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [responseData, setResponseData] = useState({});

    function handleRefresh() {
        const url = `https://api.github.com/v3/users/RuivoTech`;
        setIsRefreshing(true)
        Axios.get(url)
            .then(res => {
                setResponseData(res.data);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error);
                setIsRefreshing(false);
            });
    }

    return (
        <>
            <Menu />
            <FlatList
                style={{
                    paddingTop: 10
                }}
                refreshing
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={() => handleRefresh()} />
                }
                data={data}
                renderItem={({ item }) =>
                    <ItemList
                        type={item.type}
                        title={item.title}
                        content={item.description}
                        author={item.name}
                        color={item.type.toLowerCase() === "devocional" ? "#e24443" : "#2c3f50"}
                    />
                }
                keyExtractor={item => item.id}
            />
            <View style={styles.newDevocional}>
                <TouchableOpacity onPress={() => navigation.navigate("EditItem")}>
                    <FontAwesomeIcon icon={faPlus} size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home;