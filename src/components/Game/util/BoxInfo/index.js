// ***************************
// local functions
// ***************************

const getLineBetweenBoxes = (box1, box2) => {
  const box1Number = parseInt(box1.replace("box", ""));
  const box2Number = parseInt(box2.replace("box", ""));
  const difference = box1Number - box2Number;
  if(difference === 6) return "top"
  if(difference === -1) return "right"
  if(difference === -6) return "bottom"
  if(difference === 1) return "left"
}

const getUnclickedSide = (board, boxName) => {
  const { borders } = getBoxObjByBoxName(board, boxName);
  let sideToClick;
  for(let side in borders){
    if(borders[side] === null) sideToClick = side;
  }
  return sideToClick;
}

const getUnclickedSides = (board, boxName) => { // check functions that use this. Something passes it a null box name
  const { borders } = getBoxObjByBoxName(board, boxName);
  const sidesToClick = [];
  for(let side in borders){
    if(borders[side] === null) sidesToClick.push(side);
  }
  return sidesToClick;
}

const consolidatePaths = (paths) => {
  const consolidated = [];
  const takenIndex = [];
  const pathLength = paths.length;
  paths.forEach((path, index) => {
    let checker = [...path];
    if(!takenIndex.includes(index)){
      paths.forEach((innerPath, i) => {
        const found = checker.some(r=> innerPath.indexOf(r) >= 0)
        if(found && !takenIndex.includes(i)){
          takenIndex.push(i)
          const temp = [...checker];
          checker = [...temp, ...innerPath]
        }
      });
      consolidated.push(checker);
    }
  })
  const trimmedPaths = [];
  consolidated.forEach(path => {
    const pathArray = [];
    path.forEach(data => {
      if(!pathArray.includes(data)){
        pathArray.push(data);
      }
    })
    trimmedPaths.push(pathArray);
  })
  return trimmedPaths;
}

const getCount = (borders) => {
  let count = 0;
  for(let side in borders){
    if(borders[side]){
      count++
    }
  }
  return count;
}

const getBoxIndexFromName = (box) => {
  return parseInt(box.replace("box", ""));
}

// ***************************
// exported functions
// ***************************

export const getSidesInfo = (board, index) => {

  const box = board[`box${index}`];

  const isTopRightCornerBox = box.isTopRightCornerBox;
  const isTopLeftCornerBox = box.isTopLeftCornerBox;
  const isBottomRightCornerBox = box.isBottomRightCornerBox;
  const isBottomLeftCornerBox = box.isBottomLeftCornerBox;
  const isTopSideRow = box.isTopSideRow;
  const isRightSideRow = box.isRightSideRow;
  const isBottomSideRow = box.isBottomSideRow;
  const isLeftSideRow = box.isLeftSideRow;

  return {
    isTopRightCornerBox,
    isTopLeftCornerBox,
    isBottomRightCornerBox,
    isBottomLeftCornerBox,
    isTopSideRow,
    isRightSideRow,
    isBottomSideRow,
    isLeftSideRow
  }
}

