import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useFonts, Bebas_Neue } from "@expo-google-fonts/inter";
import { AntDesign, Feather } from "@expo/vector-icons";

import SetComponent from "./SetComponent";

const ExerciseComponent = (props) => {
  const [setsArr, setSetsArr] = useState([["", 1]]);

  let [fontsLoad] = useFonts({
    Bebas_Neue,
  });

  const AddSet = () => {
    setSetsArr([...setsArr, ["", setsArr.length + 1]]);
  };

  const DeleteSet = () => {
    var tempArr = [...setsArr];
    tempArr.pop();
    setSetsArr(tempArr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleText}
          placeholder="Enter Exercise Here"
          defaultValue={props.name}
          placeholderTextColor="#2494f0"
        ></TextInput>

        <View style={styles.trashContainer}>
          <TouchableOpacity>
            <Feather name="trash-2" color="#de3e3e" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headers}>
        <View style={styles.setHead}>
          <Text style={styles.whiteText}>SET</Text>
        </View>
        <View style={styles.prevHead}>
          <Text style={styles.whiteText}>PREV</Text>
        </View>
        <View style={styles.weightHead}>
          <Text style={styles.whiteText}>WEIGHT</Text>
        </View>
        <View style={styles.repHead}>
          <Text style={styles.whiteText}>REPS</Text>
        </View>
        <View style={styles.emptyHead}>{/* Empty header */}</View>
      </View>

      {setsArr.map((set, i) => {
        return <SetComponent key={i} num={set[1]} />;
      })}

      <View style={styles.addSetContainer}>
        <TouchableOpacity onPress={DeleteSet}>
          <Feather name="minus" color="#2494f0" size={22} />
        </TouchableOpacity>

        <TouchableOpacity onPress={AddSet}>
          <Feather name="plus" color="#2494f0" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleText: {
    flex: 22,
    fontSize: 22,
    fontFamily: "Bebas Neue",
    color: "#2494f0",
    paddingLeft: 14,
  },
  trashContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },
  headers: {
    flexDirection: "row",
    color: "white",
    padding: 3,
    width: "100%",
  },
  setHead: {
    flex: 0.6,
    alignItems: "center",
  },
  prevHead: {
    flex: 1,
    alignItems: "center",
  },
  weightHead: {
    flex: 1,
    alignItems: "center",
  },
  repHead: {
    flex: 1,
    alignItems: "center",
  },
  emptyHead: {
    flex: 0.7,
  },
  whiteText: {
    color: "white",
  },
  addSetContainer: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  addSet: {
    color: "#2494f0",
    fontSize: 14,
  },
});

export default ExerciseComponent;
