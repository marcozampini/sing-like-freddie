export default class StyleSelection {
  constructor(styles) {
    this.styles = styles
  }

  loadStyles() {
    let styleTemplate = document.querySelector('#style-template')
    let stylesSection = document.querySelector('#your-style .styles')
    console.log(stylesSection)
    for (let i = 0; i < this.styles.length; i++) {
      const clone = styleTemplate.content.cloneNode(true)
      clone.querySelector('h3').textContent = this.styles[i].name
      clone.querySelector(
        'img'
      ).src = `./style/images/freddies/${this.styles[i].avatarUrl}`
      clone.querySelector(
        'p'
      ).textContent = `Type ${this.styles[i].activationKey}`
      stylesSection.appendChild(clone)
    }
    /*
  const clone = styleTemplate.content.cloneNode(true)
  clone.querySelector('section').setAttribute('id', `round-${this.id}`)
  document.body.insertBefore(clone, this.scoresSection)*/
  }
}
/*
<template id="style-template">
<div class="freddie-style">
  <h3>Style name</h3>
  <picture>
    <img src="./style/images/freddies/freddie-1986.png" alt="Style name">
  </picture>
  <p>Type Key to choose</p>
</div>
</template>
*/
