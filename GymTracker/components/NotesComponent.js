import React, { useEffect, useState, useRef } from "react";

import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const NotesComponent = ({
  doNotes,
  flipDoNotes,
  notes,
  setNotes,
  numExercise,
}) => {
  const [componentWidth, setComponentWidth] = useState(
    Dimensions.get("window").width
  );
  const translation = useRef(new Animated.Value(componentWidth)).current;

  const startAnim = () => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const endAnim = () => {
    flipDoNotes();
    Animated.timing(translation, {
      toValue: componentWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    doNotes && startAnim();
  }, [doNotes]);

  const styles = StyleSheet.create({
    container: {
      opacity: componentWidth === 0 ? 0 : 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      translateX: componentWidth,
      transform: [{ translateX: translation }],
      borderRadius: 14,
      backgroundColor: "white",
      position: "absolute",
      zIndex: 10,
    },
    title: {
      backgroundColor: "#2494f0",
      borderTopRightRadius: 14,
      borderTopLeftRadius: 14,
      paddingVertical: "2%",
      paddingHorizontal: "5%",
      flexDirection: "row",
      alignItems: "center",
    },
    titleText: {
      flex: 1,
      color: "white",
      fontFamily: "RobotoCondensedRegular",
      fontSize: 15,
    },
    backButton: {
      flex: 1,
      justifyContent: "flex-end",
      transform: [{ rotateY: "180deg" }],
    },
    notes: {
      fontFamily: "RobotoCondensedLight",
      padding: 6,
      scrollEnabled: false,
    },
  });
  return (
    <Animated.View
      style={styles.container}
      onLayout={(event) => {
        setComponentWidth(
          event.nativeEvent.layout.width + event.nativeEvent.layout.width * 0.05
        );
        // translation = new Animated.Value(event.nativeEvent.layout.width);
      }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>NOTES</Text>
        <TouchableOpacity onPress={endAnim}>
          <MaterialIcons
            style={styles.backButton}
            name="arrow-back-ios"
            size={18}
            color={"white"}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.notes}
        placeholder="ENTER TEXT HERE"
        multiline={true}
        scrollEnabled={false}
        value={notes}
        onChangeText={(newText) => setNotes(newText, numExercise)}
      />
    </Animated.View>
  );
};

export default NotesComponent;
