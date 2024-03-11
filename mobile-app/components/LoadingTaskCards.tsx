import { FlatList, ScrollView, StyleSheet, View } from "react-native";

function LoadingTaskCard() {
    return (
        <View style={styles.container}>
            <View style={styles.loadingSwitch}/>
            <View style={styles.loadingTitle}/>
        </View>
    )
}


export default function LoadingTaskCards({amount=5} : { amount?: number }) {
    const TaskCards = Array.from({ length: amount }, () => LoadingTaskCard())
    
    return <ScrollView
        contentContainerStyle={{paddingHorizontal: 25, paddingVertical: 10}}
    >
        <FlatList
            data={TaskCards}
            renderItem={({item})=>item}
            contentContainerStyle={{gap: 10}}
        />
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    loadingSwitch: {
        minWidth: "4%",
        height: 40,
        backgroundColor: "#E0E0E0",
        borderRadius: 15
    },
    loadingTitle: {
        minWidth: "96%",
        height: 40,
        backgroundColor: "#D4D4D4",
        borderRadius: 15
    }
})