import SongsSelection from './classes/songs-selection.js'
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
const songsSelection = new SongsSelection(config.songs)
const songsIndexes = songsSelection.songsOrder(config.songs)

const playerNameElement = document.querySelector('#your-name #player-name')
let playerName = ''

let styleTemplate = document.querySelector('#style-template')
let stylesSection = document.querySelector('#your-style .styles')
const freddieStyles = new StyleSelection(
  config.styles,
  styleTemplate,
  stylesSection
)
freddieStyles.loadStyles()
let freddieStyle = ''

const roundTemplate = document.querySelector('#round-template')
const scoresSection = document.querySelector('#scores')

let game
let round
let currentRound = 0

// Keys
document.addEventListener('keydown', (event) => {
  switch (window.location.hash) {
    case '':
    case '#':
    case '#landing':
      if (event.key === 'Enter') {
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      break
    case '#your-name':
      if (event.key === 'Enter' && playerNameElement.value != '') {
        playerName = playerNameElement.value
        window.location.hash = '#your-style'
      }
      break
    case '#your-style':
      if (event.key === '0') {
        window.location.hash = ''
      }
      for (let i = 0; i < config.styles.length; i++) {
        if (event.key === config.styles[i].activationKey) {
          freddieStyle = config.styles[i]
          game = new Game(playerName, freddieStyle)
          window.location.hash = '#ready-to-play'
        }
      }

      break
    case '#ready-to-play':
      if (event.key === '0') {
        window.location.hash = ''
      }
      if (event.key === 'Enter') {
        round = new Round(
          currentRound,
          config.songs[songsIndexes[currentRound]],
          roundTemplate,
          scoresSection
        )
        console.log(round)
        round.loadRound()
        window.location.hash = '#round'

        round.playRound()
        game.rounds.push(round)
        console.log('game', game)
      }
      break
    case '#round':
      if (event.key === '0') {
        window.location.hash = ''
      }
      if (event.key === 'n') {
        currentRound++
        window.location.hash = '#ready-to-play'
      }
      if (event.key === 's') {
        window.location.hash = '#scores'
      }
      if (event.key === 'Enter') {
        console.log('enter in round')
      }
      break
    case '#scores':
      if (event.key === '0') {
        window.location.hash = ''
      }
      break
  }
})
