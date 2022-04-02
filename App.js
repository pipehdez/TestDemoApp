import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import {MainNavigation, HomeNavigation} from "./src/navigation/Stack";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Context as AuthContext } from "./src/context/AuthContext";

const App = ({ navigation }) => {
  const { state } = React.useContext(AuthContext);
  console.log("App state", state);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {console.log(state.user)}
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          console.log("Loading...")
        ) : state.token == null ? (
          // No token found, user isn't signed in
          <MainNavigation />
        ) : (
          // User is signed in
          <HomeNavigation />
        )}
        {/*  */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
