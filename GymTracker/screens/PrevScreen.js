import React, { useEffect, useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

import PrevComponent from "../components/PrevComponent";

const db = SQLite.openDatabase("GymTracker");

const PrevScreen = ({ route }) => {
  const [prevList, setPrevList] = useState([]);
  // console.log(prevList);

  const loadData = () => {
    try {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * FROM Prevs WHERE Name = ? ORDER BY LastPerformed DESC",
          [route.params.exerciseName],
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
    <View>
      <FlatList
        data={prevList}
        renderItem={({ item, index }) => (
          <PrevComponent index={index} name={item[index].Name} />
        )}
      />
    </View>
  );
};

export default PrevScreen;
