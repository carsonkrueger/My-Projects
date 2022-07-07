import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import Workout from "./components/Workout";

export default function App() {
  const [view, setView] = useState(0);

  const ChangeView = (viewPage) => {
    setView(viewPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => ChangeView(1)}>
        <Text>Create Workout</Text>
      </TouchableOpacity>
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
