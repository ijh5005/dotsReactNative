import React from "react";
import {
  View,
  Text,
  Dimensions
} from "react-native";

var width = Dimensions.get('window').width; //full width

const GameScoreBoard = (props) => {

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
      // backgroundColor: "#9800d2",
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
    }
  }

  return (<View style={styles.scoreBoardStyle}>
    <View style={styles.scoreBoxStyle}>
      <Text style={styles.scoreTextStyle}>your score</Text>
      <Text style={styles.yourScoreStyle}>0</Text>
    </View>
    <View style={styles.scoreBoxStyle}>
      <Text style={styles.scoreTextStyle}>computer</Text>
      <Text style={styles.computerScoreStyle}>0</Text>
    </View>
  </View>)

}

export default GameScoreBoard;
