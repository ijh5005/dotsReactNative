import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StyleSheet
} from "react-native";

import { images } from "../util/Images";

import { introMusic } from "../Sounds";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const nameBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color,
    fontSize,
    opacity,
    fontWeight: "bold",
    fontFamily: "Raleway-Black"
  }
}

const HomeScreen = (props) => {

  const playGameMusic = () => {
    setTimeout(() => {
      introMusic.setCurrentTime(0);
      introMusic.play();
      introMusic.setNumberOfLoops(-1);
    }, 500)
  }

  const {
    startGame, motivationPage, storePage, navigation
  } = props;

  navigation.addListener('willFocus', () => {
    playGameMusic();
  })

  navigation.addListener('willBlur', () => {
    introMusic.setCurrentTime(0);
    introMusic.pause();
  })

  const startTheGame = () => {
    startGame();
  }

  const startingColor = 0;
  const endingColor = 1;
  let colorAnimation = new Animated.Value(startingColor);

  const animateScoreBoard = () => {
    Animated.timing(
      colorAnimation,
      { toValue: endingColor, duration: 4000 }
    ).start(() => {
      Animated.timing(
        colorAnimation,
        { toValue: startingColor, duration: 4000 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '#270035', '#b57800' ]
  });

  return (<View style={styles.fullPage}>
    <View style={styles.menuArea}>
      <View style={styles.textSectionStlye}>
        <TouchableOpacity onPress={startTheGame}>
          <Text style={styles.textBoxStlye}>play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={motivationPage}>
          <Text style={styles.textBoxStlye}>motivation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={storePage}>
          <Text style={styles.textBoxStlye}>store</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.title}>
      <Animated.Text style={nameBoxStlye(letterColor, width * 0.3)}>D</Animated.Text>
      <Image style={styles.titleImg} source={images.rhino} />
      <Animated.Text style={nameBoxStlye(letterColor, width * 0.3)}>T</Animated.Text>
      <Animated.Text style={nameBoxStlye(letterColor, width * 0.3)}>S</Animated.Text>
    </View>
  </View>)
}

export default HomeScreen;

const styles = StyleSheet.create({
  fullPage: {
    width,
    height
  },
  menuArea: {
    width,
    height: (height * 0.8),
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(39, 0, 56, 0.6)"
  },
  imgStyle: {
    width,
    height,
    position: "absolute",
    paddingTop: 40
  },
  textSectionStlye: {
    backgroundColor: "#270038",
    height: "88%",
    justifyContent: "center",
    alignItems: "center"
  },
  textBoxStlye: {
    color: "#b57800",
    fontSize: 50,
    opacity: 1,
    fontWeight: "bold",
    fontFamily: "Raleway-Black",
    letterSpacing: 6,
    lineHeight: 80
  },
  title: {
    position: "absolute",
    top: "12%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width
  },
  titleImg: {
    height: 60,
    width: 60,
    position: "relative",
    top: 12
  }
});
