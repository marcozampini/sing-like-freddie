let currentSlide = 0
const totalSlides = 8
const demoSlide = 5
document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'Enter':
      if (currentSlide + 1 < totalSlides) {
        currentSlide++
        let newHash = 'slide-' + currentSlide
        window.location.hash = newHash
      }
      break
    case 'Backspace':
      if (currentSlide > 0) {
        currentSlide--
        let newHash = 'slide-' + currentSlide
        window.location.hash = newHash
      }
      break
    case 'g':
      if (currentSlide === demoSlide) {
        window.open('https://www.marcozampini.it')
      }
      break
    case '0':
      currentSlide = 0
      window.location.hash = ''
      break
  }
  /*
  if (event.key === 'Enter') {

  }
  if (event.key === 'Backspace') {

  }
  if (event.key === 'g') {
    console.log('ciao')
    
  }*/
})
