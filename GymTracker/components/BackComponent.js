import React, { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const BackComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate("HomeScreen")}}>
                <Text style={styles.text}>FINISH</Text>
            </TouchableOpacity>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    text: {
        color: "#2494f0",
        fontSize: 17,
    }
})

export default BackComponent;