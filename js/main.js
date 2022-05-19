import StyleSelection from './classes/style-selection.js'
import Game from './classes/game.js'
import Round from './classes/round.js'
import data from './data.js'

// Ask the permission to use the mic to the browser
navigator.mediaDevices.getUserMedia({
  audio: {
    mandatory: {
      googEchoCancellation: 'false',
      googAutoGainControl: 'false',
      googNoiseSuppression: 'false',
      googHighpassFilter: 'false',
    },
    optional: [],
  },
})

// Variable creation
let game
let songsIndexes
let round

// Sections, elements and templates
const playerNameElement = document.querySelector('#your-name #player-name')
let playerName

const styleTemplate = document.querySelector('#style-template')
const stylesSection = document.querySelector('#your-style .styles')
const freddieStyles = new StyleSelection(
  data.styles,
  styleTemplate,
  stylesSection
)
freddieStyles.loadStyles()
let freddieStyle

const roundSection = document.querySelector('#round')
const liveScoreElement = document.querySelector('#round .live-score')

const scoresTable = document.querySelector('#scores table')
const gameScoreElement = document.querySelector('#scores .game-score')

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
        playerName = playerNameElement.value.toUpperCase()
        game.playerName = playerName
        window.location.hash = '#your-style'
      }
      break
    case '#your-style':
      if (event.key === 'g') {
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
      if (event.key === 'g') {
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
        round.loadRound(roundSection, playerName, freddieStyle)
        window.location.hash = '#round'

        round.playRound(roundSection)
        game.rounds.push(round)
      }
      break
    case '#round':
      if (event.key === 'g') {
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      if (event.key === 'n') {
        round.score = parseInt(liveScoreElement.textContent)
        if (game.currentRound + 1 < data.songs.length) {
          game.currentRound++
          window.location.hash = '#ready-to-play'
        } else {
          game.calculateAndLoadScores(scoresTable, gameScoreElement)
          window.location.hash = '#scores'
        }
      }
      if (event.key === 's') {
        round.score = parseInt(liveScoreElement.textContent)
        game.calculateAndLoadScores(scoresTable, gameScoreElement)
        window.location.hash = '#scores'
      }
      break
    case '#scores':
      if (event.key === 'g') {
        game = new Game(data.songs)
        songsIndexes = game.randomSongsOrder()
        window.location.hash = '#your-name'
        playerNameElement.focus()
      }
      break
  }
})
