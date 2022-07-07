import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Workout from "../screens/Workout";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // These styles hide the navigation bar at the top of the screen
          headerStyled: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTitle: "",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workout" component={Workout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
