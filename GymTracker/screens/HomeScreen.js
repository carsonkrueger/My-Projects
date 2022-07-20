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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  // [ [ NAME OF WORKOUT, NUM EXERCISES, LAST TIME DID WORKOUT ], ... ]
  // const [workoutList, setWorkoutList] = useState([["", 0, ""]]);
  const [workoutList, setWorkoutList] = useState([]);
  const isFocused = useIsFocused();

  const windowWidth = useRef(Dimensions.get("window").width);
  const windowHeight = useRef(Dimensions.get("window").height);

  useEffect(() => {
    // AsyncStorage.clear();
    isFocused && loadHomescreenData();
  }, [isFocused, workoutList]);

  const loadHomescreenData = async () => {
    try {
      const workoutNames = await AsyncStorage.getAllKeys();

      if (workoutNames !== null) {
        setWorkoutList(workoutNames);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error retrieving homescreen data");
      throw error;
    }
    // console.log("NO DATA TO LOAD");
  };

  const loadWorkoutSpecifics = async () => {
    try {
      await AsyncStorage.clear();
      let name = workoutList[0].toString();
      console.log("Specifics name:", name.toString());

      const unparsedWorkoutData = await AsyncStorage.getItem(name);
      const parsedData = JSON.parse(unparsedWorkoutData);
      await AsyncStorage.clear();
      console.log("\n--------------------\n", name, "\n", parsedData);
    } catch (error) {
      console.log("couldnt map through workout names");
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
      paddingLeft: "5%",
      backgroundColor: "#2494f0", //"white",
      paddingBottom: 10,
    },
    screenHeaderText: {
      fontSize: 20,
      color: "white", //"#2494f0",
    },
    scrollContainer: {
      flex: 2,
      paddingBottom: "10%",
    },
    workoutListContainer: {
      flex: 3,
      paddingTop: "2%",
      paddingBottom: "25%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    subHeaderText: {
      paddingTop: "3%",
      paddingLeft: "5%",
      fontSize: 15,
      color: "#cfcfcf",
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
          <Text style={styles.screenHeaderText}>WORKOUTS</Text>
        </View>

        <View>
          <Text>My Templates</Text>
        </View>

        <View style={styles.workoutListContainer}>
          {workoutList.map((workout, i) => {
            return (
              <WorkoutComponent
                key={workout}
                navigation={navigation}
                name={workout}
              />
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.createWorkoutButton}
        onPress={() =>
          navigation.navigate("WorkoutScreen", {
            name: "",
          })
        }
      >
        <Text style={styles.createWorkoutText}>CREATE WORKOUT</Text>
        {/* <Feather name="plus" color="white" size={25} /> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
