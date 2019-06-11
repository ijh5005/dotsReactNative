import {
  getRandomBoxChoice,
  getEdgeBoxOptions,
  getOneBorderOptions,
  getNoBorderOptions,
  getThreeBorderOptions,
  getPathOptions
} from "../BoxInfo";

export const computerMove = (borders, connectedBoxes, board) => {

  let choice = false;
  const threeBorderOptions = getThreeBorderOptions(borders, connectedBoxes, board);
  if(threeBorderOptions.length){
    choice = threeBorderOptions[0];
  } else {
    const noBorderOptions = getNoBorderOptions(borders, connectedBoxes, board);
    if(noBorderOptions.length){
      choice = getRandomBoxChoice(noBorderOptions);
    } else {
      const oneBorderOptions = getOneBorderOptions(borders, connectedBoxes, board);
      if(oneBorderOptions.length){
        choice = getRandomBoxChoice(oneBorderOptions);
      } else {
        const edgeBoxOptions = getEdgeBoxOptions(borders, connectedBoxes, board);
        if(edgeBoxOptions.length){
          choice = getRandomBoxChoice(edgeBoxOptions);
        } else {
          choice = getPathOptions(borders, connectedBoxes, board);
        }
      }
    }
  }

  return choice;

}
