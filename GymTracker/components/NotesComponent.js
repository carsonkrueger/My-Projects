import React, { useEffect, useState, useRef } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

import * as SQLite from "expo-sqlite";

const NotesComponent = () => {
  const [componentWidth, setComponentWidth] = useState(0);
  const translation = useRef(new Animated.Value(0)).current;
  const [isTranslated, setIsTranslated] = useState(false);

  const handleAnim = () => {
    if (!isTranslated) {
      setIsTranslated(true);
      Animated.timing(translation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setIsTranslated(false);
      Animated.timing(translation, {
        toValue: componentWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    handleAnim();
  }, [componentWidth]);

  const styles = StyleSheet.create({
    container: {
      opacity: componentWidth === 0 ? 0 : 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // translateX: componentWidth,
      transform: [{ translateX: translation }],
      borderRadius: 15,
      backgroundColor: "black",
      position: "absolute",
      zIndex: 10,
    },
  });
  return (
    <Animated.View
      style={styles.container}
      onLayout={(event) => {
        setComponentWidth(event.nativeEvent.layout.width);
        translation = new Animated.Value(event.nativeEvent.layout.width);
      }}
    ></Animated.View>
  );
};

export default NotesComponent;
