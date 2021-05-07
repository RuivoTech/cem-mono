import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { styles } from "./styles";

const EventItem = ({ event }) => {
    const monthOfYear = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const weekDay = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

    return (
        <>
            <TouchableOpacity onPress={() => { }} style={styles.container}>
                <View style={styles.type}>
                    <View style={[styles.typeColor, { backgroundColor: event.color }]}></View>
                    <Text style={styles.typeText}>{weekDay[event.weekDay]}</Text>
                    <Text style={styles.typeText}>{event.day}</Text>
                    <Text style={styles.typeText}>{monthOfYear[event.month].slice(0, 3)}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.titleText}>{event.title}</Text>
                    <Text style={styles.hourStart}>{event.hourStart}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default EventItem;