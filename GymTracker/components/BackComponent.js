import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

const BackComponent = ({
  navigation,
  storeWorkoutData,
  workoutName,
  originalWorkoutName,
}) => {
  const names = useRef([]);

  const getWorkoutNames = async () => {
    try {
      names = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log("could not get workout names for back component:", error);
    }
  };

  const isWorkoutUnique = () => {
    if (workoutName === "") return false;
    getWorkoutNames();
    return workoutName === originalWorkoutName || !names.includes(workoutName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // checkUniqueWorkoutName();
          if (isWorkoutUnique()) {
            console.log("workout is unique", isWorkoutUnique());
            storeWorkoutData();
            // navigation.goBack();
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("Please change your workout name");
          }
        }}
      >
        <Text style={styles.text}>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 5,
  },
  text: {
    color: "#2494f0",
    fontSize: 17,
  },
});

export default BackComponent;
