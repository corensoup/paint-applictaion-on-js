const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const colorPanel = document.querySelector('#color-panel')
const toolPanel = document.querySelector('#tool-panel')

canvas.height = HEIGHT
canvas.width = WIDTH

let clickedCord = {}
let savedData = {}

const rect = canvas.getBoundingClientRect()
ctx.lineCap = 'round'

fillCanvasToWhite(ctx, canvas)

loadDataFromLocalStorage(ctx)

canvas.onmousedown = evt => {
    clickedCord = getCordOnCanvas(evt)
    canvas.onmousemove = evt => mouseMoveLogic(evt)
    document.onmouseup = evt => mouseUpLogic(evt)
}
colorPanel.onclick = evt => {
    if(!!evt.target.dataset.color) {
        color = evt.target.dataset.color
        ctx.strokeStyle = color
    }
}
toolPanel.onclick = evt => {
    ctx.lineWidth = size
    switch(evt.target.dataset.tool) {
        case 'brush':
            tool = 'brush'
            break;
        case 'line':
            tool = 'line'
            break;
        case 'eraser':
            fillCanvasToWhite(ctx, canvas)
            saveDataToLocalStorage(ctx)
            break;
        case 'rectangle':
            tool = 'rectangle'
            break;
        case 'triangle':
            tool = 'triangle'
            break;
        case 'circle':
            tool = 'circle'
            break;
        case 'fill':
            tool = 'fill'
            canvas.onclick = evt => {
                floodFill(evt.clientX - rect.left, evt.clientY - rect.top, hexToRGBcolors[color])
                canvas.onclick = null
            }
            saveDataToLocalStorage(ctx)
            break;
        case 'download':
            downloadImageFromCanvas()
            break;
    }
}
function getCordOnCanvas(evt) {
    savedData = ctx.getImageData(0,0, canvas.clientWidth, canvas.clientHeight)
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}
function mouseUpLogic(evt) {
    canvas.onmousemove = null
    document.onmouseup = null
    saveDataToLocalStorage(ctx)
}
function mouseMoveLogic(evt) {
    const currentPos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
        dx: evt.movementX,
        dy: evt.movementY
    }
    switch(tool) {
        case 'brush':
            brushTool(currentPos)
            break;
        case 'line':
            drawShapes('line', savedData, clickedCord, currentPos )
            break;
        case 'rectangle':
            drawShapes('rectangle', savedData, clickedCord, currentPos)
            break;
        case 'triangle':
            drawShapes('triangle', savedData, clickedCord, currentPos)
            break;
        case 'circle':
            drawShapes('circle', savedData, clickedCord, currentPos)
            break;
    }
}


//TODO: Анимация цветов
//TODO: Перевод цветов в словарь !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: Оптимизировать рисование фигур !!!!!!!!!!!!!!!!!!!!!!!!
//TODO: Настроить размер канваса !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: LocalStorage для рисунков !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: Скачивание рисунка !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: Поменять курсор
//TODO: Поменять иконки
//TODO: Сtrl + Z