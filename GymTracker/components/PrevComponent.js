import React from "react";
import { StyleSheet, View } from "react-native";

const PrevComponent = () => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      backgroundColor: "white",
    },
  });

  return <View style={styles.container}></View>;
};

export default PrevComponent;
