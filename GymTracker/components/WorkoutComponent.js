import React, { useRef, useState } from "react";

import * as SQLite from "expo-sqlite";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Animated,
  Dimensions,
} from "react-native";

// import Animated, { useSharedValue } from "react-native-reanimated";

import { Feather } from "@expo/vector-icons";

const db = SQLite.openDatabase("GymTracker");

const WorkoutComponent = ({
  navigation,
  id,
  name,
  lastPerformed,
  exercises,
  setForceUpdate,
}) => {
  const translation = useRef(new Animated.Value(0)).current;
  const windowWidth = useRef(Dimensions.get("window").width);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleLongPress = () => {
    if (!isTranslated) {
      setIsTranslated(true);
      Animated.timing(translation, {
        toValue: -(windowWidth.current / 6),
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
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#c9c9c9",
      borderRadius: 10,
      padding: "4%",
      transform: [{ translateX: translation }],
    },
    topButton: {
      flex: 1,
      flexDirection: "row",
    },
    left: {
      flex: 4,
      paddingLeft: 10,
      justifyContent: "space-evenly",
    },
    right: {
      flex: 5,
      paddingRight: 10,
    },
    title: {
      fontSize: 16,
    },
    date: {
      color: "#9c9c9c",
      fontSize: 11,
      alignItems: "flex-end",
    },
    preview: {
      color: "#9c9c9c",
      fontSize: 11,
      textAlign: "right",
    },
    dots: {
      color: "#9c9c9c",
      fontSize: 13,
      textAlign: "right",
    },
    trashContainer: {
      flex: 1,
      position: "absolute",
      zIndex: -10,
      width: "100%",
      height: "100%",
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 12,
    },
    trashButton: {
      flex: 1,
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: "6%",
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
            <Text style={styles.date}>LAST PERFORMED: {lastPerformed}</Text>
          </View>
          <View style={styles.right}>
            {exercises.map((name, i) =>
              i < 4 ? (
                <Text key={i} style={styles.preview}>
                  {name}
                </Text>
              ) : i < 5 ? (
                <Text key={i} style={styles.dots}>
                  ...
                </Text>
              ) : null
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.trashContainer}>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={handleDeleteWorkout}
        >
          <View>
            <Feather name="trash" color="red" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutComponent;
