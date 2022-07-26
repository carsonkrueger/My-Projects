import React, { useRef, useState } from "react";

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

const TemplateComponent = ({ navigation, id, name, exercises }) => {
  const handleLongPress = () => {
    if (!isTranslated) {
      setIsTranslated(true);
      Animated.timing(translation, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setIsTranslated(false);
      Animated.timing(translation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    Vibration.vibrate(25);
  };

  const handleDeleteWorkout = () => {
    AsyncStorage.removeItem(name);
    setForceUpdate((prevNum) => prevNum + 1);
  };

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      marginVertical: "2%",
      marginHorizontal: "5%",
    },
    topContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#c9c9c9",
      borderRadius: 10,
      padding: "4%",
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
    preview: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            // loadWorkoutData(name);
            navigation.navigate("WorkoutScreen", {
              id: id,
              isTemplate: true,
            });
          }}
          delayLongPress={500}
        >
          <View style={styles.left}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.right}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TemplateComponent;
