import React from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet
} from "react-native";

import { config } from "../util/Settings";
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
      fontSize: config.width * 0.14,
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
    width: config.width,
    height: config.height
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width: config.width
  },
  textSection: {
    width: config.width * 0.9,
    left: config.width * 0.05
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
    width: config.width,
    height: config.height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }
});
