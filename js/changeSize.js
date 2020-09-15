const toolSize = document.querySelector('.tool-size')
const sizeIcon = document.querySelector('.tool-size i')
const panelSize = document.querySelector('#panel-size')
const sizeInput = document.querySelector('#panel-size input')

toolSize.addEventListener('click', evt => {
    panelSize.classList.toggle('activeSize')
})

sizeInput.addEventListener('input', evt => {
    sizeIcon.style.fontSize = `${evt.target.value}px`
    size = +evt.target.value
    ctx.lineWidth = size
})