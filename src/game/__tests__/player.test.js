import {Player, ComputerPlayer, HumanPlayer} from '../player';

describe('player logic', () => {
  test.only('computer provides random coords', () => {
    let myHumanPlayer = HumanPlayer('Human', 5);
    let myAiPlayer = ComputerPlayer('Computer', 5);
    let humanGameboard = myHumanPlayer.getGameboard();

    for(let i = 0; i < 20; i++) {
      expect(myAiPlayer.getNextCoords(humanGameboard).x).toBeLessThan(5);
      expect(myAiPlayer.getNextCoords(humanGameboard).y).toBeLessThan(5);
    }
  });
})

