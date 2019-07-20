import React from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet
} from "react-native";

import { config } from "../util/Settings";

const ScreenText = (props) => {

  const { text } = props;

  let top = new Animated.Value(500);
  let opacity = new Animated.Value(0);

  Animated.timing(
    opacity,
    { toValue: 1, duration: 400 }
  ).start(() => {
    setTimeout(() => {
      Animated.timing(
        opacity,
        { toValue: 0, duration: 500 }
      ).start()
    }, 250)
  });
  Animated.timing(
    top,
    { toValue: 200, duration: 400 }
  ).start(() => {
    setTimeout(() => {
      Animated.timing(
        top,
        { toValue: -100, duration: 500 }
      ).start()
    }, 500)
  });

  const gameOverStyle = (top, opacity) => {
    return {
      width: config.width,
      height: config.height,
      position: "absolute",
      height: 40,
      top,
      left: 0,
      opacity
    }
  }

  return (<Animated.View style={gameOverStyle(top, opacity)} removeClippedSubviews={true}>
    <View style={styles.textSectionStlye}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </Animated.View>)
}

export default ScreenText;

const styles = StyleSheet.create({
  textSectionStlye: {
    width: config.width,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#b57800",
    fontSize: 40,
    fontFamily: "Raleway-ExtraBoldItalic"
  }
});
