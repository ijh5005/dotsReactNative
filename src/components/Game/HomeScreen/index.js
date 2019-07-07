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
const img = require("../../../imgs/bkImg.png");

const textSectionStlye = (width) => {
  return {
    backgroundColor: "#270038",
    width,
    height: "100%",
    position: "absolute",
    top: "0%",
    justifyContent: "center",
    alignItems: "center"
  }
}

const textBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color,
    fontSize,
    opacity,
    fontWeight: "bold",
    fontFamily: "Raleway-Black"
  }
}

const imgStyle = {
  width,
  height,
  position: "absolute",
  top: 0,
  left: 0,
  paddingTop: 40
}

const HomeScreen = (props) => {
  const {startGame, motivationPage} = props;

  return (<View style={{width, height, position: "absolute"}}>
    <Image
      style={imgStyle}
      source={img}
    />
    <View style={{width, height: (height * 0.7), position: "absolute", left: 0, bottom: 0, backgroundColor: "rgba(39, 0, 56, 0.6)"}}>
      <View style={textSectionStlye(width)}>
        <TouchableOpacity onPress={startGame}>
          <Text style={textBoxStlye("#b57800", 50)}>play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={motivationPage}>
          <Text style={textBoxStlye("#b57800", 50)}>motivation</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>)
}

export default HomeScreen;
