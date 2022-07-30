import React from "react";
import { StyleSheet, View } from "react-native";

const PrevComponent = ({ index, name }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: index % 2 === 1 ? "#FFF" : "#ededed",
      margin: "2%",
    },
  });

  return (
    <View style={styles.container}>
      <Text>
        {index}
        {name}
      </Text>
    </View>
  );
};

export default PrevComponent;
