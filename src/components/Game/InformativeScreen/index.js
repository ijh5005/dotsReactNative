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
const foot = require("../../../imgs/foot.png");
const makeda = require("../../../imgs/asset_queen_makeda.png");

const information = {
  foot: {
    text: '"The oppressed are allowed once every few years to decide which particular representatives of the oppressing class are to represent and repress them."',
    author: "Karl Marx",
    image: foot,
    height: 320,
    width: 250
  },
  makeda: {
    text: "Makeda is the mysterious and majestic Queen of Sheba, and the beloved of King Solomon of Judea.",
    author: "",
    image: makeda,
    height: 250,
    width: 350
  }
}

const InformativeScreen = (props) => {

  const { facts, close } = props;

  return (<TouchableOpacity style={{position: "absolute"}} onPress={close}>
    <View style={{width, height, backgroundColor: "rgb(39, 0, 53)"}}>

      <View style={{width: "100%", height: "50%", position: "relative", top: "10%", justifyContent: "center", alignItems: "center"}}>
        <Image
          style={{height: information[facts].height, width: information[facts].width}}
          source={information[facts].image}
        />
      </View>

      <View style={{width: "90%", height: "50%", justifyContent: "center", alignItems: "center", left: "5%"}}>
        <Text style={{color: "#b57800", fontFamily: "Raleway-LightItalic", fontSize: 30, textAlign: "center"}}>
          {information[facts].text}
        </Text>
        <Text style={{color: "#fff", fontFamily: "Raleway-ExtraLight", fontSize: 40, textAlign: "center", opacity: 0.8}}>
          {information[facts].author}
        </Text>
      </View>

    </View>
  </TouchableOpacity>)
}

export default InformativeScreen;