export const boxInfo = {
  getAdjacentBoxInfo: (board, side, index) => {
    let adjacentBoxIndex = null;
    let adjBoxSide = null;

    const box = board[`box${index}`];

    const {
      isTopRightCornerBox,
      isTopLeftCornerBox,
      isBottomRightCornerBox,
      isBottomLeftCornerBox,
      isTopSideRow,
      isRightSideRow,
      isBottomSideRow,
      isLeftSideRow
    } = getSidesInfo(board, index);

    if(side === "top"){
      if(!isTopRightCornerBox && !isTopLeftCornerBox && !isTopSideRow){
        adjacentBoxIndex = index - 6;
        adjBoxSide = "bottom";
      }
    } else if (side === "right") {
      if(!isTopRightCornerBox && !isBottomRightCornerBox && !isRightSideRow){
        adjacentBoxIndex = index + 1;
        adjBoxSide = "left";
      }
    } else if (side === "bottom") {
      if(!isBottomRightCornerBox && !isBottomLeftCornerBox && !isBottomSideRow){
        adjacentBoxIndex = index + 6;
        adjBoxSide = "top";
      }
    } else if (side === "left") {
      if(!isTopLeftCornerBox && !isBottomLeftCornerBox && !isLeftSideRow){
        adjacentBoxIndex = index - 1;
        adjBoxSide = "right";
      }
    }

    if(!board[`box${adjacentBoxIndex}`]){
      return { adjBoxSide: null, adjacentBoxIndex: null }
    }

    return { adjBoxSide, adjacentBoxIndex };
  },
  hasScored: (board, index, adjIndex) => {
    const boxName = getBoxNameByIndex(index);
    const adjBoxName = getBoxNameByIndex(adjIndex);
    const box = (index || index === 0) ? board[boxName] : false;
    const adjBox = (adjIndex || adjIndex === 0) ? board[adjBoxName] : false;
    const hasScoreInBox = box && box.borders.top && box.borders.right && box.borders.bottom && box.borders.left;
    const hasScoreInAdjBox = adjBox && adjBox.borders.top && adjBox.borders.right && adjBox.borders.bottom && adjBox.borders.left;
    if(hasScoreInBox && hasScoreInAdjBox){
      return { scored: true, boxes: [boxName, adjBoxName] }
    } else if (hasScoreInBox) {
      return { scored: true, boxes: [boxName] }
    } else if (hasScoreInAdjBox) {
      return { scored: true, boxes: [adjBoxName] }
    }
    return { scored: false, boxes: [] }
  },
  getBorderColors: (box, whoClickedTheLineTracker) => {
    const borderColors = [];
    const borderObject = {...whoClickedTheLineTracker[box]}
    for(let i in borderObject){
      borderColors.push(borderObject[i]);
    }
    return borderColors;
  }
}

export const borderCount = {
  box0 : 0, box1 : 0, box2 : 0, box3 : 0, box4 : 0, box5 : 0, box6 : 0, box7 : 0, box8 : 0,
  box9 : 0, box10: 0, box11: 0, box12: 0, box13: 0, box14: 0, box15: 0, box16: 0, box17: 0,
  box18: 0, box19: 0, box20: 0, box21: 0, box22: 0, box23: 0, box24: 0, box25: 0, box26: 0,
  box27: 0, box28: 0, box29: 0, box30: 0, box31: 0, box32: 0, box33: 0, box34: 0, box35: 0
}

export const connectedBoxesObj = {
  box0 : [ null   , "box1" , "box6" , null ], box1 : [ null   , "box2" , "box7" , "box0"  ], box2 : [ null   , "box3" , "box8" , "box1"  ], box3 : [ null   , "box4" , "box9" , "box2"  ], box4 : [ null   , "box5" , "box10", "box3"  ], box5 : [ null   , null   , "box11", "box4"  ],
  box6 : [ "box0" , "box7" , "box12", null ], box7 : [ "box1" , "box8" , "box13", "box6"  ], box8 : [ "box2" , "box9" , "box14", "box7"  ], box9 : [ "box3" , "box10", "box15", "box8"  ], box10: [ "box4" , "box11", "box16", "box9"  ], box11: [ "box5" , null   , "box17", "box10" ],
  box12: [ "box6" , "box13", "box18", null ], box13: [ "box7" , "box14", "box19", "box12" ], box14: [ "box8" , "box15", "box20", "box13" ], box15: [ "box9" , "box16", "box21", "box14" ], box16: [ "box10", "box17", "box22", "box15" ], box17: [ "box11", null   , "box23", "box16" ],
  box18: [ "box12", "box19", "box24", null ], box19: [ "box13", "box20", "box25", "box18" ], box20: [ "box14", "box21", "box26", "box19" ], box21: [ "box15", "box22", "box27", "box20" ], box22: [ "box16", "box23", "box28", "box21" ], box23: [ "box17", null   , "box29", "box22" ],
  box24: [ "box18", "box25", "box30", null ], box25: [ "box19", "box26", "box31", "box24" ], box26: [ "box20", "box27", "box32", "box25" ], box27: [ "box21", "box28", "box33", "box26" ], box28: [ "box22", "box29", "box34", "box27" ], box29: [ "box23", null   , "box35", "box28" ],
  box30: [ "box24", "box31", null   , null ], box31: [ "box25", "box32", null   , "box30" ], box32: [ "box26", "box33", null   , "box31" ], box33: [ "box27", "box34", null   , "box32" ], box34: [ "box28", "box35", null   , "box33" ], box35: [ "box29", null   , null   , "box34" ]
}

