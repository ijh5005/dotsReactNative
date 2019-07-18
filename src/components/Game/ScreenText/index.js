import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet
} from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const ScreenText = (props) => {

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
      width,
      height,
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

export default ScreenText;

const styles = StyleSheet.create({
  textSectionStlye: {
    backgroundColor: "#270038",
    width,
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
