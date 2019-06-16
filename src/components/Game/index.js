import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import GameBlock from "./GameBlock";
import { gameBoards } from "./GameBoards";
import {
  boxInfo,
  borderCount,
  connectedBoxesObj,
  getBoxNameByIndex,
  getBoxSideBySide,
  getBoxObjByBoxName,
  isClickable,
  getNewBorderCounts,
  getNewConnectedBoxes,
  getTheNextPlayerTurn,
  getTheNewBordAfterClickingSide,
  isDisabled
} from "./util/BoxInfo";
import {
  computerMove
} from "./util/ComputerLogic";
import {
  whoClickedTheLine
} from "./util/WhoClicked";
import {
  whoScoredObj
} from "./util/WhoScored";

const Game = () => {

  const [board, setBoard] = useState(gameBoards.level5)
  const [playerTurn, setPlayerTurn] = useState("first");
  const [borders, setBorders] = useState(borderCount);
  const [connectedBoxes, setConnectedBoxes] = useState(connectedBoxesObj);
  const [whoScored, setWhoScored] = useState(whoScoredObj);
  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(whoClickedTheLine);
  const [click, setClick] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // only use logic if it is the computer turn. ex: "second" player
      if(playerTurn !== "second") return;
      // get a move for the computer to make
      const move = computerMove(borders, connectedBoxes, board);
      // if the move is empty the computer has no moves
      if(!move) return;
      // if the move is not empty make a computer mover
      clickBorder(move.side, move.index);
    }, 100)
  }, [playerTurn, whoScored]); // this is only used if borders or connectedBoxes change

  // styles for the game
  const styles = {
    boardStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }
  }

  const adjustBorderCount = (boxIndex) => {
    // get the new incremented border counts
    const temp = getNewBorderCounts(borders, boxIndex);
    // set the new borders
    setBorders({ ...temp });
  }

  const adjustBorderCountForAdjBox = (index) => {
    const temp = getNewConnectedBoxes(connectedBoxes, index);
    setConnectedBoxes({ ...temp });
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

  const clickBorder = (side, index) => {
    const boxName = getBoxNameByIndex(index);
    const boxSide = getBoxSideBySide(side);
    const boxObj = getBoxObjByBoxName(board, boxName);
    const { disabled, borders } = boxObj;
    if(!isClickable(borders, side)) return console.log("line not clickable");
    setSide(boxName, side);

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(board, side, index);
    const adjBoxName = getBoxNameByIndex(adjacentBoxIndex);
    const adjSide = getBoxSideBySide(adjBoxSide);

    if(adjacentBoxIndex || adjacentBoxIndex === 0){
      setSide(adjBoxName, adjBoxSide);
      adjustBorderCount([index, adjacentBoxIndex]);
      const updatedConnectionsForAdjBox = [];

      (!isDisabled(board, boxName)) && updatedConnectionsForAdjBox.push(adjacentBoxIndex);
      (!isDisabled(board, adjBoxName)) && updatedConnectionsForAdjBox.push(index);
      adjustBorderCountForAdjBox(updatedConnectionsForAdjBox);
    } else {
      adjustBorderCount([index]);
    }

    const hasScored = boxInfo.hasScored(board, index, adjacentBoxIndex);
    if((board[boxName] && !isDisabled(board, boxName)) ||
      (board[adjBoxName] && !isDisabled(board, adjBoxName))){
      setTurnPlayer(hasScored, [index, adjacentBoxIndex]);
    }
  }

  const keys = Object.keys(board);

  return (<View style={styles.boardStyle}>
    {keys.map((data, index) => {
      const {
        disabled,
        borders
      } = board[data];
      const box = getBoxNameByIndex(index)
      const isDisabledBox = disabled || false;
      const hasScored = borders.top && borders.right && borders.bottom && borders.left;
      return (<GameBlock
        isDisabledBox={isDisabledBox}
        borders={borders}
        clickBorder={clickBorder}
        index={index}
        hasScored={hasScored}
        scored={whoScored[box]}
        setWhoScored={setWhoScored} // score code the scored boxes, practice on the board and deal with the "disabled of undefined error: this is probably due to a box being referenced that isn't on the board"
        whoClickedTheLineTracker={whoClickedTheLineTracker}
        key={index} />)
    })}
  </View>)

}

export default Game;
