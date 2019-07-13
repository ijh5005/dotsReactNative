import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { images } from "./util/Images";
import { styles } from "./util/Styles";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Game = (props) => {

  const { navigate } = props.navigation;

  const clearAllStorage = async () => {
    await AsyncStorage.clear()
  }

  // clearAllStorage();

  const startGame = () => {
    navigate("Game");
  }

  const motivationPage = () => {
    navigate("Motivation");
  }

  const storePage = () => {
    navigate("Store")
  }

  const startingColor = 0;
  const endingColor = 1;
  let colorAnimation = new Animated.Value(startingColor);

  const animateScoreBoard = () => {
    Animated.timing(
      colorAnimation,
      { toValue: endingColor, duration: 1000 }
    ).start(() => {
      Animated.timing(
        colorAnimation,
        { toValue: startingColor, duration: 1000 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 'transparent', '#b57800' ]
  });

  return (<View style={styles.boardStyle(height, width)}>
    <Image
      style={styles.imgStyle(height, width)}
      source={images.background}
    />

    <HomeScreen
    startGame={startGame}
    motivationPage={motivationPage}
    storePage={storePage}/>

  </View>)

}

export default Game;
