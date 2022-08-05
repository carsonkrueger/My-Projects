import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PrevComponent = ({ info, index }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: index % 2 === 1 ? "#FFF" : "#ededed",
      margin: "4%",
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Text>Date: {info.LastPerformed}</Text>
    </View>
  );
};

export default PrevComponent;
