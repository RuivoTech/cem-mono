import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemList: {
        flexDirection: "row",
        height: 100,
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
        textTransform: "capitalize"
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
    },
    contentText: {
        padding: 2,
        fontSize: 12
    },
    authorText: {
        position: "absolute",
        bottom: 5,
        right: 5,
        color: "#6e6e6e",
        fontWeight: "bold",
        fontSize: 14
    }
});