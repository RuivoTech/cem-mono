import { StyleSheet } from "@react-pdf/renderer"

export const styles = StyleSheet.create({
    viewer: {
        width: "100vw",
        height: "100vh"
    },
    page: {
        display: "flex",
        flexDirection: 'column',
        width: "100vw",
        fontSize: 10,
        paddingTop: "2vh",
        paddingRight: "2vw",
        paddingBottom: "5vh",
        paddingLeft: "5vw"
    },
    header: {
        width: "90vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    logo: {
        width: "10vw",
        height: "10vh"
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        paddingRight: "2vw"
    },
    content: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: "5vh"
    }
});