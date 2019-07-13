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

  const {startingLeft, startingBottom, duration, distance} = props;

  const stoppingLeft = startingLeft + distance;
  const stoppingBottom = startingBottom + distance;
  let left = new Animated.Value(startingLeft);
  let bottom = new Animated.Value(startingBottom);

  const moveImage = (value, starting, stopping) => {
    Animated.timing(
      value,
      { toValue: starting, duration }
    ).start(() => {
      Animated.timing(
        value,
        { toValue: stopping, duration }
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
