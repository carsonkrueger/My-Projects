import React, { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const BackComponent = ({
  navigation,
  storeWorkoutData,
  workoutName,
  checkUniqueWorkoutName,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // checkUniqueWorkoutName();
          storeWorkoutData();
          // navigation.goBack();
          navigation.navigate("HomeScreen", { workoutName: workoutName });
        }}
      >
        <Text style={styles.text}>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 5,
  },
  text: {
    color: "#2494f0",
    fontSize: 17,
  },
});

export default BackComponent;