export const connectedBoxesObjRef = {
  box0 : [ null   , "box1" , "box6" , null ], box1 : [ null   , "box2" , "box7" , "box0"  ], box2 : [ null   , "box3" , "box8" , "box1"  ], box3 : [ null   , "box4" , "box9" , "box2"  ], box4 : [ null   , "box5" , "box10", "box3"  ], box5 : [ null   , null   , "box11", "box4"  ],
  box6 : [ "box0" , "box7" , "box12", null ], box7 : [ "box1" , "box8" , "box13", "box6"  ], box8 : [ "box2" , "box9" , "box14", "box7"  ], box9 : [ "box3" , "box10", "box15", "box8"  ], box10: [ "box4" , "box11", "box16", "box9"  ], box11: [ "box5" , null   , "box17", "box10" ],
  box12: [ "box6" , "box13", "box18", null ], box13: [ "box7" , "box14", "box19", "box12" ], box14: [ "box8" , "box15", "box20", "box13" ], box15: [ "box9" , "box16", "box21", "box14" ], box16: [ "box10", "box17", "box22", "box15" ], box17: [ "box11", null   , "box23", "box16" ],
  box18: [ "box12", "box19", "box24", null ], box19: [ "box13", "box20", "box25", "box18" ], box20: [ "box14", "box21", "box26", "box19" ], box21: [ "box15", "box22", "box27", "box20" ], box22: [ "box16", "box23", "box28", "box21" ], box23: [ "box17", null   , "box29", "box22" ],
  box24: [ "box18", "box25", "box30", null ], box25: [ "box19", "box26", "box31", "box24" ], box26: [ "box20", "box27", "box32", "box25" ], box27: [ "box21", "box28", "box33", "box26" ], box28: [ "box22", "box29", "box34", "box27" ], box29: [ "box23", null   , "box35", "box28" ],
  box30: [ "box24", "box31", null   , null ], box31: [ "box25", "box32", null   , "box30" ], box32: [ "box26", "box33", null   , "box31" ], box33: [ "box27", "box34", null   , "box32" ], box34: [ "box28", "box35", null   , "box33" ], box35: [ "box29", null   , null   , "box34" ]
}

export const getSide = (index) => {
  let side;
  if(index === 0){ side = "top" }
  else if (index === 1) { side = "right" }
  else if (index === 2) { side = "bottom" }
  else { side = "left" }
  return side
}

export const getSideIndex = (side) => {
  if (side === "top") return 0;
  if (side === "right") return 1;
  if (side === "bottom") return 2;
  if (side === "left") return 3;
}

export const getRandomBoxChoice = (boxesArray) => {
  return boxesArray[Math.floor(Math.random() * boxesArray.length)];
}

export const getEdgeBoxOptions = (borders, connectedBoxes, board, footIndexes) => {

  const edgeBoxOptions = [];

  Object.keys(board).forEach((data, index) => {
    if(data){
      const boxIndex = getBoxIndexFromName(data);
      const isAFootBox = footIndexes.includes(boxIndex);
      if(!isDisabled(board, data) && !isAFootBox){
        const box = `box${index}`;

        const {
          isTopRightCornerBox,
          isTopLeftCornerBox,
          isBottomRightCornerBox,
          isBottomLeftCornerBox,
          isTopSideRow,
          isRightSideRow,
          isBottomSideRow,
          isLeftSideRow
        } = getSidesInfo(board, index);

        const topNotClicked = !board[data].borders.top;
        const rightNotClicked = !board[data].borders.right;
        const bottomNotClicked = !board[data].borders.bottom;
        const leftNotClicked = !board[data].borders.left;

        if(topNotClicked &&
          borders[box] < 2 &&
          (isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow)){
            edgeBoxOptions.push({ side: "top", index });
        }

        if (rightNotClicked &&
          borders[box] < 2 &&
          (isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow)) {
            edgeBoxOptions.push({ side: "right", index });
        }

        if (bottomNotClicked &&
          borders[box] < 2 &&
          (isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow)) {
            edgeBoxOptions.push({ side: "bottom", index });
        }

        if (leftNotClicked &&
          borders[box] < 2 &&
          (isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow)) {
            edgeBoxOptions.push({ side: "left", index });
        }
      }
    }
  });

  return edgeBoxOptions;

}

