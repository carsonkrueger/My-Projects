import React, { useRef, useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// import Animated, { useSharedValue } from "react-native-reanimated";

import { useFonts } from "expo-font";

const TemplateComponent = ({ navigation, id, name, exercises }) => {
  const [fontLoaded] = useFonts({
    RobotoCondensedRegular: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
  });
  if (!fontLoaded) return null;

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      marginVertical: "2%",
      marginHorizontal: "5%",
    },
    topContainer: {
      flex: 1,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#c9c9c9",
      borderRadius: 10,
      padding: "4%",
    },
    topButton: {
      flex: 1,
      flexDirection: "row",
    },
    left: {
      flex: 1,
      paddingLeft: 10,
      justifyContent: "center",
    },
    right: {
      flex: 2,
      paddingRight: 10,
    },
    title: {
      fontSize: 15,
      fontFamily: "RobotoCondensedRegular",
    },
    preview: {
      color: "#9c9c9c",
      fontSize: 11,
      textAlign: "right",
      fontFamily: "RobotoCondensedRegular",
    },
    dots: {
      color: "#9c9c9c",
      fontSize: 13,
      textAlign: "right",
      fontFamily: "RobotoCondensedRegular",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            // loadWorkoutData(name);
            navigation.navigate("WorkoutScreen", {
              id: id,
              isTemplate: true,
            });
          }}
          delayLongPress={500}
        >
          <View style={styles.left}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.right}>
            {exercises.map((name, i) =>
              i < 4 ? (
                <Text key={i} style={styles.preview}>
                  {name}
                </Text>
              ) : i < 5 ? (
                <Text key={i} style={styles.dots}>
                  ...
                </Text>
              ) : null
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TemplateComponent;
