const findDistance = (clickedCord, currentCord) => {
    let exp1 = Math.pow(currentCord.x - clickedCord.x, 2)
    let exp2 = Math.pow(currentCord.y - currentCord.y, 2)
    return Math.sqrt(exp1 + exp2)
}

const saveDataToLocalStorage = (ctx) => {
    savedData = canvas.toDataURL()
    localStorage.setItem('drawImage', savedData)
}

const loadDataFromLocalStorage = (ctx) => {
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

const fillCanvasToWhite = (ctx, context) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}