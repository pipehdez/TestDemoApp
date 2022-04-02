import { useState , useContext, useReducer} from "react";
import { ImageBackground, StyleSheet, Platform } from "react-native";
import { Box, Text, Image, Center, Button, useToast } from "native-base";
import Form from "../components/Form";
import { getUser } from "../api";
import { setPassword, getPassword } from "../utils/crypto";

import { Context as AuthContext } from "../context/AuthContext";

const background = require("../../assets/star-wars-galaxy.gif");
const logo = require("../../assets/Star_Wars_logo.webp");

const initialState = {
  username: "",
  password: "",
};

const LogInScreen = ({ navigation }) => {

  const {state, signin} = useContext(AuthContext);

  const toast = useToast();
  const [user, setUser] = useState(null);

  const handleSubmit = (values) => {
    console.log(values);
    getUser(values.username)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // valiar que no venga vacio el objeto array
    if(user === undefined || user === null) {
      toast.show({ title: "Usuario no encontrado", placement: "bottom", type: "danger" })
    } else if (user?.results?.length === 0) {
      toast.show({
        title: "Usuario no existe",
        placement: "bottom",
        type: "danger",
      });
    } else {
      console.log(user?.results[0]);
      let has1 = setPassword(values.password);
      let has2 = setPassword(user?.results[0].hair_color);

      let hashedPassword1 = getPassword(has1);
      let hashedPassword2 = getPassword(has2);

      console.log(hashedPassword1, hashedPassword2);
      if (hashedPassword1 === hashedPassword2) {
        toast.show({
          title: "Bienvenido",
          placement: "bottom",
          type: "success",
        });
        signin(user.results[0])
        //navigation.navigate("Home", {user: user?.results[0]});
      } else {
        toast.show({
          title: "Usuario y/o contraseña incorrectos",
          placement: "bottom",
          type: "danger",
        });
      }
    }
  };

  return (
    <ImageBackground
      source={background}
      style={styles.image}
      resizeMode="cover"
    >
      <Box>
        <Center>
          <Image
            source={logo}
            alt="Logo"
            size="2xl"
            resizeMode="contain"
            style={styles.content}
          />
          <Text color="white" fontSize="2xl" style={styles.text}>
            Demo App
          </Text>
        </Center>
      </Box>
      <Box>
        <Form
          initialState={initialState}
          onPress={(values) => handleSubmit(values)}
        />
      </Box>
    </ImageBackground>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  content: {
    marginTop: Platform.OS === "android" ? 10 : 30,
  },
  image: {
    flex: 1,
  },
  text: {
    color: "yellow",
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "bold",
  }
});
