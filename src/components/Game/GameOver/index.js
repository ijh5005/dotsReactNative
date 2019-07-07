import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const textSectionStlye = (width) => {
  return {
    backgroundColor: "#270038",
    width,
    height: 120,
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    alignItems: "center"
  }
}

const textBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color,
    fontSize,
    opacity
  }
}

const GameOver = (props) => {

  const {restartGame} = props;

  let top = new Animated.Value(200);

  let opacity = new Animated.Value(0);

  Animated.timing(
    opacity,
    { toValue: 1, duration: 500 }
  ).start();
  Animated.timing(
    top,
    { toValue: 0, duration: 500 }
  ).start();

  return (<Animated.View style={{width, height, position: "absolute", top , left: 0, backgroundColor: "rgba(39, 0, 56, 0.6)", opacity}}>
    <View style={textSectionStlye(width)}>
      <Text style={textBoxStlye("#980000", 20, 1)}>GAME OVER</Text>
      <TouchableOpacity onPress={restartGame}>
        <Text style={textBoxStlye("#fff", 40, 0.6)}>RETRY</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>)
}

export default GameOver;
