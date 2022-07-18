import React, { useRef } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

const WorkoutComponent = ({ navigation, name }) => {
  const translation = useRef(new Animated.Value(0)).current;

  const handleLongPress = () => {
    console.log("long press");

    Animated.timing(translation, {
      toValue: 50,
      useNativeDriver: true,
    }).start();
  };

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#c9c9c9",
      borderRadius: 10,
      paddingVertical: "4%",
      marginVertical: "2%",
    },
    left: {
      flex: 1,
      paddingLeft: 10,
    },
    Right: {
      flex: 2,
      paddingRight: 10,
      backgroundColor: "orange",
    },
    title: {
      fontSize: 15,
    },
    date: {
      color: "#9c9c9c",
    },
    preview: {},
    testAnim: {
      transform: [{ translateX: -translation }],
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // loadWorkoutData(name);
        navigation.navigate("WorkoutScreen", { name: name });
      }}
      onLongPress={handleLongPress}
      delayLongPress={500}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>Last Used:</Text>
      </View>
      <View style={styles.right}>
        <Animated.View style={styles.testAnim}></Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutComponent;
