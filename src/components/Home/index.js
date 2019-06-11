import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

const Home = () => {

  const [text, setText] = useState("hey");

  useEffect(() => {
    setTimeout(() => {
      setText("hi")
    }, 4000)
  }, [])

  const onPressButton = (e) => {
    console.log(e)
  }

  return (<TouchableOpacity onPress={onPressButton}>
    <View>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>)
}

export default Home;
