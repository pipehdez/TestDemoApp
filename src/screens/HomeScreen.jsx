import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  ScrollView,
  Image,
} from "native-base";
import { getData } from "../api";
import moment from "moment";
import { Context as AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation, route }) => {
  const [films, setFilms] = useState({});

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const menu = require("../../assets/Trade_Federation_Battleship.png");

  //const { user } = route.params;
  // get state from context, and get user from state
  //const { user } = useContext(AuthContext);
  const { state } = useContext(AuthContext);
  const { user } = state;
  console.log(user);

  useEffect(() => {
    user.films.map((film) => {
      listFilms(film);
    });
  }, []);

  const listFilms = (url) => {
    getData(url)
      .then((data) => {
        setFilms((films) => ({ ...films, [data.title]: data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Consumer>
      {({signout}) => (
        <ScrollView>
          <Box style={styles.container}>
            <AnimatedPressable
              onPress={() => {
                signout();
              }}
            >
            <Image source={menu} alt="menu" style={styles.image} />
            </AnimatedPressable>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.text}>
              {" "}
              {moment(user.created).format("MMMM Do YYYY, h:mm:ss a")}{" "}
            </Text>

            {Object.keys(films).map((key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() =>
                    navigation.navigate("Film", {
                      film: films[key],
                    })
                  }
                >
                  <Box>
                    <Box
                      borderBottomWidth="1"
                      _dark={{ borderColor: "gray.600" }}
                      backgroundColor="black"
                      borderColor="blue.200"
                      pl="4"
                      pr="5"
                      py="2"
                    >
                      <HStack space={3} justifyContent="space-between">
                        <VStack>
                          <Text color="yellow" style={styles.text}>
                            Title: {films[key].title}
                          </Text>
                          <Text color="yellow" style={styles.text}>
                            Director: {films[key].director}
                          </Text>
                          <Text color="yellow" style={styles.text}>
                            Opening: {films[key].opening_crawl}
                          </Text>
                        </VStack>
                        <Spacer />
                      </HStack>
                    </Box>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
      )}
    </AuthContext.Consumer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 40 : 50,
  },
  text: {
    color: "yellow",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    marginRight: "auto",
    marginLeft: 30,
    marginTop: 30,
  },
});
