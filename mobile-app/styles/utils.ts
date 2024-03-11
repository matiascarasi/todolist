import { StyleSheet } from "react-native";
import { getFontSize } from "../utils/getFontSize";

export const utilsStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: "row",
    }
});

export const tasksABMStyles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent:"space-between",
        paddingHorizontal: 25,
        paddingVertical: 10
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        gap: 20
    },
    content: {
        borderColor: "#D4D4D4",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#F9F9F9",
        padding: 15,
        fontSize: getFontSize(18)
    },
    actionButtons: {
        gap: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    title: {
        fontSize: getFontSize(22),
        padding: 5,
        width: "100%" 
    }
})