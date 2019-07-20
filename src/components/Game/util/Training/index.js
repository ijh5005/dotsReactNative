export const trainRestrictions = {
  level1: {
    computerMoves: [{
        type: "clickSide",
        box: 20,
        side: "top"
      }, {
        type: "clickSide",
        box: 13,
        side: "right"
      }
    ],
    yourMoves: [{
      type: "clickSide",
      boxes: [14, 15],
      sides: ["right", "left"],
      text: "take turns selecting lines"
    }, {
      type: "clickSide",
      boxes: [21, 22],
      sides: ["right", "left"]
    }, {
      type: "clickSide",
      boxes: [8, 14],
      sides: ["bottom", "top"],
      text: "form a box to score"
    }]
  },
  level2: {
    yourMoves: [{
      type: "explosionClick",
      bomb: "cheetah",
      text: "Select the Cheetah bomb"
    }, {
      type: "boxClick",
      clickBox: 20,
      text: "Now select a square to use the bomb... It explodes left to right"
    }, {
      type: "explosionClick",
      bomb: "panther",
      text: "Select the Panther bomb"
    }, {
      type: "boxClick",
      clickBox: 15,
      text: "Each bomb has it's own explosion pattern"
    }]
  },
  level3: null,
  level4: null,
  level5: null,
  level6: null,
  level7: null,
  level8: null,
}
