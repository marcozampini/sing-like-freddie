export default class StyleSelection {
  constructor(styles, styleTemplate, stylesSection) {
    this.styles = styles
    this.styleTemplate = styleTemplate
    this.stylesSection = stylesSection
  }

  loadStyles() {
    for (let i = 0; i < this.styles.length; i++) {
      const clone = this.styleTemplate.content.cloneNode(true)
      clone.querySelector('.freddie-style').dataset.id = i
      clone.querySelector('h3').textContent = this.styles[i].name
      clone.querySelector(
        'img'
      ).src = `./style/images/freddies/${this.styles[i].avatarUrl}`
      clone.querySelector('.activation-key').textContent =
        this.styles[i].activationKey.toUpperCase()
      this.stylesSection.appendChild(clone)
    }
  }
}
