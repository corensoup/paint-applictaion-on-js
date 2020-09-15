const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = HEIGHT
canvas.width = WIDTH

ctx.lineCap = 'round'
ctx.lineWidth = size

fillCanvasToWhite()
loadDataFromLocalStorage()

document.addEventListener('keydown', evt => {
    if (evt.keyCode == 90 && evt.ctrlKey) makeUndoFromStack()
})
canvas.onmousedown = evt => {
    clickedCord = getCordOnCanvas(evt)
    canvas.onmousemove = evt => mouseMoveLogic(evt)
    document.onmouseup = evt => mouseUpLogic(evt)
}
colorPanel.onclick = evt => {
    if(!!evt.target.dataset.color) {
        changeActiveColor(evt.target)
        color = evt.target.dataset.color
        ctx.strokeStyle = color
    }
}
toolPanel.onclick = evt => {
    if(!!evt.target.dataset.tool) changeActiveTool(evt.target)
    switch(evt.target.dataset.tool) {    
        case 'brush':
            tool = 'brush'
            break;
        case 'line':
            tool = 'line'
            break;
        case 'eraser':
            fillCanvasToWhite()
            saveDataToLocalStorage()
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
                if(tool !== 'fill') {
                    canvas.onclick = null
                } else {
                    floodFill(evt.clientX - rect.left, evt.clientY - rect.top, hexToRGBcolors[color])
                    saveDataToLocalStorage()
                }
            }
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
    undoStackPush()
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
            drawShapes('line', savedData, clickedCord, currentPos)
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