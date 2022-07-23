import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";
import TemplateComponent from "../components/templateComponent";
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const db = SQLite.openDatabase(
  {
    name: "Main",
    location: "default",
  },
  () => {}, // callback
  (error) => {
    console.log(error);
  }
);

const HomeScreen = ({ navigation }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  // const [workoutList, setWorkoutList] = useState([["", 0, ""]]);
  const [workoutList, setWorkoutList] = useState([]);
  const [exercisesArr, setExercisesArr] = useState([[]]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const isFocused = useIsFocused();

  const windowWidth = useRef(Dimensions.get("window").width);
  const windowHeight = useRef(Dimensions.get("window").height);

  const templateNames = useRef(["LEGS", "PUSH", "PULL"]);
  const templateList = useRef([
    [
      ["SQUAT", "DEADLIFT", "LEG EXTENSIONS", "BARBELL THRUSTS", "CALF RAISES"],
      [
        ["", "", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      [
        ["", "", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      ["180", "150", "120", "120", "60"],
      false,
    ],
    [
      [
        "BENCH",
        "DUMBELL SH. PRESS",
        "CABLE FLYS",
        "CABLE LATERAL RAISE",
        "TRICEP CABLE KICKBACK",
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      ["150", "150", "120", "120", "90"],
      false,
    ],
    [
      [
        "PULL UP",
        "PENDLAY ROW",
        "EZ BAR CURL",
        "PREACHER CURL",
        "CABLE FACE PULL",
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", ""],
      ],
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", ""],
      ],
      ["150", "150", "120", "120", "60"],
      false,
    ],
  ]);

  useEffect(() => {
    // storeTemplateData();
    createTable();
  }, []);

  useEffect(() => {
    // isFocused && loadHomescreenNames();
  }, [isFocused, forceUpdate]);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS" +
          "Workouts" +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, WorkoutName STRING, Exercises STRING, Weights STRING, Reps STRING, RestTimers STRING, IsLocked STRING);"
      );
    });
  };

  const loadData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Workouts", [], // ORDER BY LastPerformed
          (tx, result) => {
            
          }
        )
      })
    }
  }

  const loadHomescreenNames = async () => {
    try {
      const workoutNames = await AsyncStorage.getAllKeys();

      // remove from workout list to prevent them from being rendered under "MY WORKOUTS"
      if (workoutNames.includes("LEGS-TEMPLATE")) {
        workoutNames.splice(
          workoutNames.findIndex((workout) => workout === "LEGS-TEMPLATE"),
          1
        );
        workoutNames.splice(
          workoutNames.findIndex((workout) => workout === "PUSH-TEMPLATE"),
          1
        );
        workoutNames.splice(
          workoutNames.findIndex((workout) => workout === "PULL-TEMPLATE"),
          1
        );
      }

      if (workoutNames !== null) {
        setWorkoutList(workoutNames);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving homescreen data");
      throw error;
    }
  };

  const loadHomescreenExercises = async () => {};

  const storeTemplateData = async () => {
    try {
      // const workoutNames = await AsyncStorage.getAllKeys();
      // if (!workoutNames.includes("LEGS-TEMPLATE")) {
      await AsyncStorage.multiSet([
        ["LEGS-TEMPLATE", JSON.stringify(templateList.current[0])],
        ["PUSH-TEMPLATE", JSON.stringify(templateList.current[1])],
        ["PULL-TEMPLATE", JSON.stringify(templateList.current[2])],
      ]);
    } catch (error) {
      console.log("could not store template data");
      throw error;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    screenHeader: {
      paddingTop: 50,
      backgroundColor: "#2494f0", //"white",
      paddingBottom: 10,
      borderRadius: 20,
      alignItems: "center",
    },
    screenHeaderText: {
      fontSize: 20,
      color: "white", //"#2494f0",
    },
    subHeaderContainer: {
      width: "100%",
      paddingLeft: "2%",
      paddingVertical: "2%",
    },
    subHeaderText: {
      paddingTop: "3%",
      paddingLeft: "5%",
      fontSize: 15,
      color: "#bfbfbf",
    },
    newCreateWorkoutContainer: {
      width: "90%",
      marginVertical: "2%",
      marginHorizontal: "5%",
      justifyContent: "center",
      alignItems: "center",
      // borderWidth: 1,
      // borderColor: "#c9c9c9",
      borderRadius: 10,
      paddingVertical: "2%",
      backgroundColor: "#2494f0",
    },
    createWorkoutButton: {
      position: "absolute",
      marginTop: windowHeight.current - 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 40,
      backgroundColor: "#2494f0",
      width: 170,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: windowWidth.current / 2 - 85,
    },
    createWorkoutText: {
      color: "white",
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0, 2]}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenHeaderText}>THE GYM TRACKER</Text>
        </View>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>My Workouts</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("WorkoutScreen", {
              name: "",
            })
          }
        >
          <View style={styles.newCreateWorkoutContainer}>
            <Feather name="plus" color="white" size={30} />
          </View>
        </TouchableOpacity>

        {workoutList.map((workout, i) => {
          return (
            <WorkoutComponent
              key={workout}
              navigation={navigation}
              name={workout}
              setForceUpdate={setForceUpdate}
            />
          );
        })}

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Templates</Text>
        </View>

        {templateNames.current.map((workout, i) => (
          <TemplateComponent key={i} name={workout} navigation={navigation} />
        ))}
      </ScrollView>

      {/* <TouchableOpacity
        style={styles.createWorkoutButton}
        onPress={() =>
          navigation.navigate("WorkoutScreen", {
            name: "",
          })
        }
      >
        <Text style={styles.createWorkoutText}>CREATE WORKOUT</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
