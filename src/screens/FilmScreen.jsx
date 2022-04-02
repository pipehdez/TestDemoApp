import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Platform, Animated, Pressable } from "react-native";
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
import { getViews, storeViews } from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";

import { Context as AuthContext } from "../context/AuthContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FilmScreen = ({ navigation, route }) => {
  const { film } = route.params;

  const {state} = useContext(AuthContext);
  const {
    user,
   } = state;

  const isFocused = useIsFocused();
  
  const [characters, setCharacters] = useState({});
  const [planets, setPlanets] = useState({});
  const [myViews, setMyViews] = useState(0);

  const exit = require("../../assets/darth-mauls-lightsabers.png");

  useEffect(async () => {
    // count views
    const name = user.name + "_" + film.title
    const views = await getViews(name);
    let count = parseInt(views) + 1;
    await storeViews(JSON.stringify(count), name);
    const view2 = await getViews(name);
    setMyViews(view2);
  }, [isFocused]);

  useEffect(() => {
    film.characters.map((film) => {
      listCharacters(film);
    });
  }, []);

  useEffect(() => {
    getPlanet();
  }, []);

  const getPlanet = () => {
    getData(user.homeworld)
      .then((data) => {
        setPlanets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listCharacters = (url) => {
    getData(url)
      .then((data) => {
        setCharacters((characters) => ({ ...characters, [data.name]: data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <Box style={styles.container}>
        <AnimatedPressable
          onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
        >
          <Image source={exit} alt="exit" />
        </AnimatedPressable>
        <Text style={styles.text}>{film.title}</Text>
        <Text style={styles.text}> {film.director} </Text>
        <Text style={styles.text}> {film.producer} </Text>
        <Text style={styles.text}> {film.opening_crawl} </Text>

        {Object.keys(characters).map((key) => {
          return (
            <Box key={key}>
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
                      Name: {characters[key].name}
                    </Text>
                    <Text color="yellow" style={styles.text}>
                      Hair Color: {characters[key].hair_color}
                    </Text>
                    <Text color="yellow" style={styles.text}>
                      Height: {characters[key].height}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </Box>
          );
        })}
        <Text style={styles.text}> Homeworld: {planets.name} </Text>
        <Text style={styles.text}> Views: {myViews} </Text>
      </Box>
    </ScrollView>
  );
};

export default FilmScreen;

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
});
