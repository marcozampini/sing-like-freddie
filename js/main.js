import Game from './classes/game.js'
import Round from './classes/round.js'
import songs from './config.js'

// Ask the permission to use the mic to the browser
/*navigator.mediaDevices.getUserMedia({
  audio: {
    mandatory: {
      googEchoCancellation: 'false',
      googAutoGainControl: 'false',
      googNoiseSuppression: 'false',
      googHighpassFilter: 'false',
    },
    optional: [],
  },
})*/

// Options
const freddieStyles = [
  { name: 'Break free style', imageUrl: 'freddie-break-free' },
  { name: '1986 style', imageUrl: 'freddie-1986' },
]

// Sections, elements and templates
const playerNameElement = document.querySelector('#options #player-name')
const numberOfRoundsElement = document.querySelector('#options #number-rounds')
const freddieStyleElement = document.querySelector(
  '#options input[name="freddie-style"]:checked'
)
const roundTemplate = document.querySelector('#round-template')
const scoresSection = document.querySelector('#scores')

// Keys
document.addEventListener('keydown', (event) => {
  switch (window.location.hash) {
    case '':
    case '#':
    case 'landing':
      if (event.key === 'Enter') {
        window.location.hash = '#options'
      }
      break

    // Set up options, create the game and play the first round
    case '#options':
      if (event.key === 'Enter') {
        let playerName = playerNameElement.value
        let numberOfRounds = numberOfRoundsElement.value
        let freddieStyle = freddieStyleElement.value

        const game = new Game(playerName, numberOfRounds, freddieStyle)

        // Only one song for the moment
        let chosenSongIndex = Math.floor(Math.random() * songs.length)
        const song = songs[chosenSongIndex]

        const round = new Round(1, song, roundTemplate, scoresSection)
        round.loadRound()

        window.location.hash = 'round-1'

        round.playRound()
        game.rounds.push()
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      break
    case '#round-1':
      if (event.key === 'Enter') {
        window.location.hash = '#round-1'
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      if (event.key === 'o') {
        window.location.hash = '#options'
      }
      break
  }
})
