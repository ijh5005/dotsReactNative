import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";

const img = require("../../../imgs/gold.png");

const GameBlock = (props) => {

  let opacity = new Animated.Value(0);

  /*useEffect(() => {
    setTimeout(() => {

      if(index === 3){
        Animated.timing(                  // Animate over time
          opacity,            // The animated value to drive
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: 200,              // Make it take a while
          }
        ).start(() => {
          Animated.timing(                  // Animate over time
            opacity,            // The animated value to drive
            {
              toValue: 0,                   // Animate to opacity: 1 (opaque)
              duration: 200,              // Make it take a while
            }
          ).start();
        });
      }

      if(index === 2 || index === 4){
        setTimeout(() => {
          Animated.timing(                  // Animate over time
            opacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 200,              // Make it take a while
            }
          ).start(() => {
            Animated.timing(                  // Animate over time
              opacity,            // The animated value to drive
              {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 200,              // Make it take a while
              }
            ).start();
          });
        }, 50)
      }

      if(index === 1 || index === 5){
        setTimeout(() => {
          Animated.timing(                  // Animate over time
            opacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 200,              // Make it take a while
            }
          ).start(() => {
            Animated.timing(                  // Animate over time
              opacity,            // The animated value to drive
              {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 200,              // Make it take a while
              }
            ).start();
          });
        }, 100)
      }

      if(index === 0){
        setTimeout(() => {
          Animated.timing(                  // Animate over time
            opacity,            // The animated value to drive
            {
              toValue: 1,                   // Animate to opacity: 1 (opaque)
              duration: 200,              // Make it take a while
            }
          ).start(() => {
            Animated.timing(                  // Animate over time
              opacity,            // The animated value to drive
              {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 200,              // Make it take a while
              }
            ).start();
          });
        }, 150)
      }

    }, 1000)
  }, [])*/

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

  const bkColor = (scored === "second") && "#2b0938";
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

  return (<TouchableOpacity>
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
