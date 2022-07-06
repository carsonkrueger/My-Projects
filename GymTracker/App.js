import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Row from "./components/Row.jsx";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>BIG POG!</Text>
      <StatusBar style="auto" />
      <Row></Row>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
