import React, { StyleSheet, useState } from "react-native";

import { View, Text } from "react-native";

const WorkoutComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("WorkoutScreen")}>
        Workout 1
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    border: 1,
    padding: 15,
  },
});

export default WorkoutComponent;
