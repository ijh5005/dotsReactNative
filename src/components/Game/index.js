import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { gameBoards } from "./GameBoards";
import {
  boxInfo,
  borderCount,
  connectedBoxesObj,
  connectedBoxesObjRef,
  getBoxNameByIndex,
  getBoxSideBySide,
  getBoxObjByBoxName,
  isClickable,
  getNewBorderCounts,
  getNewConnectedBoxes,
  getTheNextPlayerTurn,
  getTheNewBordAfterClickingSide,
  isDisabled,
  getSidesInfo,
  getBorderCounts,
  getSideIndex,
  getLightPattern
} from "./util/BoxInfo";
import { computerMove } from "./util/ComputerLogic";
import { whoClickedTheLine } from "./util/WhoClicked";
import { whoScoredObj } from "./util/WhoScored";
import {
  explosions,
  explosionSides
} from "./util/ExplosionPattern";
import { explosionStlyes } from "./util/ExplosionStlyes";

import GameScoreBoard from "./GameScoreBoard";
import GameBlock from "./GameBlock";

const img = require("../../imgs/bkImg.png");
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const cheetahImg = require("../../imgs/asset_cheetah.png");
const pantherImg = require("../../imgs/asset_panther.png");
const makedaImg = require("../../imgs/asset_queen_makeda.png");

