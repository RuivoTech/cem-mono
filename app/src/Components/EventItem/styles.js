import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    type: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    typeColor: {
        width: 10,
        height: 100,
        padding: 5,
        position: "absolute",
        left: 0,
        top: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    typeText: {
        color: "#464646",
        fontSize: 26,
        lineHeight: 25,
        textTransform: "lowercase"
    },
    content: {
        width: "75%",
        paddingLeft: 6,
        paddingTop: 3,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#525252"
    }
})