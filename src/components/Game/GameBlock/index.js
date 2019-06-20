import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

const img = require("../../../imgs/gold.png");

const GameBlock = (props) => {

  const {
    isDisabledBox,
    borders,
    clickBorder,
    index,
    hasScored,
    scored,
    borderColors,
    computerLastLineClick,
    boxName,
    isTopRightCornerBox,
    isTopLeftCornerBox,
    isBottomRightCornerBox,
    isBottomLeftCornerBox,
    isTopSideRow,
    isRightSideRow,
    isBottomSideRow,
    isLeftSideRow
  } = props;

  const bkColor = (scored === "first") ? "#eee" : (scored === "second") ? "#2b0938" : null;
  let topBorderColor = (borderColors[0] === "first") ? "#b57800" : (borderColors[0] === "second") ? "#980000" : "rgb(73, 17, 94)";
  let rightBorderColor = (borderColors[1] === "first") ? "#b57800" : (borderColors[1] === "second") ? "#980000" : "rgb(73, 17, 94)";
  let bottomBorderColor = (borderColors[2] === "first") ? "#b57800" : (borderColors[2] === "second") ? "#980000" : "rgb(73, 17, 94)";
  let leftBorderColor = (borderColors[3] === "first") ? "#b57800" : (borderColors[3] === "second") ? "#980000" : "rgb(73, 17, 94)";

  if(computerLastLineClick && computerLastLineClick.boxes.includes(boxName)){
    const lastClickColor = "#d5e4ff";
    const indexOfBox = computerLastLineClick.boxes.indexOf(boxName);
    if(computerLastLineClick.sides[indexOfBox] === "top"){
      topBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "right") {
      rightBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "bottom") {
      bottomBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "left") {
      leftBorderColor = lastClickColor;
    }
  }

  const borderStyles = {};
  if((isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow) && !borders.top){
    borderStyles.borderTopStyle = "dashed";
    borderStyles.borderTopColor = "#230130";
  }
  if((isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow) && !borders.right){
    borderStyles.borderRightStyle = "dashed";
    borderStyles.borderRightColor = "#230130";
  }
  if((isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow) && !borders.bottom){
    borderStyles.borderBottomStyle = "dashed";
    borderStyles.borderBottomColor = "#230130";
  }
  if((isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow) && !borders.left){
    borderStyles.borderLeftStyle = "dashed";
    borderStyles.borderLeftColor = "#230130";
  }

  const styles = {
    box: {
      backgroundColor: bkColor,
      height: 55,
      width: 55,
      position: "relative",
      opacity: isDisabledBox ? 0 : 1,
      zIndex: isDisabledBox ? 1 : 5,
      borderTopWidth: (isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow) ? 2 : 1,
      borderRightWidth: (isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow) ? 2 : 1,
      borderBottomWidth: (isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow) ? 2 : 1,
      borderLeftWidth: (isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow) ? 2 : 1,
      borderTopColor: topBorderColor,
      borderRightColor: rightBorderColor,
      borderBottomColor: bottomBorderColor,
      borderLeftColor: leftBorderColor
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
    },
    topLeft: {
      position: "absolute",
      top: -4,
      left: -4,
      height: 8,
      width: 8,
      backgroundColor: "#270038",
      borderRadius: 2
    },
    topRight: {
      position: "absolute",
      top: -4,
      right: -4,
      height: 8,
      width: 8,
      backgroundColor: "#270038",
      borderRadius: 2
    },
    bottomLeft: {
      position: "absolute",
      bottom: -4,
      left: -4,
      height: 8,
      width: 8,
      backgroundColor: "#270038",
      borderRadius: 2
    },
    bottomRight: {
      position: "absolute",
      right: -4,
      bottom: -4,
      height: 8,
      width: 8,
      backgroundColor: "#270038",
      borderRadius: 2
    },
    yourScore: {
      height: undefined,
      width: undefined,
      flex: 1
    }
  }

  return (<TouchableOpacity>
    <View style={{...styles.box, ...borderStyles}}>

      <View style={styles.topLeft} />
      <View style={styles.topRight} />
      <View style={styles.bottomLeft} />
      <View style={styles.bottomRight} />

      <Image
        style={{flex:1, height: undefined, width: undefined}}
        source={img}
        resizeMode={"cover"}
      />

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
