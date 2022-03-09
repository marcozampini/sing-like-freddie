export default class Game {
  constructor(playerName, numberOfRounds, freddieStyle) {
    this.playerName = playerName
    this.numberOfRounds = numberOfRounds
    this.freddieStyle = freddieStyle
    this.rounds = []
    this.score = 0
  }
  playGame() {}
}
