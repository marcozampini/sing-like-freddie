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

// Variable creation
let game
let songsIndexes
let round

// Sections, elements and templates
const playerNameElement = document.querySelector('#your-name #player-name')
let playerName

let styleTemplate = document.querySelector('#style-template')
let stylesSection = document.querySelector('#your-style .styles')
const freddieStyles = new StyleSelection(
  data.styles,
  styleTemplate,
  stylesSection
)
freddieStyles.loadStyles()
let freddieStyle

// Keys
document.addEventListener('keyup', (event) => {
  switch (window.location.hash) {
    case '':
    case '#':
    case '#landing':
      if (event.key === 'Enter') {
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
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
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
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
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      if (event.key === 'Enter') {
        round = new Round(
          game.currentRound,
          data.songs[songsIndexes[game.currentRound]]
        )
        round.loadRound()
        window.location.hash = '#round'

        round.playRound()
        game.rounds.push(round)
      }
      break
    case '#round':
      if (event.key === '0') {
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      if (event.key === 'n') {
        game.currentRound++
        window.location.hash = '#ready-to-play'
      }
      if (event.key === 's') {
        window.location.hash = '#scores'
      }
      break
    case '#scores':
      if (event.key === '0') {
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      break
  }
})
