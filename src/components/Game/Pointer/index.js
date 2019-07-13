import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from "react-native";

const pointer = require("../../../imgs/pointer.png");

const Pointer = (props) => {

  const {bottomPosition, leftPosition} = props;

  const startingLeft = 100;
  const stoppingLeft = leftPosition + 20;
  const startingBottom = 100;
  const stoppingBottom = bottomPosition + 20;
  let left = new Animated.Value(startingLeft);
  let bottom = new Animated.Value(startingLeft);

  const moveImage = (value, starting, stopping) => {
    Animated.timing(
      value,
      { toValue: starting, duration: 500 }
    ).start(() => {
      Animated.timing(
        value,
        { toValue: stopping, duration: 500 }
      ).start(() => {
        moveImage(value, starting, stopping);
      });
    });
  }

  useEffect(() => {
    moveImage(left, startingLeft, stoppingLeft);
    moveImage(bottom, startingBottom, stoppingBottom);
  }, [])

  return (<Animated.View style={{position: "absolute", bottom, left, height: 60, width: 60, justifyContent: "center", alignItems: "center"}}>
    <Image
      style={{flex: 1, transform: [{ rotate: '-45deg'}]}}
      source={pointer}
      resizeMode="contain"
    />
  </Animated.View>)
}

export default Pointer;
