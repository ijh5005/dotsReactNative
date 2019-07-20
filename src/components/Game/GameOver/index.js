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

  const {restartGame} = props;

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

  const gameOverStyle = (top, opacity) => {
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

  return (<Animated.View style={gameOverStyle(top, opacity)}>
    <View style={styles.textSectionStlye}>
      <Text style={styles.gameOver}>GAME OVER</Text>
      <TouchableOpacity onPress={restartGame}>
        <Text style={styles.retry}>RETRY</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>)
}

export default GameOver;

const styles = StyleSheet.create({
  textSectionStlye: {
    backgroundColor: "#270038",
    width: config.width,
    height: 120,
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  gameOver: {
    color: "#980000",
    fontSize: 20,
    opacity: 1
  },
  retry: {
    color: "#fff",
    fontSize: 40,
    opacity: 0.6
  }
});
