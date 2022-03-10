export default function pitchdetect(targetFreq) {
  let score = 0
  let isCapturing = false

  let commentsOnPitchElement = document.querySelector('.comments-on-note')
  let liveScoreElement = document.querySelector('.live-score')

  var analyser,
    animationLoop,
    audioContext,
    buf,
    canvas,
    compressor,
    freq,
    getPitch,
    minSamples,
    noteFromPitch,
    pitchDisplay,
    samples,
    updatePitch,
    visualize,
    zoom

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  audioContext = new window.AudioContext()

  compressor = audioContext.createDynamicsCompressor()

  analyser = audioContext.createAnalyser()

  canvas = document.querySelector('canvas')

  /*canvas.width = document.body.clientWidth

  canvas.height = document.body.clientHeight*/

  samples = 512

  pitchDisplay = document.querySelector('.pitch-note')

  freq = document.querySelector('.pitch-frequency')

  minSamples = 0

  buf = new Float32Array(1024)

  getPitch = function (buffer) {
    var bestCorrelation,
      bestOffset,
      correlation,
      correlations,
      foundGoodCorrelation,
      i,
      lastCorrelation,
      maxSamples,
      offset,
      rms,
      shift,
      size,
      val
    size = buffer.length
    maxSamples = Math.floor(size / 2)
    bestOffset = -1
    bestCorrelation = 0
    rms = 0
    foundGoodCorrelation = false
    correlations = []
    i = 0
    while (i < size) {
      val = buffer[i]
      rms += val * val
      i++
    }
    rms = Math.sqrt(rms / size)
    if (rms < 0.01) {
      return '-'
    }
    lastCorrelation = 1
    offset = minSamples
    while (offset < maxSamples) {
      correlation = 0
      i = 0
      while (i < maxSamples) {
        correlation += Math.abs(buffer[i] - buffer[i + offset])
        i++
      }
      correlation = 1 - correlation / maxSamples
      correlations[offset] = correlation
      if (correlation > 0.9 && correlation > lastCorrelation) {
        foundGoodCorrelation = true
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation
          bestOffset = offset
        }
      } else if (foundGoodCorrelation) {
        shift =
          (correlations[bestOffset + 1] - correlations[bestOffset - 1]) /
          correlations[bestOffset]
        return audioContext.sampleRate / (bestOffset + 8 * shift)
      }
      lastCorrelation = correlation
      offset++
    }
    if (bestCorrelation > 0.01) {
      return audioContext.sampleRate / bestOffset
    }
    return -1
  }

  noteFromPitch = function (frequency) {
    var noteNum, noteStrings
    noteStrings = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ]
    noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
    noteNum = Math.round(noteNum) + 69
    return noteStrings[noteNum % 12]
  }

  updatePitch = function () {
    var normalize, pitch
    normalize = function (num) {
      var multiplier
      multiplier = Math.pow(10, 2)
      return Math.round(num * multiplier) / multiplier
    }
    analyser.getFloatTimeDomainData(buf)
    pitch = getPitch(buf)
    if (pitch > 0) {
      pitchDisplay.innerHTML = noteFromPitch(pitch)
    }
    if (targetFreq - pitch >= 0) {
      if (pitch / targetFreq > 0.98) {
        commentsOnPitchElement.textContent = `You're doing great!`
        score = score + 500
        liveScoreElement.textContent = score
      } else if (pitch / targetFreq > 0.97) {
        commentsOnPitchElement.textContent = `You're doing good!`
        score = score + 100
        liveScoreElement.textContent = score
      } else {
        commentsOnPitchElement.textContent = `Too low!`
      }
    } else {
      if (targetFreq / pitch > 0.98) {
        commentsOnPitchElement.textContent = `You're doing great!`
        score = score + 500
        liveScoreElement.textContent = score
      } else if (targetFreq / pitch > 0.97) {
        commentsOnPitchElement.textContent = `You're doing good!`
        score = score + 100
        liveScoreElement.textContent = score
      } else {
        commentsOnPitchElement.textContent = 'Too high!'
      }
    }
    return (freq.innerHTML = Math.round(pitch * 100) / 100)
  }

  visualize = function () {
    var drawContext, h, i, normalize, points, w
    normalize = function (y, h) {
      return (y / 256) * h
    }
    w = canvas.width
    h = canvas.height
    points = new Uint8Array(samples)
    analyser.getByteTimeDomainData(points)
    drawContext = canvas.getContext('2d')
    drawContext.clearRect(0, 0, w, h)
    drawContext.strokeStyle = '#C2EDF2'
    drawContext.lineWidth = 3
    drawContext.lineCap = 'butt'
    drawContext.lineJoin = 'miter'
    drawContext.beginPath()
    drawContext.moveTo(0, normalize(points[0], h))
    i = 0
    while (i < points.length) {
      drawContext.lineTo((w * (i + 1)) / points.length, normalize(points[i], h))
      i++
    }
    return drawContext.stroke()
  }

  animationLoop = function () {
    visualize()
    updatePitch()
    if (isCapturing) {
      window.requestAnimationFrame(animationLoop)
    }
  }

  navigator.getUserMedia(
    {
      audio: true,
    },
    function (stream) {
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(compressor)
      compressor.connect(analyser)
      isCapturing = true
      return window.requestAnimationFrame(animationLoop)
    },
    function (e) {
      return console.log('error: ' + e)
    }
  )
  setTimeout(() => {
    isCapturing = false
    audioContext.close()
  }, 5000)
}
