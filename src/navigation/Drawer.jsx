import { createDrawerNavigator } from "@react-navigation/drawer";

import FilmScreen from "../screens/FilmScreen";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Film" component={FilmScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
