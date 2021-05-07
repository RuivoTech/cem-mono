import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    menu: {
        flexDirection: "row",
        height: 40,
        backgroundColor: "rgb(49, 49, 51)",
        justifyContent: "space-between"
    },
    bars: {
        width: 50
    },
    buttonBars: {
        justifyContent: "center",
        width: 40,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    menuLogo: {
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 38,
        height: 38
    },
    notifications: {
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        position: "absolute",
        right: 0
    },
    newDevocional: {
        position: "absolute",
        bottom: 20,
        right: 20
    }
});