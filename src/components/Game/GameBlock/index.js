import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";

import { boxInfo } from "../util/BoxInfo";

const gold = require("../../../imgs/gold.png");
const foot = require("../../../imgs/foot.png");

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

  // line animation
  const startingColor = 0;
  const endingColor = 1;
  let colorAnimation = new Animated.Value(startingColor);

  const animateScoreBoard = () => {
    Animated.timing(
      colorAnimation,
      { toValue: endingColor, duration: 500 }
    ).start(() => {
      Animated.timing(
        colorAnimation,
        { toValue: startingColor, duration: 500 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '#270035', '#b57800' ]
  });

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
    isLeftSideRow,
    footIndexes,
    highlightEdge
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

  const borderStyles = boxInfo.getBorderStyles(
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
      borderTopColor: (highlightEdge === "top") ? letterColor : topBorderColor,
      borderRightColor: (highlightEdge === "right") ? letterColor : rightBorderColor,
      borderBottomColor: (highlightEdge === "bottom") ? letterColor : bottomBorderColor,
      borderLeftColor: (highlightEdge === "left") ? letterColor : leftBorderColor
    },
    top: {
      height: "40%",
      width: "100%",
      position: "absolute",
      top: "-18%"
    },
    right: {
      height: "100%",
      width: "40%",
      position: "absolute",
      right: "-18%"
    },
    bottom: {
      height: "40%",
      width: "100%",
      position: "absolute",
      bottom: "-18%"
    },
    left: {
      height: "100%",
      width: "40%",
      left: "-18%",
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
      left: 0
    },
    foot: {
      // height: "80%",
      // width: "80%",
      height: "120%",
      width: "100%",
      top: "-10%",
      position: "absolute",
      // top: "10%",
      // left: "10%",
      justifyContent: "center",
      alignItems: "center"
    }
  }

  const clickGameBox = () => {
    props.setExplosionBoxes(props.index);
  }

  return (<TouchableOpacity onPress={() => clickGameBox()}>
    <Animated.View style={{...styles.box, ...borderStyles}}>

      {(scored === "first") && <View style={styles.yourScore}>
        <Image
          style={{flex:1, height: null, width: null}}
          source={gold}
        />
      </View>}

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

      {(footIndexes.includes(index)) && <View style={styles.foot}>
        <Image
          style={{flex:1, height: 50, width: 50}}
          source={foot}
        />
      </View>}

    </Animated.View>
  </TouchableOpacity>)

}

export default GameBlock;
