import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

const Exercise = (name) => {
  return (
    <View style={exerciseBoxStyle.container}>
      <TextInput
        placeholder="Exercise Name"
        name="cow"
        // onChangeText={setName((newText) => setName(newText))}
      ></TextInput>
    </View>
  );
};

const exerciseBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: "#34a1eb",
    borderWidth: 1,
  },
});

export default Exercise;
