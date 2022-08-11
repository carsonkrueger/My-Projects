import React, { useEffect, useState, useRef } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import * as SQLite from "expo-sqlite";

import PrevComponent from "../components/PrevComponent";
import { Feather } from "@expo/vector-icons";

const db = SQLite.openDatabase("GymTracker");

const PrevScreen = ({ navigation, route }) => {
  const initialState = useRef({
    name: "",
    weights: [""],
    reps: [""],
    lastPerformed: "",
  });
  const [prevList, setPrevList] = useState([initialState.current]);
  const limit = useRef(10);
  const curOffset = useRef(0);

  const dateList = useRef([{ month: "", day: "" }]);
  const curMonth = useRef("null");
  const months = useRef([
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]);

  const getDates = (lastPerformed) => {
    const [monthInt, dayInt] = lastPerformed.split("-");

    if (curMonth.current !== months.current[monthInt - 1]) {
      curMonth.current = months.current[monthInt - 1];
      return { month: months.current[monthInt - 1], day: dayInt };
    }

    return { month: "", day: dayInt };
  };

  const loadData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          // (ID, Name, Weights, Reps, LastPerformed)
          "SELECT * FROM Prevs WHERE Name = ? ORDER BY LastPerformed DESC LIMIT ? OFFSET ?",
          [route.params.originalExercise, limit.current, curOffset.current],
          (tx, result) => {
            curOffset.current += 10;
            let tempPrevList = [];
            let tempDateList = [];
            for (let i = 0; i < result.rows.length; i++) {
              tempPrevList.push({
                // name: result.rows.item(i).Name,
                weights: JSON.parse(result.rows.item(i).Weights),
                reps: JSON.parse(result.rows.item(i).Reps),
                // lastPerformed: result.rows.item(i).LastPerformed,
              });

              tempDateList.push(getDates(result.rows.item(i).LastPerformed));
            }

            if (prevList.length === 1) {
              // replaces state directly
              dateList.current = tempDateList;
              setPrevList(tempPrevList);
            } else {
              // adds to current state
              dateList.current = dateList.current.concat(tempDateList);
              let temp = [...prevList].concat(tempPrevList);
              setPrevList(temp);
            }
          },
          (tx, error) => console.log("Could not load prev data", error)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
      paddingBottom: "30%",
    },
    titleContainer: {
      marginTop: "4%",
      marginHorizontal: "5%",
      padding: "2.5%",
      backgroundColor: "#2494f0",
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
    },
    backArrow: {
      flex: 0.08,
    },
    titleText: {
      flex: 0.92,
      textAlign: "center",
      color: "white",
      fontSize: 18,
      fontFamily: "RobotoCondensedRegular",
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={prevList}
        onEndReached={loadData}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" color={"white"} size={26} />
            </TouchableOpacity>

            <Text style={styles.titleText}>
              {route.params.exercise} HISTORY
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <PrevComponent
            key={index}
            info={item}
            date={dateList.current[index]}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default PrevScreen;
