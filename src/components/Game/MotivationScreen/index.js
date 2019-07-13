import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from "react-native";

import Pointer from "../Pointer";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const img = require("../../../imgs/bkImg.png");

const StoreScreen = (props) => {

  const { backFromMotivationPage } = props;

  const startingColor = 0;
  const endingColor = 1;
  let colorAnimation = new Animated.Value(startingColor);

  const animateScoreBoard = () => {
    Animated.timing(
      colorAnimation,
      { toValue: endingColor, duration: 4000 }
    ).start(() => {
      Animated.timing(
        colorAnimation,
        { toValue: startingColor, duration: 4000 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '#270035', '#b57800' ]
  });

  const imgStyle = {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }

  const containerWidth = width * 0.9;

  const nameBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
    return {
      color,
      fontSize,
      opacity,
      fontWeight: "bold",
      fontFamily: "Raleway-Black",
      textAlign: "center"
    }
  }

  return (<TouchableOpacity onPress={backFromMotivationPage} style={{width, height, position: "absolute"}}>
    <Image
      style={imgStyle}
      source={img}
    />

    <View style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80,
      width
    }}>
      <Animated.Text style={nameBoxStlye(letterColor, width * 0.14)}>MOTIVATION</Animated.Text>
    </View>

    <View style={{width: containerWidth, left: width*0.05}}>
      <Text style={{color: "#fff", fontFamily: "Raleway-ExtraLight", fontSize: 26, textAlign: "center", opacity: 0.8, margin: 10}}>
        We live in a world where black women are marginalized, sexualized, and discarded. If anyone should try breaking these social norms, it should be the black community.
      </Text>
      <Text style={{color: "#fff", fontFamily: "Raleway-ExtraLight", fontSize: 26, textAlign: "center", opacity: 0.8, margin: 10}}>
        The motivation of this game is to rekindle our respect for black women, educate on African royalty, and celebrate black culture.
      </Text>
      <Text style={{color: "#fff", fontFamily: "Raleway-ExtraLight", fontSize: 26, textAlign: "center", opacity: 0.8, margin: 10}}>
        We need to embrace our culture and take pride in our presence.
      </Text>
    </View>
    <Pointer
      startingLeft={200}
      startingBottom={20}
      duration={800}
      distance={10}
    />
  </TouchableOpacity>)
}

export default StoreScreen;