export const getOneBorderOptions = (borders, connectedBoxes, board, footIndexes) => {

  const oneBorderOptions = [];

  Object.keys(board).forEach((data, index) => {
    if(data){
      const boxIndex = getBoxIndexFromName(data);
      const isAFootBox = footIndexes.includes(boxIndex);
      if(!isDisabled(board, data) && !isAFootBox){
        const box = `box${boxIndex}`;
        if(borders[box] === 1){
          connectedBoxes[box].forEach((adjConnectedBox, i) => {
            if((borders[adjConnectedBox] === 0 && !isDisabled(board, adjConnectedBox))
            || (borders[adjConnectedBox] === 1 && !isDisabled(board, adjConnectedBox))){
              const adjBoxIndex = getBoxIndexFromName(adjConnectedBox);
              const isAdjAFootBox = footIndexes.includes(adjBoxIndex);
              if(!isAdjAFootBox){
                const side = getLineBetweenBoxes(box, adjConnectedBox);
                oneBorderOptions.push({ side, index: boxIndex });
              }
            }
          })
        }
      }
    }
  });

  return oneBorderOptions;

}

export const getNoBorderOptions = (borders, connectedBoxes, board, footIndexes) => {

  const noBorderOptions = [];

  Object.keys(board).forEach((data, index) => {
    if(data){
      const boxIndex = getBoxIndexFromName(data);
      const isAFootBox = footIndexes.includes(boxIndex)
      if(!isDisabled(board, data) && !isAFootBox){
        const box = `box${index}`;
        if(borders[box] === 0){
          connectedBoxes[box].forEach((adjConnectedBox, i) => {
            if(adjConnectedBox){
              const adjBoxIndex = adjConnectedBox ? getBoxIndexFromName(adjConnectedBox) : null;
              const isAdjFootBox = footIndexes.includes(adjBoxIndex)
              if(borders[adjConnectedBox] === 0 && !isDisabled(board, adjConnectedBox) && !isAdjFootBox){
                const side = getLineBetweenBoxes(box, adjConnectedBox);
                noBorderOptions.push({ side, index });
              }
            }
          })
        }
      }
    }
  });
  return noBorderOptions;
}

export const getAdjacentBoxIndex = (index) => {
  let adjIndex;

  if(index === 0){ adjIndex = 2 }
  else if (index === 1) { adjIndex = 3 }
  else if (index === 2) { adjIndex = 0 }
  else { adjIndex = 1 }

  return adjIndex;
}

export const getThreeBorderOptions = (borders, connectedBoxes, board, footIndexes) => {

  const threeBorderOptions = [];

  Object.keys(board).forEach((data, index) => {
    const boxIndex = getBoxIndexFromName(data);
    const isAFootBox = footIndexes.includes(boxIndex)
    if(!isDisabled(board, data) && !isAFootBox){
      const box = `box${index}`;
      if(borders[box] === 3){

        const unclickedSide = getUnclickedSide(board, data);
        const unClickedSideIndex = getSideIndex(unclickedSide);
        const unclickedBoxName = connectedBoxesObjRef[data][unClickedSideIndex];
        if(unclickedBoxName){
          const unclickedBoxIndex = getBoxIndexFromName(unclickedBoxName);
          if(!footIndexes.includes(unclickedBoxIndex)){
            threeBorderOptions.push({
              index,
              side: unclickedSide
            });
          }
        } else {
          threeBorderOptions.push({
            index,
            side: unclickedSide
          });
        }

      }
    }
  });

  return threeBorderOptions;
}

