import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import WorkoutComponent from "../components/WorkoutComponent";

const Home = ({ navigation }) => {
  const [workoutList, setWorkoutList] = useState([""]);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.workoutContainer}>
        {workoutList.map((workout, i) => {
        return <WorkoutComponent key={i}/>;
      })}
      </View>
      
      <View style={styles.createWorkoutContainer} >
        <TouchableOpacity onPress={() => navigation.navigate("WorkoutScreen")}>
        <Text>Create Workout</Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workoutContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  createWorkoutContainer: {
    flex: 1,
    alignItems: "center",
  }
});

export default Home;