const Game = () => {

  const [board, setBoard] = useState(gameBoards.level5)
  const [playerTurn, setPlayerTurn] = useState("first");
  const [borders, setBorders] = useState(borderCount);
  const [connectedBoxes, setConnectedBoxes] = useState({...connectedBoxesObj});
  const [whoScored, setWhoScored] = useState(whoScoredObj);
  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(whoClickedTheLine);
  const [computerLastLineClick, setComputerLastLineClick] = useState(false);
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [explodingBoxes, setExplodingBoxes] = useState({});
  const [activeBomb, setActiveBomb] = useState("");

  useEffect(() => {
    setTimeout(() => {
      // only use logic if it is the computer turn. ex: "second" player
      if(playerTurn !== "second") return;
      // get a move for the computer to make
      const move = computerMove(borders, connectedBoxes, board);
      // if the move is empty the computer has no moves
      if(!move) return;
      // if the move is not empty make a computer mover
      clickBorder(move.side, move.index, "second");
    }, 100)
  }, [playerTurn, whoScored]); // this is only used if borders or connectedBoxes change

  useEffect(() => {
    let yourScoreCount = 0;
    let computerScoreCount = 0;
    for(let i in whoScored){
      if(whoScored[i] === "first"){
        yourScoreCount++;
      } else if (whoScored[i] === "second") {
        computerScoreCount++;
      }
    }
    setYourScore(yourScoreCount);
    setComputerScore(computerScoreCount);
    if(yourScoreCount + computerScoreCount === 36){
      setGameOver(true)
    }
  }, [whoScored])

  // styles for the game
  const styles = {
    boardStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      height,
      width
    }
  }

  const adjustBorderCount = () => {
    // get the new incremented border counts
    // const temp = getNewBorderCounts(borders, boxIndex);
    const temp = getBorderCounts(board);
    // set the new borders
    setBorders({ ...temp });
  }

  const adjustConnectedBoxes = (index) => {
    const temp = getNewConnectedBoxes(connectedBoxes, index);
    setConnectedBoxes({ ...temp });
  }

  const setComputerLastClickedLine = (state) => {
    (playerTurn === "second") ? setComputerLastLineClick(state) : setComputerLastLineClick(false);
  }

  const setLineColor = (indexes, sides) => {
    const boxIndex = indexes[0];
    const box = getBoxNameByIndex(boxIndex);
    const boxSide = sides[0];

    const adjBoxIndex = indexes[1];
    const adjBox = getBoxNameByIndex(adjBoxIndex);
    const adjBoxSide = sides[1];

    const linesClickedObj = {};

    const temp = {...whoClickedTheLineTracker};
    if((boxIndex || boxIndex === 0) && (adjBoxIndex || adjBoxIndex === 0)){
      temp[box][boxSide] = playerTurn;
      temp[adjBox][adjBoxSide] = playerTurn;
      setComputerLastClickedLine({boxes: [box, adjBox], sides: [boxSide, adjBoxSide]});
    } else if (boxIndex || boxIndex === 0) {
      temp[box][boxSide] = playerTurn;
      setComputerLastClickedLine({boxes: [box], sides: [boxSide]});
    } else if (adjBoxIndex || adjBoxIndex === 0) {
      temp[adjBox][adjBoxSide] = playerTurn;
      setComputerLastClickedLine({boxes: [adjBox], sides: [adjBoxSide]});
    }
    setWhoClickedTheLineTracker({
      ...temp
    })
  }

  const setTurnPlayer = (hasScored, clickedIndexes) => {
    const {scored, boxes} = hasScored;
    // set the turn to the next play turn if there was not a score
    if(!scored){
      const whosTurn = getTheNextPlayerTurn(playerTurn);
      setPlayerTurn(whosTurn);
    } else {

      const boxIndex = clickedIndexes[0];
      const box = (boxIndex || boxIndex === 0) ? getBoxNameByIndex(boxIndex) : false;
      const boxLineCount = box ? borders[box] : false;
      const boxAboutToScored = boxLineCount === 3;

      const adjBoxIndex = clickedIndexes[1];
      const adjBox = (adjBoxIndex || adjBoxIndex === 0) ? getBoxNameByIndex(adjBoxIndex) : false;
      const adjBoxLineCount = adjBox ? borders[adjBox] : false;
      const adjBoxAboutToScored = adjBoxLineCount === 3;

      const setScoredPlayer = {};
      if(boxAboutToScored && adjBoxAboutToScored){
        setScoredPlayer[box] = playerTurn;
        setScoredPlayer[adjBox] = playerTurn;
      } else if (boxAboutToScored) {
        setScoredPlayer[box] = playerTurn;
      } else if (adjBoxAboutToScored) {
        setScoredPlayer[adjBox] = playerTurn;
      }

      setWhoScored({ ...whoScored, ...setScoredPlayer })

    }
  }

  const setSide = (boxName, side) => {
    const temp = getTheNewBordAfterClickingSide(board, boxName, side);
    setBoard(temp);
  }

  const clickBorder = (side, index, player) => {
    if(player !== playerTurn) return console.log("not your turn")

    const boxName = getBoxNameByIndex(index);
    const boxObj = getBoxObjByBoxName(board, boxName);
    const { disabled, borders } = boxObj;
    if(!isClickable(borders, side)) return console.log("line not clickable");
    setSide(boxName, side);

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(board, side, index);
    const adjBoxName = getBoxNameByIndex(adjacentBoxIndex);

    const updatedConnections = [];
    (!isDisabled(board, boxName)) && updatedConnections.push(index);

    if(adjacentBoxIndex || adjacentBoxIndex === 0){
      setSide(adjBoxName, adjBoxSide);
      (!isDisabled(board, adjBoxName)) && updatedConnections.push(adjacentBoxIndex);
    }

    updatedConnections.length && adjustConnectedBoxes(updatedConnections);
    adjustBorderCount();

    const hasScored = boxInfo.hasScored(board, index, adjacentBoxIndex);
    if((board[boxName] && !isDisabled(board, boxName)) ||
      (board[adjBoxName] && !isDisabled(board, adjBoxName))){
      setLineColor([index, adjacentBoxIndex], [side, adjBoxSide]);
      setTurnPlayer(hasScored, [index, adjacentBoxIndex]);
    }
  }

  const keys = Object.keys(board);

  const imgStyle = {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }

  const bombSection = {
    height: 100,
    width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }

  const setExplosionBoxes = (boxIndex) => {
    const temp = getLightPattern(explosions, activeBomb, boxIndex);
    setExplodingBoxes(temp);

    const temp2 = {...board}
    const temp3 = {...whoClickedTheLineTracker}
    const temp4 = {...borders}
    const temp5 = {...connectedBoxes}

    const bombType = explosionSides[activeBomb][`box${boxIndex}`];
    for(let side in bombType){
      const sideIndex = getSideIndex(side);
      bombType[side].forEach(rowBoxIndex => {
        temp2[`box${rowBoxIndex}`].borders[side] = null;
        temp3[`box${rowBoxIndex}`][side] = null;
        temp5[`box${rowBoxIndex}`][rowBoxIndex] = connectedBoxesObjRef[`box${rowBoxIndex}`][sideIndex];
        whoScored[`box${rowBoxIndex}`] = null;

        const newCount = temp4[`box${rowBoxIndex}`]--;
        temp4[`box${rowBoxIndex}`] = newCount;

        const boxName = getBoxNameByIndex(rowBoxIndex);
        if(computerLastLineClick.boxes && computerLastLineClick.boxes.includes(boxName)){
          const boxIndexInLastClicked = computerLastLineClick.boxes.indexOf(boxName);
          if(computerLastLineClick.sides[boxIndexInLastClicked] === side){
            const temp = {...computerLastLineClick};
            temp.boxes.splice(boxIndexInLastClicked, 1);
            temp.sides.splice(boxIndexInLastClicked, 1);
            setComputerLastLineClick(temp);
          }
        }
      });
    }

    setBoard(temp2)
    setBorders(temp4)
    setConnectedBoxes(temp5)
  }

  const selectBomb = (bomb) => {
    if(activeBomb === bomb){
      return setActiveBomb("")
    }
    setActiveBomb(bomb)
  }

  return (<View style={styles.boardStyle}>
    <Image
      style={imgStyle}
      source={img}
    />
    <GameScoreBoard
      yourScore={yourScore}
      computerScore={computerScore}
      playerTurn={playerTurn}
    />
    {keys.map((data, index) => {
      const {
        disabled,
        borders
      } = board[data];
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
      const box = getBoxNameByIndex(index)
      const isDisabledBox = disabled || false;
      const hasScored = borders.top && borders.right && borders.bottom && borders.left;
      const borderColors = boxInfo.getBorderColors(box, whoClickedTheLineTracker);
      return (<GameBlock
        isDisabledBox={isDisabledBox}
        borders={borders}
        clickBorder={clickBorder}
        index={index}
        hasScored={hasScored}
        scored={whoScored[box]}
        borderColors={borderColors}
        computerLastLineClick={computerLastLineClick}
        boxName={box}
        isTopRightCornerBox={isTopRightCornerBox}
        isTopLeftCornerBox={isTopLeftCornerBox}
        isBottomRightCornerBox={isBottomRightCornerBox}
        isBottomLeftCornerBox={isBottomLeftCornerBox}
        isTopSideRow={isTopSideRow}
        isRightSideRow={isRightSideRow}
        isBottomSideRow={isBottomSideRow}
        isLeftSideRow={isLeftSideRow}
        explodingBoxes={explodingBoxes}
        setExplosionBoxes={setExplosionBoxes}
        key={index} />)})}
    {/*<View>
      <Text>New Game</Text>
      <View>
        <Text>easy</Text>
        <Text>medium</Text>
        <Text>hard</Text>
      </View>
    </View>*/}
    <View
      style={bombSection}
    >

      <TouchableOpacity onPress={() => selectBomb("cheetah")}>
        <View style={activeBomb === "cheetah" ? explosionStlyes.selectedBomb : {}}>
          <Image
            style={explosionStlyes.generalBombStlyes()}
            source={cheetahImg}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectBomb("panther")}>
        <View style={activeBomb === "panther" ? explosionStlyes.selectedBomb : {}}>
          <Image
            style={explosionStlyes.generalBombStlyes()}
            source={pantherImg}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectBomb("makeda")}>
        <View style={activeBomb === "makeda" ? explosionStlyes.selectedBomb : {}}>
          <Image
            style={explosionStlyes.makedaBombStyle()}
            source={makedaImg}
          />
        </View>
      </TouchableOpacity>

    </View>
  </View>)

}

export default Game;
