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

const StoreScreen = (props) => {
  const imgStyle = {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }

  return (<View style={{width, height, position: "absolute"}}>
    <Image
      style={imgStyle}
      source={img}
    />
    <Text style={{marginTop: 80}}>Motivation</Text>
  </View>)
}

export default StoreScreen;
