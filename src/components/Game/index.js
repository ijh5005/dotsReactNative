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
  getLightPattern,
  hasFootRestriction
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
import GameOver from "./GameOver";
import YouWin from "./YouWin";
import HomeScreen from "./HomeScreen";

import { footSquares } from "./FootSquares";

const img = require("../../imgs/bkImg.png");
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const finalLevel = "level8";

const cheetahImg = require("../../imgs/asset_cheetah.png");
const pantherImg = require("../../imgs/asset_panther.png");
const makedaImg = require("../../imgs/asset_queen_makeda.png");

const Game = () => {

  const breakRefAndCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }
  const getBoardScore = (board) => {
    let totalScore = 0;
    for(let box in board){
      if(!board[box].disabled){
        totalScore++;
      }
    }
    return totalScore;
  }

  const [currentLevel, setCurrentLevel] = useState("level1");
  const [board, setBoard] = useState(breakRefAndCopy(gameBoards[currentLevel]));
  const [playerTurn, setPlayerTurn] = useState("first");
  const [borders, setBorders] = useState(breakRefAndCopy(borderCount));
  const [connectedBoxes, setConnectedBoxes] = useState(breakRefAndCopy(connectedBoxesObj));
  const [whoScored, setWhoScored] = useState(breakRefAndCopy(whoScoredObj));
  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(breakRefAndCopy(whoClickedTheLine));
  const [computerLastLineClick, setComputerLastLineClick] = useState(false);
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [explodingBoxes, setExplodingBoxes] = useState({});
  const [activeBomb, setActiveBomb] = useState("");
  const [footIndexes, setFootIndexes] = useState(footSquares[currentLevel]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [boardTotalScore, setBoardTotalScore] = useState(getBoardScore(gameBoards[currentLevel]))
  const [showHomeScreen, setShowHomeScreen] = useState(true)

  let chosenBombs = ["cheetah", "panther", "makeda"];

  const isDebuggingMode = true;
  const checkComputerMove = () => {
    debugger
    const move = computerMove(borders, connectedBoxes, board, footIndexes);
    debugger
  }

  useEffect(() => {
    setTimeout(() => {
      // only use logic if it is the computer turn. ex: "second" player
      if(playerTurn === "second"){
        // get a move for the computer to make
        const move = computerMove(borders, connectedBoxes, board, footIndexes);
        // if the move is empty the computer has no moves
        if(!move){
          setYouWin(yourScore > computerScore);
          return setGameIsOver(true);
        }
        // if the move is not empty make a computer mover
        clickBorder(move.side, move.index, "second");
      } else {
        const totalScore = yourScore + computerScore;
        const aboutToScoreLastPoint = boardTotalScore - 1
        if(totalScore === aboutToScoreLastPoint){
          setYouWin(yourScore > computerScore);
          return setGameIsOver(true);
        }
      }
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
    if(player !== playerTurn) return console.log("not your turn");

    const boxName = getBoxNameByIndex(index);
    const boxObj = getBoxObjByBoxName(board, boxName);
    const { disabled, borders } = boxObj;
    if(!isClickable(borders, side)) return console.log("line not clickable");

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(board, side, index);
    const adjBoxName = getBoxNameByIndex(adjacentBoxIndex);

    if(hasFootRestriction(footIndexes, index, adjacentBoxIndex)){
      console.log(index)
      return console.log("foot restriction")
    };

    setSide(boxName, side);

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
    alignItems: "center",
    marginTop: 25
  }

  const setExplosionBoxes = (boxIndex) => {
    if(!activeBomb.length) return;

    const temp = getLightPattern(explosions, activeBomb, boxIndex);
    setExplodingBoxes(temp);

    const temp2 = {...board}
    const temp3 = {...whoClickedTheLineTracker}
    const temp4 = {...borders}
    const temp5 = {...connectedBoxes}
    const temp6 = [...footIndexes]

    const bombType = explosionSides[activeBomb][`box${boxIndex}`];
    for(let side in bombType){
      const sideIndex = getSideIndex(side);
      bombType[side].forEach(rowBoxIndex => {
        temp2[`box${rowBoxIndex}`].borders[side] = null;
        temp3[`box${rowBoxIndex}`][side] = null;
        temp5[`box${rowBoxIndex}`][sideIndex] = connectedBoxesObjRef[`box${rowBoxIndex}`][sideIndex];
        whoScored[`box${rowBoxIndex}`] = null;

        let newCount = temp4[`box${rowBoxIndex}`];
        if(newCount > 0){
          newCount = temp4[`box${rowBoxIndex}`]--;
        }
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

        const indexInFootArray = temp6.indexOf(rowBoxIndex)
        const isFootBox = indexInFootArray > -1;
        if(isFootBox){
          temp6.splice(indexInFootArray, 1)
        }
      });
    }

    setBoard(temp2);
    setBorders(temp4);
    setConnectedBoxes(temp5);
    setFootIndexes(temp6);
  }

  const selectBomb = (bomb) => {
    if(activeBomb === bomb){
      return setActiveBomb("")
    }
    setActiveBomb(bomb)
  }

  const levelSelectSection = {
    width,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  }

  const levelBox = {
    height: 50,
    width: 50,
    backgroundColor: "#270038",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  }

  const homeBox = {
    height: 50,
    width: 100,
    backgroundColor: "#270038",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  }

  const levels = [1, 2, 3, 4, 5, 6, 7, 8];

  const openLevel = {
    fontSize: 20,
    color: "#b57800"
  }

  const lockedLevel = {
    fontSize: 20,
    color: "#fff",
    padding: 2,
    opacity: 0.6,
    fontWeight: "bold"
  }

  const changeLevel = (level, levelText) => {
    if(levelText !== "x" || !levelText){
      setBoard(breakRefAndCopy(gameBoards[level]));
      setPlayerTurn("first");
      setBorders(breakRefAndCopy(borderCount));
      setConnectedBoxes(breakRefAndCopy(connectedBoxesObj));
      setWhoScored(breakRefAndCopy(whoScoredObj));
      setWhoClickedTheLineTracker(breakRefAndCopy(whoClickedTheLine));
      setComputerLastLineClick(false);
      setYourScore(0);
      setComputerScore(0);
      setGameOver(false);
      setExplodingBoxes({});
      setActiveBomb("");
      setFootIndexes(breakRefAndCopy(footSquares[level]));
      setGameIsOver(false);
      setYouWin(false);
      setBoardTotalScore(getBoardScore(gameBoards[level]));
      setCurrentLevel(level);
    }
  }

  const restartGame = () => {
    changeLevel(currentLevel);
    setGameIsOver(false);
  }

  const nextLevel = () => {
    const level = parseInt(currentLevel.replace("level", ""))
    const nextLevel = level + 1;
    changeLevel(`level${nextLevel}`);
    setGameIsOver(false);
  }

  const startGame = () => {
    changeLevel("level1")
    setShowHomeScreen(false);
  }

  const motivationPage = () => {
    console.log("motivation page")
  }

  const homePage = () => {
    setShowHomeScreen(true);
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
        footIndexes={footIndexes}
        key={index} />)})}
    <View
      style={bombSection}
    >

    {chosenBombs.map((data, index) => {
      let image;
      let style;
      if(data === "cheetah"){
        image = cheetahImg;
        style = explosionStlyes.generalBombStlyes();
      } else if (data === "panther") {
        image = pantherImg
        style = explosionStlyes.generalBombStlyes();
      } else if (data === "makeda") {
        image = makedaImg;
        style = explosionStlyes.makedaBombStyle();
      }
      return (<TouchableOpacity key={index} onPress={() => selectBomb(data)}>
        <View style={activeBomb === data ? explosionStlyes.selectedBomb : {}}>
          <Image
            style={style}
            source={image}
          />
        </View>
      </TouchableOpacity>)
    })}

    </View>
    <TouchableOpacity onPress={isDebuggingMode ? () => { checkComputerMove() } : () => {}}>
      <Text style={{...openLevel, letterSpacing: 5}}>Levels</Text>
    </TouchableOpacity>
    <View style={levelSelectSection}>
      {levels.map((data, index) => {
        const levelStyle = (data === "x") ? lockedLevel : openLevel;
        const levelText = (data === "x") ? "x" : (index + 1);
        return (<TouchableOpacity key={index} onPress={changeLevel.bind(this, `level${index + 1}`, levelText)}>
          <View style={levelBox}>
            <View style={levelStyle}>
              <Text style={levelStyle}>{levelText}</Text>
            </View>
          </View>
        </TouchableOpacity>)
      })}
      <TouchableOpacity onPress={homePage}>
        <View style={homeBox}>
          <View style={openLevel}>
            <Text style={openLevel}>Home</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

    {gameIsOver && !youWin &&
      <GameOver
        restartGame={restartGame}
      />}

    {gameIsOver && youWin &&
      <YouWin
        restartGame={restartGame}
        nextLevel={nextLevel}
        isLastBoard={currentLevel === finalLevel}
      />}

    {showHomeScreen && <HomeScreen
      startGame={startGame}
      motivationPage={motivationPage}/>}

  </View>)

}

export default Game;
