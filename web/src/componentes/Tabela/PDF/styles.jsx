import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    table: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "stretch",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#757575",
        width: "90vw"
    },
    thead: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "stretch",
        backgroundColor: "#5c5c5c",
        color: "#fff"
    },
    trow: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "stretch"
    },
    trowBackground: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "stretch",
        backgroundColor: "#e2e2e2"
    },
    tcol: {
        width: "25%",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: "#757575"
    },
    tcell: {
        lineHeight: 1.4,
        margin: "auto",
        marginTop: 5,
        paddingLeft: 2,
        paddingRight: 2,
        fontSize: 10
    }
});