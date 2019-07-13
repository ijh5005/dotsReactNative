export const util = {
  breakRefAndCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  getBoardScore: (board) => {
    let totalScore = 0;
    for(let box in board){
      if(!board[box].disabled){
        totalScore++;
      }
    }
    return totalScore;
  },
}
