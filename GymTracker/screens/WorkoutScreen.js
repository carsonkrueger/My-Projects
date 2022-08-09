import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  AppState,
} from "react-native";

import * as SQLite from "expo-sqlite";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
// import * as SplashScreen from "expo-splash-screen";

import BackComponent from "../components/BackComponent";
import ExerciseComponent from "../components/ExerciseComponent";

import { Feather, Ionicons } from "@expo/vector-icons";

const db = SQLite.openDatabase("GymTracker");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const WorkoutScreen = ({ navigation, route }) => {
  // const [appIsReady, setAppIsReady] = useState(false);
  const initialState = useRef({
    exercise: "",
    weights: [""],
    reps: [""],
    restTimer: "",
  });

  const notificationResponse = Notifications.useLastNotificationResponse();
  const scheduledNotication = useRef();

  const appState = useRef(AppState.currentState);

  const [states, setStates] = useState([]);
  const [workoutName, setWorkoutName] = useState("");

  const prevWeightReps = useRef([]);

  const WORKOUT_ID = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  const date = useRef(new Date());

  const swapExercises = (topIdx) => {
    // swaps perv weights & reps
    [prevWeightReps.current[topIdx], prevWeightReps.current[topIdx + 1]] = [
      prevWeightReps.current[topIdx + 1],
      prevWeightReps.current[topIdx],
    ];
    // swaps everything else held in states
    let tempStates = [...states];
    [tempStates[topIdx], tempStates[topIdx + 1]] = [
      tempStates[topIdx + 1],
      tempStates[topIdx],
    ];
    setStates(tempStates);
  };

  const addExercise = () => {
    let temp = [...states];
    // temp.push(Object.assign({}, initialState.current));
    temp.push({
      exercise: "",
      weights: [""],
      reps: [""],
      restTimer: "",
    });
    setStates(temp);
  };

  const deleteExercise = (idx) => {
    if (states.length <= 1) {
      setStates([
        {
          exercise: "",
          weights: [""],
          reps: [""],
          restTimer: "",
        },
      ]);
    } else {
      let temp = [...states];
      temp.splice(idx, 1);
      setStates(temp);
    }
  };

  const setExercise = (name, numExercise) => {
    let temp = [...states];
    temp[numExercise].exercise = name;
    setStates(temp);
  };

  const setWeights = (weight, numExercise, numSet) => {
    let temp = [...states];
    temp[numExercise].weights[numSet] = weight;
    setStates(temp);
  };

  const setReps = (rep, numExercise, numSet) => {
    let temp = [...states];
    temp[numExercise].reps[numSet] = rep;
    setStates(temp);
  };

  const addSet = (numExercise) => {
    let temp = [...states];

    temp[numExercise].weights.push("");
    temp[numExercise].reps.push("");
    setStates(temp);
  };

  const deleteSet = (numExercise) => {
    let temp = [...states];

    if (temp[numExercise].weights.length <= 1) {
      temp[numExercise].weights = [""];
      temp[numExercise].reps = [""];
    } else {
      temp[numExercise].weights.pop();
      temp[numExercise].reps.pop();
    }

    setStates(temp);
  };

  const setRestTimer = (time, numExercise) => {
    let temp = [...states];
    temp[numExercise].restTimer = time;
    setStates(temp);
  };

  const switchLock = () => {
    setIsLocked(!isLocked);
  };

  const loadWorkoutData = async () => {
    if (WORKOUT_ID.current === null) {
      // create new workout for null id
      setStates([initialState.current]);
      return;
    }

    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT Name, WorkoutInfo, Islocked FROM Workouts WHERE ID = ?;",
          [WORKOUT_ID.current],
          (tx, result) => {
            let tempWorkoutInfo = JSON.parse(result.rows.item(0).WorkoutInfo);

            for (let i = 0; i < tempWorkoutInfo.length; i++) {
              prevWeightReps.current.push({
                weights: tempWorkoutInfo[i].weights,
                reps: tempWorkoutInfo[i].reps,
              });
              tempWorkoutInfo[i].weights = new Array(
                tempWorkoutInfo[i].weights.length
              ).fill("");
              tempWorkoutInfo[i].reps = new Array(
                tempWorkoutInfo[i].reps.length
              ).fill("");
            }
            // console.log(prevWeightReps.current);
            setStates(tempWorkoutInfo);
            setWorkoutName(result.rows.item(0).Name);
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
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT * FROM Templates WHERE Name = ?;",
          [route.params.name],
          (tx, result) => {
            let tempWorkoutInfo = JSON.parse(result.rows.item(0).WorkoutInfo);

            for (let i = 0; i < tempWorkoutInfo.length; i++) {
              prevWeightReps.current.push({
                weights: tempWorkoutInfo[i].weights,
                reps: tempWorkoutInfo[i].reps,
              });
              tempWorkoutInfo[i].weights = new Array(
                tempWorkoutInfo[i].weights.length
              ).fill("");
              tempWorkoutInfo[i].reps = new Array(
                tempWorkoutInfo[i].reps.length
              ).fill("");
            }

            setStates(tempWorkoutInfo);
            setWorkoutName(result.rows.item(0).Name);
            setIsLocked(result.rows.item(0).IsLocked);
          },
          (tx, error) =>
            console.log(
              WORKOUT_ID,
              "ERROR LOADING TEMPLATE WORKOUT SCREEN DATA",
              error
            )
        );
      });
    } catch (error) {
      console.log("could not load data for workout screen");
    }
  };

  const saveNewData = async () => {
    try {
      // savePrevData();
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO Workouts (Name, WorkoutInfo, IsLocked, LastPerformed) VALUES (?,?,?,?);",
          [
            workoutName,
            JSON.stringify(states),
            isLocked,
            date.current.getMonth() + "-" + date.current.getDate(),
          ],
          // null,
          () => navigation.navigate("HomeScreen"),
          (tx, error) => console.log("COULD NOT SAVE NEW WORKOUT DATA", error)
        );
      });
    } catch (error) {
      console.log("ERROR SAVING WORKOUT SCREEN DATA", error);
    }
    // navigation.navigate("HomeScreen");
  };

  const updateData = async () => {
    try {
      // savePrevData();
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "UPDATE Workouts SET Name = ?, WorkoutInfo = ?, IsLocked = ?, LastPerformed = ? WHERE ID = ?",
          [
            workoutName,
            JSON.stringify(states),
            isLocked,
            date.current.getMonth() + "-" + date.current.getDate(),
            WORKOUT_ID.current,
          ],
          // null,
          () => navigation.navigate("HomeScreen"),
          (tx, error) => console.log("COULD NOT UPDATE WORKOUT", error)
        );
      });
    } catch (error) {
      console.log("ERROR UPDATING WORKOUT SCREEN DATA", error);
    }
    // navigation.navigate("HomeScreen");
  };

  const savePrevData = async () => {
    for (let i = 0; i < states.length; i++) {
      try {
        await db.transaction(
          async (tx) =>
            await tx.executeSql(
              "INSERT INTO Prevs (ID, Name, Weights, Reps, LastPerformed) VALUES (?,?,?,?,?);",
              [
                WORKOUT_ID.current,
                states[i].exercise,
                JSON.stringify(states[i].weights),
                JSON.stringify(states[i].reps),
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
    }
  };

  const printPrevData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * FROM Prevs",
          null,
          (tx, result) => {
            console.log("PREVS ----->", result.rows._array);
          },
          (tx, error) => console.log("ERROR PRINTING PREV DATA", error)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.LOW,
        vibrationPattern: [0, 0, 0, 0],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  async function schedulePushNotification() {
    scheduledNotication.current = await Notifications.scheduleNotificationAsync(
      {
        content: {
          title: "REPR",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },
        trigger: { seconds: 3, repeats: true },
      }
    );
  }

  // on mount
  useEffect(() => {
    // SplashScreen.preventAutoHideAsync();

    WORKOUT_ID.current = route.params.id;
    route.params.isTemplate ? loadTemplateData() : loadWorkoutData();

    // Managing app state (foregrounded/backgrounded) for expo notifications
    // const notificationSubscription = Notifications.addPushTokenListener(
    //   registerForPushNotificationsAsync
    // );
    // const notifcationBackgroundLister = Notifications.registerTaskAsync
    // const appStateSubscription = AppState.addEventListener(
    //   "change",
    //   (nextAppState) => {
    //     // Foreground
    //     if (
    //       appState.current.match(/inactive|background/) &&
    //       nextAppState === "active" /*|| nextAppState === "inactive"*/
    //     ) {
    //       console.log("App has come to the foreground!");
    //       Notifications.cancelAllScheduledNotificationsAsync();
    //     }
    //     // Background
    //     schedulePushNotification();

    //     appState.current = nextAppState;
    //     console.log("AppState", appState.current);
    //   }
    // );

    return () => {
      // appStateSubscription.remove();
      // notificationSubscription.remove();
      // Notifications.cancelAllScheduledNotificationsAsync(
      //   scheduledNotication.current
      // );
    };

    // async function prepare() {
    //   try {
    //     WORKOUT_ID.current = route.params.id;
    //     route.params.isTemplate
    //       ? await loadTemplateData()
    //       : await loadWorkoutData();
    //   } catch (e) {
    //     console.warn(e);
    //   } finally {
    //     setAppIsReady(true);
    //   }
    // }
    // prepare();
  }, []);

  // useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) return null;

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
      flex: 6,
    },
    screenTitleText: {
      fontFamily: "RobotoCondensedRegular",
      marginLeft: "7%",
      fontSize: 18,
      color: "white", //"#2494f0",
    },
    backContainer: {
      flex: 1.8,
    },
    lockContainer: {
      alignItems: "center",
      flex: 1.4,
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
    arrowSeparator: {
      alignItems: "center",
      justifyContent: "center",
    },
    addExerciseContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: "7%",
      marginHorizontal: "24%",
      backgroundColor: "#43a2f0",
      height: 35,
      borderRadius: 30,
    },
    addExerciseText: {
      fontFamily: "RobotoCondensedLight",
      fontSize: 18,
      color: "white",
    },
    cancel: {
      color: "red",
      fontFamily: "RobotoCondensedLight",
      fontSize: 20,
      textAlign: "center",
      paddingTop: isLocked ? "5%" : null,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.scrollContainer}
        data={states}
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
                  value={workoutName}
                  editable={!isLocked}
                ></TextInput>
              </View>

              <View style={styles.backContainer}>
                <BackComponent
                  navigation={navigation}
                  saveNewData={saveNewData}
                  updateData={updateData}
                  savePrevData={savePrevData}
                  workoutName={workoutName}
                  id={WORKOUT_ID.current}
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
            workoutInfo={item}
            numExercise={index}
            addSet={addSet}
            deleteSet={deleteSet}
            setRestTimer={setRestTimer}
            delExercise={deleteExercise}
            setExercise={setExercise}
            prevWeights={
              index < prevWeightReps.current.length
                ? prevWeightReps.current[index].weights
                : [""]
            }
            setWeights={setWeights}
            prevReps={
              index < prevWeightReps.current.length
                ? prevWeightReps.current[index].reps
                : [""]
            }
            setReps={setReps}
            isLocked={isLocked}
          />
        )}
        ItemSeparatorComponent={({ highlighted, leadingItem }) =>
          !isLocked && (
            <TouchableOpacity
              style={styles.arrowSeparator}
              onPress={() =>
                swapExercises(states.findIndex((item) => item === leadingItem))
              }
            >
              <Ionicons
                name="swap-vertical"
                color="#2494f0"
                size={24}
              ></Ionicons>
            </TouchableOpacity>
          )
        }
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancel}>CANCEL WORKOUT</Text>
            </TouchableOpacity>
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
