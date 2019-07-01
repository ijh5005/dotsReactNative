import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";

import {
  getBorderStyles
} from "../util/BoxInfo";

const img = require("../../../imgs/gold.png");

const GameBlock = (props) => {

  let opacity = new Animated.Value(0);

  useEffect(() => {
    if(props.explodingBoxes[props.index]){
      setTimeout(() => {
        Animated.timing(
          opacity,
          {
            toValue: 1,
            duration: 200,
          }
        ).start(() => {
          Animated.timing(
            opacity,
            {
              toValue: 0,
              duration: 200,
            }
          ).start();
        });
      }, props.explodingBoxes[props.index].waitTime)
    }
  }, [props.explodingBoxes]);

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

  const scoreColor = (scored === "second") && "#2b0938";
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

  const borderStyles = getBorderStyles(
    borders, isTopRightCornerBox, isTopLeftCornerBox,
    isTopSideRow, isBottomRightCornerBox, isBottomLeftCornerBox,
    isBottomSideRow, isRightSideRow, isLeftSideRow
  );

  const styles = {
    box: {
      backgroundColor: scoreColor || 'transparent',
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
      height: "34%",
      width: "100%",
      position: "absolute",
      top: "-15%"
    },
    right: {
      height: "100%",
      width: "34%",
      position: "absolute",
      right: "-15%"
    },
    bottom: {
      height: "34%",
      width: "100%",
      position: "absolute",
      bottom: "-15%"
    },
    left: {
      height: "100%",
      width: "34%",
      left: "-15%",
      position: "absolute",
      top: 0
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
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: (scored === "first") ? 1 : 0
    }
  }

  const clickGameBox = () => {
    props.setExplosionBoxes(props.index);
  }

  return (<TouchableOpacity onPress={() => clickGameBox()}>
    <View style={{...styles.box, ...borderStyles}}>

      <View style={styles.yourScore}>
        <Image
          style={{flex:1, height: null, width: null}}
          source={img}
        />
      </View>

      <Animated.View style={{height: "100%", width: "100%", backgroundColor: "#980000", opacity: opacity}}>
      </ Animated.View>

      <View style={styles.topLeft} />
      <View style={styles.topRight} />
      <View style={styles.bottomLeft} />
      <View style={styles.bottomRight} />

      <TouchableOpacity style={styles.top} onPress={() => clickBorder("top", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.right} onPress={() => clickBorder("right", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottom} onPress={() => clickBorder("bottom", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.left} onPress={() => clickBorder("left", index, "first")}>
        <View />
      </TouchableOpacity>

    </View>
  </TouchableOpacity>)

}

export default GameBlock;
