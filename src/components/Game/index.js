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
  getTheNewBordAfterClickingSide
} from "./util/BoxInfo";
import {
  computerMove
} from "./util/ComputerLogic"

const Game = () => {

  const [board, setBoard] = useState(gameBoards.level1)
  const [playerTurn, setPlayerTurn] = useState("first");
  const [borders, setBorders] = useState(borderCount);
  const [connectedBoxes, setConnectedBoxes] = useState(connectedBoxesObj);

  useEffect(() => {
    // only use logic if it is the computer turn. ex: "second" player
    if(playerTurn !== "second") return;
    // get a move for the computer to make
    const move = computerMove(borders, connectedBoxes, board);
    // if the move is empty the computer has no moves
    if(!move) return;
    // if the move is not empty make a computer mover
    clickBorder(move.side, move.index);
  }, [borders, connectedBoxes]); // this is only used if borders or connectedBoxes change

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

  const setTurnPlayer = (hasScored) => {
    // set the turn to the next play turn if there was not a score
    if(!hasScored){
      const whosTurn = getTheNextPlayerTurn(playerTurn);
      setPlayerTurn(whosTurn);
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

    if(adjacentBoxIndex){
      setSide(adjBoxName, adjBoxSide);
      adjustBorderCount([index, adjacentBoxIndex]);
      const updatedConnectionsForAdjBox = [];
      (!board[boxName].disabled) && updatedConnectionsForAdjBox.push(adjacentBoxIndex);
      (!board[adjBoxName].disabled) && updatedConnectionsForAdjBox.push(index);
      adjustBorderCountForAdjBox(updatedConnectionsForAdjBox);
    } else {
      adjustBorderCount([index]);
    }

    const hasScored = boxInfo.hasScored(board, index, adjacentBoxIndex);
    if((board[boxName] && !board[boxName].disabled) ||
      (board[adjBoxName] && !board[adjBoxName].disabled)){
      setTurnPlayer(hasScored);
    }
  }

  const keys = Object.keys(board);

  return (<View style={styles.boardStyle}>
    {keys.map((data, index) => {
      const {
        disabled,
        borders
      } = board[data];
      const isDisabled = disabled || false;
      const hasScored = borders.top && borders.right && borders.bottom && borders.left;
      return (<GameBlock
        isDisabled={isDisabled}
        borders={borders}
        clickBorder={clickBorder}
        index={index}
        hasScored={hasScored}
        key={index} />)
    })}
  </View>)

}

export default Game;
