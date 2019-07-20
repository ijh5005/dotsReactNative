import { boxInfo } from "../BoxInfo";
import { sounds } from "../../Sounds";

export const computerMove = (borders, connectedBoxes, board, footIndexes, showScreenText) => {

  let choice = false;
  const threeBorderOptions = boxInfo.getThreeBorderOptions(borders, connectedBoxes, board, footIndexes);
  if(threeBorderOptions.length){
    choice = threeBorderOptions[0];
    if(boxInfo.getNoBorderOptions(borders, connectedBoxes, board, footIndexes).length > 0){
      showScreenText("HA! GOT EM")
      sounds.gotem.play();
    }
  } else {
    const noBorderOptions = boxInfo.getNoBorderOptions(borders, connectedBoxes, board, footIndexes);
    if(noBorderOptions.length){
      choice = boxInfo.getRandomBoxChoice(noBorderOptions);
    } else {
      const oneBorderOptions = boxInfo.getOneBorderOptions(borders, connectedBoxes, board, footIndexes);
      if(oneBorderOptions.length){
        choice = boxInfo.getRandomBoxChoice(oneBorderOptions);
      } else {
        const edgeBoxOptions = boxInfo.getEdgeBoxOptions(borders, connectedBoxes, board, footIndexes);
        if(edgeBoxOptions.length){
          choice = boxInfo.getRandomBoxChoice(edgeBoxOptions);
        } else {
          let isGameOver = true;
          for(let i in borders){
            if(borders[i] !== 4) isGameOver = false;
          }
          if(!isGameOver) choice = boxInfo.getPathOptions(borders, connectedBoxes, board, footIndexes);
        }
      }
    }
  }

  if(!choice.side) return false;

  return choice;

}
