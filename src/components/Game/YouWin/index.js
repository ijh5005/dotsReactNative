import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet
} from "react-native";

import { config } from "../util/Settings";

const GameOver = (props) => {

  const {restartGame, nextLevel, isLastBoard} = props;

  let top = new Animated.Value(200);

  let opacity = new Animated.Value(0);

  Animated.timing(
    opacity,
    { toValue: 1, duration: 500 }
  ).start();
  Animated.timing(
    top,
    { toValue: 0, duration: 500 }
  ).start();

  const youWinStyle = (top, opacity) => {
    return {
      width: config.width,
      height: config.height,
      position: "absolute",
      top ,
      left: 0,
      backgroundColor: "rgba(39, 0, 56, 0.6)",
      opacity
    }
  }

  return (<Animated.View style={youWinStyle(top, opacity)}>
    <View style={styles.textSectionStlye}>
      <Text style={styles.youWin}>YOU WIN!</Text>
      <TouchableOpacity onPress={restartGame}>
        <Text style={styles.retry}>RETRY</Text>
      </TouchableOpacity>
      { !isLastBoard &&
        <TouchableOpacity onPress={nextLevel}>
          <Text style={styles.nextLevel}>NEXT LEVEL</Text>
        </TouchableOpacity>
      }
    </View>
  </Animated.View>)
}

export default GameOver;

const styles = StyleSheet.create({
  textSectionStlye: {
    backgroundColor: "#270038",
    width: config.width,
    height: 220,
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  youWin: {
    color: "#2e8b57",
    fontSize: 20,
    opacity: 1
  },
  retry: {
    color: "#fff",
    fontSize: 40,
    opacity: 0.6
  },
  nextLevel: {
    color: "#fff",
    fontSize: 40,
    opacity: 0.6
  }
});
