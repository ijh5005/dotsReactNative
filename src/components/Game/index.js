import React, { useState, useEffect } from "react";
import GameScoreBoard from "./GameScoreBoard";
import GameBlock from "./GameBlock";
import GameOver from "./GameOver";
import YouWin from "./YouWin";
import HomeScreen from "./HomeScreen";
import MotivationScreen from "./MotivationScreen";
import StoreScreen from "./StoreScreen";
import InformativeScreen from "./InformativeScreen";
import Pointer from "./Pointer";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { gameBoards } from "./GameBoards";
import { boxInfo } from "./util/BoxInfo";
import { computerMove } from "./util/ComputerLogic";
import { whoClickedTheLine } from "./util/WhoClicked";
import { whoScoredObj } from "./util/WhoScored";
import { explosions, explosionSides } from "./util/ExplosionPattern";
import { explosionStlyes } from "./util/ExplosionStlyes";
import { settings } from "./util/Settings";
import { images } from "./util/Images";
import { util } from "./util/Util";
import { styles } from "./util/Styles";
import { footSquares } from "./FootSquares";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Game = () => {

  const [currentLevel, setCurrentLevel] = useState("level1");
  const [board, setBoard] = useState(util.breakRefAndCopy(gameBoards[currentLevel]));
  const [playerTurn, setPlayerTurn] = useState("first");
  const [borders, setBorders] = useState(util.breakRefAndCopy(boxInfo.borderCount));
  const [connectedBoxes, setConnectedBoxes] = useState(util.breakRefAndCopy(boxInfo.connectedBoxesObj));
  const [whoScored, setWhoScored] = useState(util.breakRefAndCopy(whoScoredObj));
  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(util.breakRefAndCopy(whoClickedTheLine));
  const [computerLastLineClick, setComputerLastLineClick] = useState(false);
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [explodingBoxes, setExplodingBoxes] = useState({});
  const [activeBomb, setActiveBomb] = useState("");
  const [footIndexes, setFootIndexes] = useState(footSquares[currentLevel]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [boardTotalScore, setBoardTotalScore] = useState(util.getBoardScore(gameBoards[currentLevel]))
  const [showHomeScreen, setShowHomeScreen] = useState(true)
  const [showMotivationScreen, setShowMotivationScreen] = useState(false)
  const [showStoreScreen, setShowStoreScreen] = useState(false)
  const [showInformativeScreen, setShowInformativeScreen] = useState(false)
  const [informationType, setInformationType] = useState(null)
  const [viewPointer, setViewPointer] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [currentLevelBombs, setCurrentLevelBombs] = useState([]);

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
        if(!move && !footIndexes.length){
          setYouWin(yourScore > computerScore);
          return setGameIsOver(true);
        } else if (!move) {
          setYouWin(false)
          return setGameIsOver(true);
        }
        // if the move is not empty make a computer mover
        clickBorder(move.side, move.index, "second");
      } else {
        const totalScore = yourScore + computerScore;
        const aboutToScoreLastPoint = boardTotalScore - 1
        if(totalScore === aboutToScoreLastPoint && !footIndexes.length){
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

  const clearAllStorage = async () => {
    await AsyncStorage.clear()
  }

  // clearAllStorage();

  useEffect(() => {
    if(gameIsOver && youWin){

      const checkLevelDefaults = async () => {

        try {
          const allStorage = await AsyncStorage.getAllKeys();
          if(allStorage.includes("completedLevels")){
            const completedLevels = JSON.parse(await AsyncStorage.getItem("completedLevels"));
            if(!completedLevels.includes(currentLevel)){
              completedLevels.push(currentLevel);
              await AsyncStorage.removeItem("completedLevels");
              await AsyncStorage.setItem("completedLevels", JSON.stringify(completedLevels));
            }
          } else {
            await AsyncStorage.setItem("completedLevels", JSON.stringify([currentLevel]));
          }
          const finalStorage = await AsyncStorage.getItem("completedLevels")
          console.log(finalStorage)
        } catch (e) {
          console.log("local storage error")
        }

      }

      checkLevelDefaults();

    }
  }, [gameIsOver, youWin])

  const adjustBorderCount = () => {
    // get the new incremented border counts
    // const temp = boxInfo.getNewBorderCounts(borders, boxIndex);
    const temp = boxInfo.getBorderCounts(board);
    // set the new borders
    setBorders({ ...temp });
  }

  const adjustConnectedBoxes = (index) => {
    const temp = boxInfo.getNewConnectedBoxes(connectedBoxes, index);
    setConnectedBoxes({ ...temp });
  }

  const setComputerLastClickedLine = (state) => {
    (playerTurn === "second") ? setComputerLastLineClick(state) : setComputerLastLineClick(false);
  }

  const setLineColor = (indexes, sides) => {
    const boxIndex = indexes[0];
    const box = boxInfo.getBoxNameByIndex(boxIndex);
    const boxSide = sides[0];

    const adjBoxIndex = indexes[1];
    const adjBox = boxInfo.getBoxNameByIndex(adjBoxIndex);
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
      const whosTurn = boxInfo.getTheNextPlayerTurn(playerTurn);
      setPlayerTurn(whosTurn);
    } else {

      const boxIndex = clickedIndexes[0];
      const box = (boxIndex || boxIndex === 0) ? boxInfo.getBoxNameByIndex(boxIndex) : false;
      const boxLineCount = box ? borders[box] : false;
      const boxAboutToScored = boxLineCount === 3;

      const adjBoxIndex = clickedIndexes[1];
      const adjBox = (adjBoxIndex || adjBoxIndex === 0) ? boxInfo.getBoxNameByIndex(adjBoxIndex) : false;
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
    const temp = boxInfo.getTheNewBordAfterClickingSide(board, boxName, side);
    setBoard(temp);
  }

  const clickBorder = (side, index, player) => {
    if(player !== playerTurn) return console.log("not your turn");

    const boxName = boxInfo.getBoxNameByIndex(index);
    const boxObj = boxInfo.getBoxObjByBoxName(board, boxName);
    const { disabled, borders } = boxObj;
    if(!boxInfo.isClickable(borders, side)) return console.log("line not clickable");

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(board, side, index);
    const adjBoxName = boxInfo.getBoxNameByIndex(adjacentBoxIndex);

    if(boxInfo.hasFootRestriction(footIndexes, index, adjacentBoxIndex)){
      console.log(index)
      return console.log("foot restriction")
    };

    setSide(boxName, side);

    const updatedConnections = [];
    (!boxInfo.isDisabled(board, boxName)) && updatedConnections.push(index);

    if(adjacentBoxIndex || adjacentBoxIndex === 0){
      setSide(adjBoxName, adjBoxSide);
      (!boxInfo.isDisabled(board, adjBoxName)) && updatedConnections.push(adjacentBoxIndex);
    }

    updatedConnections.length && adjustConnectedBoxes(updatedConnections);
    adjustBorderCount();

    const hasScored = boxInfo.hasScored(board, index, adjacentBoxIndex);
    if((board[boxName] && !boxInfo.isDisabled(board, boxName)) ||
      (board[adjBoxName] && !boxInfo.isDisabled(board, adjBoxName))){
      setLineColor([index, adjacentBoxIndex], [side, adjBoxSide]);
      setTurnPlayer(hasScored, [index, adjacentBoxIndex]);
    }
  }

  const keys = Object.keys(board);

  const setExplosionBoxes = (boxIndex) => {
    if(!activeBomb.length) return;

    const temp = boxInfo.getLightPattern(explosions, activeBomb, boxIndex);
    setExplodingBoxes(temp);

    const temp2 = {...board}
    const temp3 = {...whoClickedTheLineTracker}
    const temp4 = {...borders}
    const temp5 = {...connectedBoxes}
    const temp6 = [...footIndexes]

    const bombType = explosionSides[activeBomb][`box${boxIndex}`];
    for(let side in bombType){
      const sideIndex = boxInfo.getSideIndex(side);
      bombType[side].forEach(rowBoxIndex => {
        temp2[`box${rowBoxIndex}`].borders[side] = null;
        temp3[`box${rowBoxIndex}`][side] = null;
        temp5[`box${rowBoxIndex}`][sideIndex] = boxInfo.connectedBoxesObjRef[`box${rowBoxIndex}`][sideIndex];
        whoScored[`box${rowBoxIndex}`] = null;

        let newCount = temp4[`box${rowBoxIndex}`];
        if(newCount > 0){
          newCount = temp4[`box${rowBoxIndex}`]--;
        }
        temp4[`box${rowBoxIndex}`] = newCount;

        const boxName = boxInfo.getBoxNameByIndex(rowBoxIndex);
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

  const changeLevel = (level, levelText) => {
    if(levelText !== "x" || !levelText){
      setBoard(util.breakRefAndCopy(gameBoards[level]));
      setPlayerTurn("first");
      setBorders(util.breakRefAndCopy(boxInfo.borderCount));
      setConnectedBoxes(util.breakRefAndCopy(boxInfo.connectedBoxesObj));
      setWhoScored(util.breakRefAndCopy(whoScoredObj));
      setWhoClickedTheLineTracker(util.breakRefAndCopy(whoClickedTheLine));
      setComputerLastLineClick(false);
      setYourScore(0);
      setComputerScore(0);
      setGameOver(false);
      setExplodingBoxes({});
      setActiveBomb("");
      setFootIndexes(util.breakRefAndCopy(footSquares[level]));
      setGameIsOver(false);
      setYouWin(false);
      setBoardTotalScore(util.getBoardScore(gameBoards[level]));
      setCurrentLevel(level);
      if(settings.informationBoard.includes(levelText)){
        setShowInformativeScreen(true);
        const type = settings.informationText[`${levelText}`];
        setInformationType(type)
      }
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
    setShowBoard(true);
  }

  const motivationPage = () => {
    setShowHomeScreen(false);
    setShowMotivationScreen(true);
  }

  const storePage = () => {
    setShowHomeScreen(false);
    setShowStoreScreen(true);
  }

  const homePage = () => {
    setShowHomeScreen(true);
    setShowBoard(false);
  }

  const backFromMotivationPage = () => {
    setShowHomeScreen(true);
    setShowMotivationScreen(false);
  }

  const closeInformationScreen = () => {
    setShowInformativeScreen(false);
  }

  const startingColor = 0;
  const endingColor = 1;
  let colorAnimation = new Animated.Value(startingColor);

  const animateScoreBoard = () => {
    Animated.timing(
      colorAnimation,
      { toValue: endingColor, duration: 1000 }
    ).start(() => {
      Animated.timing(
        colorAnimation,
        { toValue: startingColor, duration: 1000 }
      ).start(animateScoreBoard);
    });
  }
  animateScoreBoard();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 'transparent', '#b57800' ]
  });

  const setDefaultBombs = async () => {
    const allStorage = await AsyncStorage.getAllKeys();
    if(allStorage.includes("completedLevels")){
      const completedLevels = JSON.parse(await AsyncStorage.getItem("completedLevels"));
      if(completedLevels.includes(currentLevel)){
        setCurrentLevelBombs([])
      } else {
        setCurrentLevelBombs(settings.levelDefaultBombs[currentLevel])
      }
    } else {
      setCurrentLevelBombs(settings.levelDefaultBombs[currentLevel])
    }
  }

  setDefaultBombs();

  return (<View style={styles.boardStyle(height, width)}>
    <Image
      style={styles.imgStyle(height, width)}
      source={images.background}
    />
    {showBoard &&
      <GameScoreBoard
        yourScore={yourScore}
        computerScore={computerScore}
        playerTurn={playerTurn}
      />
    }
    {showBoard && keys.map((data, index) => {
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
      } = boxInfo.getSidesInfo(board, index);
      const box = boxInfo.getBoxNameByIndex(index)
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
        key={index} />)})
      }
    {showBoard && <View style={styles.bombSection(width)} >
      {currentLevelBombs.map((data, index) => {
        let image;
        let style;
        if(data === "cheetah"){
          image = images.cheetahImg;
          style = explosionStlyes.generalBombStlyes();
        } else if (data === "panther") {
          image = images.pantherImg
          style = explosionStlyes.generalBombStlyes();
        } else if (data === "makeda") {
          image = images.makedaImg;
          style = explosionStlyes.makedaBombStyle();
        }
        return (<TouchableOpacity key={index} onPress={() => selectBomb(data)}>
          <Animated.View style={activeBomb === data ? explosionStlyes.selectedBomb(letterColor) : {}}>
            <Image
              style={style}
              source={image}
            />
          </Animated.View>
        </TouchableOpacity>)
      })}
    </View>}
    {showBoard && <TouchableOpacity onPress={settings.isDebuggingMode ? () => { checkComputerMove() } : () => {}}>
      <Text style={{...styles.openLevel, letterSpacing: 5}}>Levels</Text>
    </TouchableOpacity>}
    {showBoard && <View style={styles.levelSelectSection(width)}>
      {settings.levels.map((data, index) => {
        const levelStyle = (data === "x") ? styles.lockedLevel : styles.openLevel;
        const levelText = (data === "x") ? "x" : (index + 1);
        return (<TouchableOpacity key={index} onPress={changeLevel.bind(this, `level${index + 1}`, levelText)}>
          <View style={styles.levelBox}>
            <View style={levelStyle}>
              <Text style={levelStyle}>{levelText}</Text>
            </View>
          </View>
        </TouchableOpacity>)
      })}
      <TouchableOpacity onPress={homePage}>
        <View style={styles.homeBox}>
          <View style={styles.openLevel}>
            <Text style={styles.openLevel}>Home</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>}

    {gameIsOver && !youWin &&
      <GameOver
        restartGame={restartGame}
      />}

    {gameIsOver && youWin &&
      <YouWin
        restartGame={restartGame}
        nextLevel={nextLevel}
        isLastBoard={currentLevel === settings.finalLevel}
      />}

    {showHomeScreen && <HomeScreen
      startGame={startGame}
      motivationPage={motivationPage}
      storePage={storePage}/>}

    {showMotivationScreen && <MotivationScreen
      backFromMotivationPage={backFromMotivationPage}
    />}

    {showStoreScreen && <StoreScreen
    />}

    {showInformativeScreen && <InformativeScreen
      facts={informationType}
      close={closeInformationScreen}
    />}

    {viewPointer && <Pointer
      bottomPosition={100}
      leftPosition={100}
    />}

  </View>)

}

export default Game;
