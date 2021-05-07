import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    keyboard: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    registerTitle: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    registerTitleText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        justifyContent: "center"
    },
    registerTitleSubText: {
        fontSize: 18,
        fontWeight: "300",
        justifyContent: "center"
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: 350,
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10
    },
    inputText: {
        width: 260,
        marginLeft: 10,
        fontSize: 22,
        color: "#FFFFFF"
    },
    showPassword: {
        position: "absolute",
        right: 10
    },
    buttonContainer: {
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#f37835"
    },
    buttonLogin: {
        borderRadius: 100,
        backgroundColor: "#f37835",
        padding: 25,
        marginTop: 25,
        marginBottom: 30
    }
})