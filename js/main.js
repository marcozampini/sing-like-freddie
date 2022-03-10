import SongsSelection from './classes/songs-selection.js'
import StyleSelection from './classes/style-selection.js'
import Game from './classes/game.js'
import Round from './classes/round.js'
import data from './data.js'

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
const songsSelection = new SongsSelection(data.songs)
const songsIndexes = songsSelection.songsOrder(data.songs)

const playerNameElement = document.querySelector('#your-name #player-name')
let playerName = ''

let styleTemplate = document.querySelector('#style-template')
let stylesSection = document.querySelector('#your-style .styles')
const freddieStyles = new StyleSelection(
  data.styles,
  styleTemplate,
  stylesSection
)
freddieStyles.loadStyles()
let freddieStyle = null

let game = new Game()
let round

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
        game.playerName = playerName
        window.location.hash = '#your-style'
      }
      break
    case '#your-style':
      if (event.key === '0') {
        window.location.hash = ''
      }
      for (let i = 0; i < data.styles.length; i++) {
        if (event.key === data.styles[i].activationKey) {
          freddieStyle = data.styles[i]
          game.freddieStyle = freddieStyle
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
          game.currentRound,
          data.songs[songsIndexes[game.currentRound]]
        )
        console.log(round)
        round.loadRound()
        window.location.hash = '#round'

        round.playRound()
        game.rounds.push(round)
      }
      break
    case '#round':
      if (event.key === '0') {
        window.location.hash = ''
      }
      if (event.key === 'n') {
        game.currentRound++
        window.location.hash = '#ready-to-play'
      }
      if (event.key === 's') {
        window.location.hash = '#scores'
      }
      if (event.key === 'Enter') {
      }
      break
    case '#scores':
      if (event.key === '0') {
        game = new Game()
        window.location.hash = '#your-name'
      }
      break
  }
})
