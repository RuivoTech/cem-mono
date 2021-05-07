import React from "react";
import { ImageBackground, Modal, Text, View } from "react-native";
import Menu from "../Menu";

import fundo from "../../assets/images/fundo.png";

import { styles } from "./styles";

const EventModal = ({ show, handleShowModal }) => {
    return (
        <Modal visible={show} onRequestClose={() => handleShowModal()} animationType="fade">
            <Menu isModal={true} handleShowModal={handleShowModal} />
            <ImageBackground
                source={fundo}
                style={{
                    flex: 1,
                    resizeMode: "cover"
                }}>
                <View style={styles.container}>

                </View>
            </ImageBackground>
        </Modal>
    )
}

export default EventModal;