export const getPathOptions = (borders, connectedBoxes, board, footIndexes) => {
  const pathClickOptions = [];
  Object.keys(board).forEach((data, index) => {
    debugger
    console.log(footIndexes)
    const boxIndex = getBoxIndexFromName(data);
    const connectedWithTwoBorders = [];
    if(!isDisabled(board, data)){
      const box = `box${index}`;
      if(borders[box] === 2){
        connectedWithTwoBorders.push(box);
        const unclickedSides = getUnclickedSides(board, box);
        unclickedSides.forEach(unClickedSide => {
          const sideIndex = getSideIndex(unClickedSide);
          const connectedBox = connectedBoxes[box][sideIndex];
          if(!isDisabled(board, connectedBox)){
            const unclickedSides = getUnclickedSides(board, connectedBox);
            if(unclickedSides.length === 2){
              connectedWithTwoBorders.push(connectedBox)
            }
          }
        })
        pathClickOptions.push(connectedWithTwoBorders);
      }
    }
  });
  const consolidated = consolidatePaths(pathClickOptions);
  const iteration2 = consolidatePaths(consolidated);
  const iteration3 = consolidatePaths(iteration2);
  const iteration4 = consolidatePaths(iteration3);
  iteration4.sort((a, b) => {return a.length - b.length});
  const box = getRandomBoxChoice(iteration4[0]);
  const sides = getUnclickedSides(board, box);
  return {
    index: parseInt(box.replace("box", "")),
    side: getRandomBoxChoice(sides)
  };
}

export const getBoxNameByIndex = (index) => {
  return `box${index}`;
}

export const getBoxSideBySide = (side) => {
  return `${side}Box`;
}

export const getBoxObjByBoxName = (board, boxName) => {
  return board[boxName];
}

export const isClickable = (borders, side) => {
  return !borders[side];
}

export const getNewBorderCounts = (borders, boxIndex) => {
  const temp = {...borders};
  boxIndex.map(data => {
    // get the current number of borders on box
    const currentBorderCount = temp[`box${data}`];
    // precaution: not supposed to ever meet this case unless something broke in code
    if(currentBorderCount > 4){ console.log("precaution: adjustBorderCount: border greater than 4") }
    // add one to that number
    else { temp[`box${data}`] = currentBorderCount + 1; }
  });
  return temp;
}

export const getBorderCounts = (board) => {
  const borderCounts = {};
  for(let box in board){
    const count = getCount(board[box].borders);
    borderCounts[box] = count;
  }
  return borderCounts;
}

export const getNewConnectedBoxes = (connectedBoxes, index) => {
  const temp = {...connectedBoxes};
  index.map((data, i) => {
    // get an array of all conncted boxes
    const boxesConnectedToThisBox = temp[`box${data}`];
    // get the other boxes index inside the index param
    const otherBoxIndex = (i === 0) ? index[1] : index[0];
    // get the index of the connected box inside of it's connected boxes array
    const boxIndex = boxesConnectedToThisBox.indexOf(`box${otherBoxIndex}`);
    // set the connected box's place in the connected boxes array as false (not conncted anymore)
    (boxIndex !== -1) && (temp[`box${data}`][boxIndex] = null);
  });
  return temp;
}

export const getTheNextPlayerTurn = (playerTurn) => {
  return (playerTurn === "first") ? "second" : "first";
}

export const getTheNewBordAfterClickingSide = (board, boxName, side) => {
  const temp = {...board};
  // set the clicked side to true
  temp[boxName].borders[side] = true;
  return temp;
}

export const isDisabled = (board, box) => {
  if(!box) return true;
  return board[box].disabled;
}

export const getBorderStyles = (
  borders,
  isTopRightCornerBox,
  isTopLeftCornerBox,
  isTopSideRow,
  isBottomRightCornerBox,
  isBottomLeftCornerBox,
  isBottomSideRow,
  isRightSideRow,
  isLeftSideRow
) => {
  const borderStyles = {};
  if((isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow) && !borders.top){
    borderStyles.borderTopColor = "#230130";
  }
  if((isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow) && !borders.right){
    borderStyles.borderRightColor = "#230130";
  }
  if((isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow) && !borders.bottom){
    borderStyles.borderBottomColor = "#230130";
  }
  if((isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow) && !borders.left){
    borderStyles.borderLeftColor = "#230130";
  }
  return borderStyles;
}

export const getLightPattern = (explosions, activeBomb, boxIndex) => {
  const temp = {};
  const explosionMapper = explosions[activeBomb][`box${boxIndex}`];
  let increment = 25;
  for(let boxRow in explosionMapper){
    explosionMapper[boxRow].forEach(rowBoxIndex => {
      temp[rowBoxIndex] = { waitTime: increment };
    })
    increment += 25;
  }
  return temp;
}

export const hasFootRestriction = (footIndexes, index, adjacentBoxIndex) => {
  if(footIndexes.includes(index) || footIndexes.includes(adjacentBoxIndex)){
    return true;
  }
  return false
}
