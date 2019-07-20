import React, { useEffect } from "react";
import { Dimensions } from "react-native";

export const config = {
  finalLevel: "level8",
  informationBoard: [2, 6],
  informationText: {
    "2": "foot",
    "6": "makeda"
  },
  isDebuggingMode: false,
  levels: [1, 2, 3, 4, 5, 6, 7, 8],
  levelDefaultBombs: {
    level1: [],
    level2: ["cheetah", "cheetah", "panther"],
    level3: ["panther", "panther"],
    level4: ["cheetah", "panther"],
    level5: ["panther"],
    level6: ["cheetah", "makeda"],
    level7: ["panther", "makeda"],
    level8: ["cheetah", "panther", "makeda"]
  },
  footSquares: {
    level1: [],
    level2: [9, 13, 14, 19, 22, 27],
    level3: [17, 27],
    level4: [1, 10, 22, 34],
    level5: [28, 34],
    level6: [0, 3, 5, 21, 24, 25, 26, 28, 29, 33],
    level7: [24, 29, 30, 35],
    level8: [6, 7, 8, 9, 10, 11, 28, 29, 34, 35]
  },
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
