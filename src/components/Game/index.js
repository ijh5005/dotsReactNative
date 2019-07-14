import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from "./HomeScreen";

import { images } from "./util/Images";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Game = (props) => {
  const { navigate } = props.navigation;
  const clearAllStorage = async () => await AsyncStorage.clear();
  const startGame = () => navigate("Game");
  const motivationPage = () => navigate("Motivation");
  const storePage = () => navigate("Store");

  return (<View style={styles.boardStyle}>
    <Image style={styles.imgStyle} source={images.background} />

    <HomeScreen
      startGame={startGame}
      motivationPage={motivationPage}
      storePage={storePage}/>
  </View>)
}

export default Game;

const styles = StyleSheet.create({
  boardStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height,
    width
  },
  imgStyle: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0
  }
});
