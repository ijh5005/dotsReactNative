import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StyleSheet
} from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import { images } from "../util/Images";

const StoreScreen = (props) => {
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

  const nameBoxStlye = (color) => {
    return {
      color,
      fontSize: width * 0.14,
      opacity: 1,
      fontWeight: "bold",
      fontFamily: "Raleway-Black",
      textAlign: "center"
    }
  }

  return (<View style={styles.motivationPage}>
    <Image style={styles.imgStyle} source={images.background} />

    <View style={styles.title}>
      <Animated.Text style={nameBoxStlye(letterColor)}>STORE COMING SOON</Animated.Text>
    </View>

    <View style={styles.textSection}>
      <Text style={styles.text}>Thanks for playing</Text>
    </View>

  </View>)
}

export default StoreScreen;


const styles = StyleSheet.create({
  motivationPage: {
    width,
    height
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width
  },
  textSection: {
    width: width * 0.9,
    left: width * 0.05
  },
  text: {
    color: "#fff",
    fontFamily: "Raleway-ExtraLight",
    fontSize: 26,
    textAlign: "center",
    opacity: 0.8,
    margin: 10
  },
  imgStyle: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }
});
