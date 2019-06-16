import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

const GameBlock = (props) => {

  const {
    isDisabledBox,
    borders,
    clickBorder,
    index,
    hasScored,
    getSides,
    scored,
    whoClickedTheLineTracker,
    boxName
  } = props;

  const bkColor = (scored === "first") ? "#eee" : (scored === "second") ? "#888" : null;

  const styles = {
    box: {
      backgroundColor: bkColor,
      height: 55,
      width: 55,
      position: "relative",
      opacity: isDisabledBox ? 0 : 1,
      zIndex: isDisabledBox ? 1 : 5,
      borderWidth: 1,
      borderTopColor: borders.top ? "#444" : "#bbb",
      borderRightColor: borders.right ? "#444" : "#bbb",
      borderBottomColor: borders.bottom ? "#444" : "#bbb",
      borderLeftColor: borders.left ? "#444" : "#bbb",
      position: "relative",
    },
    top: {
      height: "30%",
      width: "100%",
      position: "absolute",
      top: "-15%",
    },
    right: {
      height: "100%",
      width: "30%",
      position: "absolute",
      right: "-15%",
    },
    bottom: {
      height: "30%",
      width: "100%",
      position: "absolute",
      bottom: "-15%",
    },
    left: {
      height: "100%",
      width: "30%",
      left: "-15%",
    }
  }

  return (<TouchableOpacity>
    <View style={styles.box}>

      <TouchableOpacity style={styles.top} onPress={() => clickBorder("top", index)}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.right} onPress={() => clickBorder("right", index)}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottom} onPress={() => clickBorder("bottom", index)}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.left} onPress={() => clickBorder("left", index)}>
        <View />
      </TouchableOpacity>

    </View>
  </TouchableOpacity>)

}

export default GameBlock;
