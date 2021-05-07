import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5"
    },
    header: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "rgb(49, 49, 51)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    buttonBack: {
        marginLeft: 10
    },
    buttonCheck: {
        marginRight: 10
    },
    logo: {
        width: 38,
        height: 38
    },
    switch: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#CCCCCC",
        borderTopWidth: 1,
        borderTopColor: "#f37835"
    },
    switchText: {
        fontSize: 18,
        color: "#464646"
    },
    reference: {
        textAlignVertical: "top",
        backgroundColor: "#CCCCCC",
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18,
        color: "#464646"
    },
    text: {
        textAlignVertical: "top",
        backgroundColor: "#CCCCCC",
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 16,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        color: "#464646"
    }
});