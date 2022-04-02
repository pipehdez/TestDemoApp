import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogInScreen from "../screens/LogInScreen";
import FilmScreen from "../screens/FilmScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LogInScreen} />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Film" component={FilmScreen} />
    </Stack.Navigator>
  );
};

export { MainNavigation, HomeNavigation };
