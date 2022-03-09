import StyleSelection from './classes/style-selection.js'
import Game from './classes/game.js'
import Round from './classes/round.js'
import config from './config.js'

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

// Sections, elements and templates
const playerNameElement = document.querySelector('#your-name #player-name')
let playerName = ''

const freddieStyles = new StyleSelection(config.styles)
freddieStyles.loadStyles()
let freddieStyle = ''

const roundTemplate = document.querySelector('#round-template')
const scoresSection = document.querySelector('#scores')

// Keys
document.addEventListener('keydown', (event) => {
  switch (window.location.hash) {
    case '':
    case '#':
    case 'landing':
      if (event.key === 'Enter') {
        window.location.hash = '#your-name'
      }
      break
    case '#your-name':
      document.querySelector('#player-name').focus()
      if (event.key === 'Enter') {
        playerName = playerNameElement.value
        window.location.hash = '#your-style'
      }
      break
    case '#your-style':
      if (event.key === 'a' || event.key === 'b') {
        window.location.hash = '#ready-to-play'
      }
      break
    case '#ready-to-play':
      const game = new Game(playerName, freddieStyle)
      setTimeout(() => {
        window.location.hash = '#round-0'
      }, 5000)
    // Set up options, create the game and play the first round
    case '#options':
      if (event.key === 'Enter') {
        let numberOfRounds = numberOfRoundsElement.value
        //let freddieStyle = freddieStyleElement.value
        let freddieStyle = 'freddie-1986'

        const songsIndexes = game.songsOrder(config.songs)

        const round = new Round(
          0,
          config.songs[songsIndexes[0]],
          roundTemplate,
          scoresSection
        )
        round.loadRound()

        window.location.hash = 'round-0'

        round.playRound()
        game.rounds.push()
      }
      if (event.key === 'l') {
        window.location.hash = ''
      }
      break
    case '#round-0':
      if (event.key === 'Enter') {
        window.location.hash = '#round-0'
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
