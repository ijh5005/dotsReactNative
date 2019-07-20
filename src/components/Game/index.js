import React from "react";
import { View, Image, StyleSheet } from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from "./HomeScreen";
import { images } from "./util/Images";
import { config } from "./util/Settings";

const Game = (props) => {
  const { navigate, navigation } = props.navigation;
  // const clearAllStorage = async () => await AsyncStorage.clear();
  const startGame = () => navigate("Game");
  const motivationPage = () => navigate("Motivation");
  const storePage = () => navigate("Store");

  return (<View style={styles.boardStyle}>
    <Image style={styles.imgStyle} source={images.background} />

    <HomeScreen
      navigation={props.navigation}
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
    height: config.height,
    width: config.width
  },
  imgStyle: {
    width: config.width,
    height: config.height,
    position: "absolute",
    top: 0,
    left: 0
  }
});
