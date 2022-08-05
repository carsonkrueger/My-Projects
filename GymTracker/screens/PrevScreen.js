import React, { useEffect, useState, useRef } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

import PrevComponent from "../components/PrevComponent";

const db = SQLite.openDatabase("GymTracker");

const PrevScreen = ({ route }) => {
  const initialState = useRef({
    name: "",
    weights: [""],
    reps: [""],
    lastPerformed: "",
  });
  const [prevList, setPrevList] = useState([initialState.current]);

  const loadData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          // (ID, Name, Weights, Reps, LastPerformed)
          "SELECT * FROM Prevs WHERE Name = ? ORDER BY LastPerformed DESC",
          [route.params.exercise],
          (tx, result) => {
            console.log("----", result.rows._array);
            setPrevList(result.rows._array);
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
      backgroundColor: "#FFF",
    },
  });

  return (
    <View style={styles.container}>
      {/* {console.log("---->", prevList)} */}
      <View>
        <Text>{route.params.exercise}</Text>
      </View>
      <FlatList
        data={prevList}
        renderItem={({ item, index }) => (
          <PrevComponent info={item} index={index} />
        )}
      />
    </View>
  );
};

export default PrevScreen;
