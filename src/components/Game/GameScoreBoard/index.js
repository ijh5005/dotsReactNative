import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated
} from "react-native";

var width = Dimensions.get('window').width; //full width

const GameScoreBoard = (props) => {

  const {
    yourScore,
    computerScore,
    playerTurn
  } = props;

  const startingOpacity = 0.5;
  const endingOpacity = 0.2;
  let turnOpacityAnimation = new Animated.Value(startingOpacity);

  const animateScoreBoard = () => {
    Animated.timing(
      turnOpacityAnimation,
      { toValue: endingOpacity, duration: 1000 }
    ).start(() => {
      Animated.timing(
        turnOpacityAnimation,
        { toValue: startingOpacity, duration: 1000 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const styles = {
    scoreBoardStyle: {
      width,
      height: 100,
      marginTop: 80,
      flexDirection: "row"
    },
    scoreBoxStyle: {
      height: "100%",
      width: "50%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    scoreTextStyle: {
      color: "#b142da",
      fontSize: 18
    },
    yourScoreStyle: {
      color: "#b57800",
      fontSize: 30
    },
    computerScoreStyle: {
      color: "#980000",
      fontSize: 30
    },
    yourScoreBoard: {
      height: "100%",
      width: "50%",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#9800d2",
      opacity: (playerTurn === "first") ? turnOpacityAnimation : 0
    },
    computerScoreBoard: {
      height: "100%",
      width: "50%",
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "#9800d2",
      opacity: (playerTurn === "second") ? turnOpacityAnimation : 0
    }
  }

  return (<View style={styles.scoreBoardStyle}>
    <Animated.View style={styles.yourScoreBoard} />
    <Animated.View style={styles.computerScoreBoard} />
    <View style={styles.scoreBoxStyle}>
      <Text style={styles.scoreTextStyle}>your score</Text>
      <Text style={styles.yourScoreStyle}>{yourScore}</Text>
    </View>
    <View style={styles.scoreBoxStyle}>
      <Text style={styles.scoreTextStyle}>computer</Text>
      <Text style={styles.computerScoreStyle}>{computerScore}</Text>
    </View>
  </View>)

}

export default GameScoreBoard;
