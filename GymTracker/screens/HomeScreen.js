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

import * as SQLite from "expo-sqlite";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const db = SQLite.openDatabase("GymTracker");

const HomeScreen = ({ navigation }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  const [workoutList, setWorkoutList] = useState([]);

  const [forceUpdate, setForceUpdate] = useState(0);
  const isFocused = useIsFocused();

  const windowWidth = useRef(Dimensions.get("window").width);
  const windowHeight = useRef(Dimensions.get("window").height);

  // const templateNames = useRef(["LEGS", "PUSH", "PULL"]);
  const templatePresetList = useRef([
    {
      Name: "LEGS",
      Exercises: [
        "SQUAT",
        "DEADLIFT",
        "LEG EXTENSIONS",
        "BARBELL THRUSTS",
        "CALF RAISES",
      ],
      Weights: [
        ["", "", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      Reps: [
        ["", "", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      RestTimers: ["180", "150", "120", "120", "60"],
      IsLocke: false,
    },
    {
      Name: "PUSH",
      Exercises: [
        "BENCH",
        "DUMBELL SH. PRESS",
        "CABLE FLYS",
        "CABLE LATERAL RAISE",
        "TRICEP CABLE KICKBACK",
      ],
      Weights: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      Reps: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      RestTimers: ["150", "150", "120", "120", "90"],
      IsLocked: false,
    },
    {
      Name: "PULL",
      Exercises: [
        "PULL UP",
        "PENDLAY ROW",
        "EZ BAR CURL",
        "PREACHER CURL",
        "CABLE FACE PULL",
      ],
      Weights: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", ""],
      ],
      Reps: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
        ["", ""],
      ],
      RestTimers: ["150", "150", "120", "120", "60"],
      IsLocked: false,
    },
  ]);
  const templateList = useRef([]);

  useEffect(() => {
    createWorkoutsTable();
    createTemplateTable();
    createTemplateData();
  }, []);

  useEffect(() => {
    isFocused && loadData();
    // deleteData();
    // deleteTemplateData();
  }, [isFocused, forceUpdate]);

  const createWorkoutsTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Workouts (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TINYTEXT, Exercises TEXT, Weights TEXT, Reps TEXT, RestTimers TEXT, IsLocked TINYTEXT);"
        );
      },
      (tx, error) => console.log("ERROR")
    );
  };

  const createTemplateTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Templates (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TINYTEXT, Exercises TEXT, Weights TEXT, Reps TEXT, RestTimers TEXT, IsLocked TINYTEXT);"
        );
      },
      (tx, error) => console.log("ERROR")
    );
  };

  const createTemplateData = () => {
    templatePresetList.current.map((workout, i) => {
      console.log(workout.Name);
      db.transaction((tx) =>
        tx.executeSql(
          "INSERT OR REPLACE INTO Templates (ID, Name, Exercises, Weights, Reps, RestTimers, IsLocked) VALUES (?,?,?,?,?,?,?)", //WHERE NOT EXISTS ( SELECT 1 FROM Templates WHERE Name = ? )",
          [
            i,
            workout.Name,
            JSON.stringify(workout.Exercises),
            JSON.stringify(workout.Weights),
            JSON.stringify(workout.Reps),
            JSON.stringify(workout.RestTimers),
            JSON.stringify(workout.IsLocked),
            // workout.Name,
          ],
          null,
          (tx, error) => console.log("ERROR CREATING TEMPLATE DATA", error)
        )
      );
    });
  };

  const loadData = () => {
    // workoutList data loading
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT ID, Name, Exercises FROM Workouts", // ORDER BY LastPerformed
          null,
          (tx, result) => {
            setWorkoutList(result.rows._array);
            // console.log(result.rows._array);
          },
          (tx, error) =>
            console.log("ERROR loading homescreen WorkoutList data") // error cb
        );
      });
    } catch (error) {
      console.log("ERROR LOADING HOMESCREEN WorkoutList DATA");
    }

    // templateList data loading
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT ID, Name, Exercises FROM Templates", // ORDER BY LastPerformed
          null,
          (tx, result) => {
            for (let i = 0; i < result.rows.length; i++) {
              templateList.current.push({
                ID: result.rows.item(i).ID,
                Name: result.rows.item(i).Name,
                Exercises: JSON.parse(result.rows.item(i).Exercises),
                // Name: result.rows.item(i).Name
              });
            }
          },
          (tx, error) =>
            console.log("ERROR loading homescreen TemplateList data") // error cb
        );
      });
    } catch (error) {
      console.log("ERROR LOADING HOMESCREEN TemplateList DATA");
    }
  };

  const createWorkout = () => {
    const stri = "poop";
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "INSERT INTO Workouts (Name, Exercises) VALUES (?, ?)",
          [stri, stri],
          (tx, result) => setForceUpdate((prev) => prev + 1),
          (tx, error) => console.log("ERROR INSERTING WORKOUT", error)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "DELETE FROM Workouts",
          [],
          () => {},
          (tx, error) => console.log("ERROR DELETING WORKOUT")
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTemplateData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "DELETE FROM Templates",
          [],
          () => {},
          (tx, error) => console.log("ERROR DELETING Templates")
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        ["LEGS-TEMPLATE", JSON.stringify(templatePresetList.current[0])],
        ["PUSH-TEMPLATE", JSON.stringify(templatePresetList.current[1])],
        ["PULL-TEMPLATE", JSON.stringify(templatePresetList.current[2])],
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
          <Text style={styles.screenHeaderText} onPress={createWorkout}>
            THE GYM TRACKER
          </Text>
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
              key={workout.ID}
              navigation={navigation}
              id={workout.ID}
              name={workout.Name}
              exercises={workout.Exercises}
              setForceUpdate={setForceUpdate}
            />
          );
        })}

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Templates</Text>
        </View>
        {/* {templateList.current.map((workout) => {
          console.log("yo", workout.Name);
        })} */}
        {templateList.current.map((workout, i) => (
          <TemplateComponent
            key={i}
            name={workout.Name}
            exercises={workout.Exercises}
            navigation={navigation}
          />
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
