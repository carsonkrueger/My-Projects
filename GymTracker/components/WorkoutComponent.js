import React, { StyleSheet, useState } from "react-native";

import { View, Text } from "react-native";

const WorkoutComponent = ({ navigation, name }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          // loadWorkoutData(name);
          navigation.navigate("WorkoutScreen", { name: name });
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  text: {
    textAlign: "center",
  },
});

export default WorkoutComponent;
