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
const titleImg = require("../../../imgs/asset_rhino.png");

const textSectionStlye = (width) => {
  return {
    backgroundColor: "#270038",
    width,
    height: "100%",
    position: "absolute",
    top: "0%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#b57800",
    borderTopStlye: "dotted"
  }
}

const textBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color,
    fontSize,
    opacity,
    fontWeight: "bold",
    fontFamily: "Raleway-Black",
    letterSpacing: 6,
    lineHeight: 80
  }
}

const nameBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color,
    fontSize,
    opacity,
    fontWeight: "bold",
    fontFamily: "Raleway-Black",
    letterSpacing: 6
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

    <View style={{
      position: "absolute",
      top: "23%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width
    }}>
      <Text style={nameBoxStlye("#b57800", 100)}>D</Text>
      <Image
        style={{height: 60, width: 60, position: "relative", top: 12}}
        source={titleImg}
      />
      <Text style={nameBoxStlye("#b57800", 100)}>T</Text>
      <Text style={nameBoxStlye("#b57800", 100)}>S</Text>
    </View>

  </View>)
}

export default HomeScreen;
