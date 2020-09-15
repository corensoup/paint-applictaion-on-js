const findDistance = (clickedCord, currentCord) => {
    let exp1 = Math.pow(currentCord.x - clickedCord.x, 2)
    let exp2 = Math.pow(currentCord.y - currentCord.y, 2)
    return Math.sqrt(exp1 + exp2)
}

const saveDataToLocalStorage = () => {
    savedData = canvas.toDataURL()
    localStorage.setItem('drawImage', savedData)
}

const loadDataFromLocalStorage = () => {
    savedData = localStorage.getItem('drawImage')
    if (!!savedData) {
        const canvasPic = new Image();
        canvasPic.src = savedData
        canvasPic.onload = evt => ctx.drawImage(canvasPic, 0, 0);
    }
}

const downloadImageFromCanvas = () => {
    const dataURL = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "myImage.jpg";
    link.click();
}

const fillCanvasToWhite = () => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

const undoStackPush = () => {
    step_undo++
    if(step_undo < undoStack.length) undoStack.length = step_undo
    undoStack.push(canvas.toDataURL())
}

const makeUndoFromStack = () => {
    if (step_undo > 0) {
        step_undo--;
        const canvasPic = new Image()
        canvasPic.src = undoStack[step_undo]
        canvasPic.onload = evt => {
            ctx.drawImage(canvasPic, 0, 0)
            saveDataToLocalStorage()
        }
    }
}

const changeActiveTool = (currentTool) => {
    toolPanelItems.forEach(el => {
        el.classList.remove('active')
    });
    currentTool.parentNode.classList.add('active')
}

const changeActiveColor = (currentColor) => {
    colorPanelItems.forEach(el => {
        el.classList.remove('active')
    })
    currentColor.classList.add('active')
}

