import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
        backgroundColor: "rgb(49, 49, 51)",
        borderStyle: "dashed",
        borderTopWidth: 1,
        borderTopColor: "#f37835"
    },
    header: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 5,
        height: 5
    },
    headerText: {
        fontSize: 22,
        maxWidth: 180,
        color: "#eeeeee"
    },
    userInfoSection: {
        paddingBottom: 15,
    },
    title: {
        color: "#eeeeee",
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        color: "#eeeeee",
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        paddingBottom: 10,
        borderColor: "#f37835",
        borderStyle: "dashed",
        borderTopWidth: 1.2
    },
    drawerSectionText: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#202020",
        color: "#eeeeee",

    },
    drawerContent: {
        flex: 1
    },
    drawerItem: {
        marginTop: 15,
        width: "90%",
        borderColor: "#f37835",
        borderStyle: "dashed",
        borderWidth: 1
    },
    drawerItemText: {
        color: "#eeeeee",
        textTransform: "capitalize"
    },
    bottomDrawerSection: {
        flexDirection: "row",
        marginBottom: 15,
        borderTopColor: '#f37835',
        borderTopWidth: 1,
        borderStyle: "dashed"
    },
    preference: {
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});