import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const SearchComponent = ({ searchList, setExercise, numExercise, yOffset }) => {
  console.log(searchList);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      position: "absolute",
      zIndex: 9,
      borderRadius: 4,
      marginTop: yOffset + 15,
      marginLeft: 12,
      paddingHorizontal: 4,
    },
    searchItemContainer: {
      paddingVertical: 3,
    },
    searchItemText: {
      fontFamily: "RobotoCondensedRegular",
      fontSize: 15,
      color: "#2494f0",
    },
  });
  if (searchList.length <= 0) return null;
  else
    return (
      <View style={styles.container}>
        {searchList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.searchItemContainer}
            onPress={() => setExercise(item, numExercise)}
          >
            <Text style={styles.searchItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
};

export default SearchComponent;
