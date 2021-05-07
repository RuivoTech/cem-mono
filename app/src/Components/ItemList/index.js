import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import EventModal from "../EventModal";

import { styles } from "./styles";

const ItemList = ({ type, title, content, author, color }) => {
    const [showModal, setShowModal] = useState(false);

    function renderType() {
        if (type.toLowerCase() === "devocional" || type.toLowerCase() === "reflexao") {
            return type.slice(0, 3);
        }

        return type;
    }

    function handleShowModal() {
        setShowModal(!showModal);
    }

    return (
        <>
            <TouchableOpacity onPress={() => handleShowModal()} style={styles.itemList}>
                <View style={styles.type}>
                    <View style={[styles.typeColor, { backgroundColor: color }]}></View>
                    <Text style={styles.typeText}>{renderType()}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.contentText} numberOfLines={2}>{content}</Text>
                    <Text style={styles.authorText}>{author}</Text>
                </View>
            </TouchableOpacity>
            <EventModal show={showModal} handleShowModal={handleShowModal} />
        </>
    )
}

export default ItemList;