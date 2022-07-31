import React, { useCallback, useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";

import * as SQLite from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";

import BackComponent from "../components/BackComponent";
import ExerciseComponent from "../components/ExerciseComponent";

import { Feather } from "@expo/vector-icons";

const db = SQLite.openDatabase("GymTracker");

const WorkoutScreen = ({ navigation, route }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [states, setStates] = useState({
    workoutName: "",
    exercisesArr: [""],
    weights: [[""]],
    reps: [[""]],
    restTimers: [""],
  });

  const prevWeightReps = useRef({
    prevWeights: [[""]],
    prevReps: [[""]],
  });

  const WORKOUT_ID = useRef(null);
  const [seconds, setSeconds] = useState(new Date().getTime());
  const [isLocked, setIsLocked] = useState(false);

  const date = useRef(new Date());

  const addExercise = () => {
    let exercisesArr = [...states.exercisesArr];
    exercisesArr.push("");

    let weights = [...states.weights];
    weights.push([""]);

    let reps = [...states.reps];
    reps.push([""]);

    let restTimers = [...states.restTimers];
    restTimers.push("");

    // let isDoneArr = [...states.isDoneArr];
    // isDoneArr.push([false]);

    setStates({
      ...states,
      exercisesArr,
      weights,
      reps,
      restTimers,
      // isDoneArr,
    });
  };

  const deleteExercise = (idx) => {
    if (states.exercisesArr.length <= 1) {
      setStates({
        ...states,
        exercisesArr: [""],
        weights: [[""]],
        reps: [[""]],
        restTimers: [""],
        // isDoneArr: [[false]],
      });
    } else {
      let exercisesArr = [...states.exercisesArr];
      exercisesArr.splice(idx, 1);

      let weights = [...states.weights];
      weights.splice(idx, 1);

      let reps = [...states.reps];
      reps.splice(idx, 1);

      let restTimers = [...states.restTimers];
      restTimers.splice(idx, 1);

      // let isDoneArr = [...states.isDoneArr];
      // isDoneArr.splice(idx, 1);

      setStates({
        ...states,
        exercisesArr,
        weights,
        reps,
        restTimers,
        // isDoneArr,
      });
    }
  };

  const setExercisesArr = (exercisesArr) => {
    setStates({
      ...states,
      exercisesArr,
    });
  };

  const setWeights = (weights) => {
    setStates({
      ...states,
      weights,
    });
  };

  const setReps = (reps) => {
    setStates({
      ...states,
      reps,
    });
  };

  const setRestTimers = (restTimers) => {
    setStates({
      ...states,
      restTimers,
    });
  };

  const setWorkoutName = (workoutName) => {
    setStates({
      ...states,
      workoutName,
    });
  };

  const switchLock = () => {
    setIsLocked(!isLocked);
  };

  const loadWorkoutData = async () => {
    if (WORKOUT_ID.current === null) {
      console.log("workout id is null, cannot load data");
      return;
    }

    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT * FROM Workouts WHERE ID = ?;",
          [WORKOUT_ID.current],
          (tx, result) => {
            setStates({
              workoutName: result.rows.item(0).Name,
              exercisesArr: JSON.parse(result.rows.item(0).Exercises),
              //weights is set to empty values ""
              weights: JSON.parse(result.rows.item(0).Weights).map((exer) =>
                exer.map((set) => "")
              ),
              //sets is set to empty values ""
              reps: JSON.parse(result.rows.item(0).Weights).map((exer) =>
                exer.map((set) => "")
              ),
              restTimers: JSON.parse(result.rows.item(0).RestTimers),
            });
            prevWeightReps.current = {
              //prevWeights and prevReps take the weights and reps info
              prevWeights: JSON.parse(result.rows.item(0).Weights),
              prevReps: JSON.parse(result.rows.item(0).Reps),
            };
            setIsLocked(result.rows.item(0).IsLocked);
          },
          (tx, error) =>
            console.log(WORKOUT_ID, "ERROR LOADING WORKOUT SCREEN DATA", error)
        );
      });
    } catch (error) {
      console.log("could not load data for workout screen");
    }
  };

  const loadTemplateData = async () => {
    if (WORKOUT_ID.current === null) {
      // No data to load, new workout
      return;
    }

    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT * FROM Templates WHERE ID = ?;",
          [WORKOUT_ID.current],
          (tx, result) => {
            setStates({
              workoutName: result.rows.item(0).Name,
              exercisesArr: JSON.parse(result.rows.item(0).Exercises),
              weights: JSON.parse(result.rows.item(0).Weights).map((exer) =>
                exer.map((set) => "")
              ),
              reps: JSON.parse(result.rows.item(0).Weights).map((exer) =>
                exer.map((set) => "")
              ),
              restTimers: JSON.parse(result.rows.item(0).RestTimers),
              originalWorkoutName: result.rows.item(0).Name,
              prevWeights: JSON.parse(result.rows.item(0).Weights),
              prevReps: JSON.parse(result.rows.item(0).Reps),
            });
            setIsLocked(result.rows.item(0).IsLocked);
          },
          (tx, error) =>
            console.log(WORKOUT_ID, "ERROR LOADING WORKOUT SCREEN DATA", error)
        );
      });
    } catch (error) {
      console.log("could not load data for workout screen");
    }
  };

  const saveNewData = () => {
    try {
      // savePrevData();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Workouts (Name, Exercises, Weights, Reps, RestTimers, IsLocked, LastPerformed) VALUES (?,?,?,?,?,?,?);",
          [
            states.workoutName,
            JSON.stringify(states.exercisesArr),
            JSON.stringify(states.weights),
            JSON.stringify(states.reps),
            JSON.stringify(states.restTimers),
            isLocked,
            date.current.getMonth() + "-" + date.current.getDate(),
          ],
          null,
          (tx, error) => console.log("COULD NOT SAVE NEW WORKOUT DATA", error)
        );
      });
    } catch (error) {
      console.log("ERROR SAVING WORKOUT SCREEN DATA", error);
    }
    savePrevData();
  };

  const updateData = () => {
    try {
      // savePrevData();
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Workouts SET NAME = ?, Exercises = ?, Weights = ?, Reps = ?, RestTimers = ?, IsLocked = ?, LastPerformed = ? WHERE ID = ?",
          [
            states.workoutName,
            JSON.stringify(states.exercisesArr),
            JSON.stringify(states.weights),
            JSON.stringify(states.reps),
            JSON.stringify(states.restTimers),
            isLocked,
            date.current.getMonth() + "-" + date.current.getDate(),
            WORKOUT_ID.current,
          ],
          null,
          (tx, error) => console.log("COULD NOT UPDATE WORKOUT", error)
        );
      });
    } catch (error) {
      console.log("ERROR UPDATING WORKOUT SCREEN DATA", error);
    }
    savePrevData();
  };

  const savePrevData = () => {
    // states.exercisesArr.forEach((exerName, i) => {
    // Do not save it weights and reps are empty
    // if (
    //   !states.weights[i].includes("") &&
    //   !states.reps[i].includes("")
    // )
    //   return;
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "INSERT INTO Prevs (ID, Name, Weights, Reps, LastPerformed) VALUES (?,?,?,?,?);",
          [
            WORKOUT_ID,
            state.exercisesArr[0],
            JSON.stringify(states.weights[0]),
            JSON.stringify(states.reps[0]),
            date.current.getMonth() + "-" + date.current.getDate(),
          ],
          null,
          (tx, error) => console.log("ERROR", error)
        )
      );
    } catch (error) {
      console.log("error saving prev data", error);
    }
    // });
    navigation.navigate("HomeScreen");
  };

  // on mount
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    async function prepare() {
      try {
        WORKOUT_ID.current = route.params.id;
        route.params.isTemplate
          ? await loadTemplateData()
          : await loadWorkoutData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();

    const intervalId = setInterval(() => {
      setSeconds(new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  const styles = StyleSheet.create({
    container: {
      // Adding justifyContent or alignItems here will cause a bug with scrollView
      backgroundColor: "white", //"#ededed",
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: "60%",
    },
    screenHeader: {
      flex: 1,
      marginTop: "5%",
      marginBottom: "3%",
      marginHorizontal: "4%",
      paddingVertical: "3%",
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#2494f0",
    },
    screenTitleContainer: {
      paddingLeft: "6%",
    },
    screenTitleText: {
      fontFamily: "RobotoCondensedRegular",
      fontSize: 18,
      color: "white", //"#2494f0",
    },
    backContainer: {
      flex: 1,
    },
    lockContainer: {
      paddingHorizontal: 15,
    },
    notesContainer: {
      flexDirection: "row",
      paddingHorizontal: "3%",
      paddingVertical: "3%",
      alignItems: "center",
    },
    notesTitle: {
      flex: 1,
    },
    notesText: {
      fontFamily: "RobotoCondensedRegular",
      flex: 5,
      borderRadius: 5,
      backgroundColor: "#dedede",
      paddingLeft: 3,
      paddingRight: 5,
    },
    addExerciseContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: "7%",
      marginHorizontal: 80,
      backgroundColor: "#43a2f0",
      height: 40,
      borderRadius: 30,
    },
    addExerciseText: {
      fontFamily: "RobotoCondensedRegular",
      fontSize: 18,
      color: "white",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollContainer}
      > */}
      <FlatList
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollContainer}
        data={states.exercisesArr}
        ListHeaderComponent={
          <View>
            <View style={styles.screenHeader}>
              <View style={styles.screenTitleContainer}>
                <TextInput
                  style={styles.screenTitleText}
                  placeholder="WORKOUT NAME"
                  placeholderTextColor="#90c6f5"
                  onChangeText={(newText) => setWorkoutName(newText)}
                  autoCapitalize="characters"
                  value={states.workoutName}
                  editable={!isLocked}
                ></TextInput>
              </View>

              <View style={styles.backContainer}>
                <BackComponent
                  navigation={navigation}
                  saveNewData={saveNewData}
                  updateData={updateData}
                  workoutName={states.workoutName}
                  id={WORKOUT_ID.current}
                  // originalWorkoutName={states.originalWorkoutName}
                  isTemplate={route.params.isTemplate}
                />
              </View>

              <View style={styles.lockContainer}>
                <TouchableOpacity onPress={switchLock}>
                  <Feather
                    name={isLocked ? "lock" : "unlock"}
                    color="white"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <ExerciseComponent
            key={index}
            navigation={navigation}
            name={item}
            numExercise={index}
            restTimers={states.restTimers}
            setRestTimers={setRestTimers}
            seconds={seconds}
            delExercise={deleteExercise}
            exercisesArr={states.exercisesArr}
            setExercisesArr={setExercisesArr}
            prevWeights={prevWeightReps.current.prevWeights}
            weights={states.weights}
            setWeights={setWeights}
            prevReps={prevWeightReps.current.prevReps}
            reps={states.reps}
            setReps={setReps}
            // isDoneArr={states.isDoneArr}
            // setIsDoneArr={setIsDoneArr}
            isLocked={isLocked}
          />
        )}
        ListFooterComponent={
          <View>
            {!isLocked && (
              <TouchableOpacity
                style={styles.addExerciseContainer}
                onPress={addExercise}
              >
                <Text style={styles.addExerciseText}>ADD EXERCISE</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      ></FlatList>

      {/* --------<View style={styles.notesContainer}>
          <Text style={styles.notesTitle} multiline={true}>
            NOTES
          </Text>
          <TextInput style={styles.notesText}></TextInput>
        </View>------- */}

      {/* {states.exercisesArr.map((exercise, i) => {
          return (
            <ExerciseComponent
              key={i}
              name={exercise}
              numExercise={i}
              restTimers={states.restTimers}
              setRestTimers={setRestTimers}
              seconds={seconds}
              delExercise={deleteExercise}
              exercisesArr={states.exercisesArr}
              setExercisesArr={setExercisesArr}
              prevWeights={prevWeightReps.current.prevWeights}
              weights={states.weights}
              setWeights={setWeights}
              prevReps={prevWeightReps.current.prevReps}
              reps={states.reps}
              setReps={setReps}
              // isDoneArr={states.isDoneArr}
              // setIsDoneArr={setIsDoneArr}
              isLocked={isLocked}
            />
          );
        })} */}

      {/* {!isLocked && (
          <TouchableOpacity
            style={styles.addExerciseContainer}
            onPress={addExercise}
          >
            <Text style={styles.addExerciseText}>ADD EXERCISE</Text>
          </TouchableOpacity>
        )} */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default WorkoutScreen;
