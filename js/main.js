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
      playerNameElement.focus()
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
          const game = new Game(playerName, freddieStyle)
          const round = new Round(
            0,
            config.songs[songsIndexes[0]],
            roundTemplate,
            scoresSection
          )
          window.location.hash = '#ready-to-play'
        }
      }

      break
    case '#ready-to-play':
      if (event.key === '0') {
        window.location.hash = ''
      }

      round.loadRound()
      setTimeout(() => {
        window.location.hash = '#round-0'
        round.playRound()
        game.rounds.push()
      }, 5000)
    case '#round-0':
      if (event.key === '0') {
        window.location.hash = ''
      }
      break
  }
})
