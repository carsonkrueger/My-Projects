import React, { useRef, useState } from "react";

import * as SQLite from "expo-sqlite";

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

const db = SQLite.openDatabase("GymTracker");

const WorkoutComponent = ({
  navigation,
  id,
  name,
  exercises,
  setForceUpdate,
}) => {
  const translation = useRef(new Animated.Value(0)).current;
  const [isTranslated, setIsTranslated] = useState(false);

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

  const handleDeleteWorkout = async () => {
    try {
      await db.transaction(
        async (tx) =>
          await tx.executeSql(
            "DELETE FROM Workouts WHERE ID = ?",
            [id],
            () => {},
            (tx, error) => console.log("ERROR DELETING WORKOUT")
          )
      );
    } catch (error) {
      console.log(error);
    }
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
      fontSize: 11,
    },
    preview: {},
    trashContainer: {
      flex: 1,
      position: "absolute",
      zIndex: -10,
      marginLeft: "70%",
      width: "30%",
      height: "100%",
      paddingTop: "6%",
      paddingLeft: "17%",
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
            navigation.navigate("WorkoutScreen", {
              id: id,
              isTemplate: false,
            });
          }}
          onLongPress={handleLongPress}
          delayLongPress={500}
        >
          <View style={styles.left}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.date}>Last Performed:</Text>
          </View>
          <View style={styles.right}></View>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.trashContainer}
        onPress={handleDeleteWorkout}
      >
        <View>
          <Feather name="trash" color="white" size={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutComponent;
