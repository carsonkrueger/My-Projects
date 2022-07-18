import React, { useRef } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Animated,
} from "react-native";

// import Animated, { useSharedValue } from "react-native-reanimated";

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutComponent = ({ navigation, name }) => {
  const translation = useRef(new Animated.Value(0)).current;

  const handleLongPress = () => {
    console.log("long press");

    Animated.timing(translation, {
      toValue: -60,
      timing: 100,
      useNativeDriver: true,
    }).start();

    Vibration.vibrate(25);
  };

  const handleDeleteWorkout = () => {
    AsyncStorage.removeItem(name);
  };

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      marginVertical: "2%",
    },
    topContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#c9c9c9",
      borderRadius: 10,
      padding: "4%",
      transform: [{ translateX: translation }],
    },
    topButton: {
      flex: 1,
    },
    left: {
      flex: 1,
      paddingLeft: 10,
    },
    right: {
      flex: 2,
      paddingRight: 10,
    },
    title: {
      fontSize: 15,
    },
    date: {
      color: "#9c9c9c",
    },
    preview: {},
    trashContainer: {
      flex: 1,
      position: "absolute",
      zIndex: -10,
      marginLeft: "70%",
      width: "30%",
      height: "100%",
      paddingTop: "7.5%",
      paddingLeft: "17.5%",
      borderRadius: 15,
      backgroundColor: "red",
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.topButton}
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
          <View style={styles.right}></View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.trashContainer}
        onPress={handleDeleteWorkout}
      >
        <View>
          <Feather name="trash" color="black" size={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutComponent;
