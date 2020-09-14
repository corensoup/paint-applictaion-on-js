const brushTool = (currentCord) => {
    ctx.beginPath()
    ctx.moveTo(currentCord.x, currentCord.y)
    ctx.lineTo(currentCord.x - currentCord.dx, currentCord.y - currentCord.dy)
    ctx.stroke()
}

const drawShapes = (tool, savedData, clickedCord, currentCord) => {
    ctx.putImageData(savedData, 0,0)
    ctx.beginPath()
    switch(tool){
        case 'line':
            ctx.moveTo(clickedCord.x, clickedCord.y)
            ctx.lineTo(currentCord.x, currentCord.y)
            break;
        case 'rectangle':
            ctx.rect(clickedCord.x, clickedCord.y, currentCord.x - clickedCord.x, currentCord.y - clickedCord.y)
            break;
        case 'triangle':
            ctx.moveTo(clickedCord.x + (currentCord.x - clickedCord.x) / 2, clickedCord.y)
            ctx.lineTo(clickedCord.x, currentCord.y)
            ctx.lineTo(currentCord.x, currentCord.y)
            break;
        case 'circle':
            let distance = findDistance(clickedCord, currentCord);
            ctx.arc(clickedCord.x, clickedCord.y, distance, 0, 2 * Math.PI, false)
            break;
    }
    ctx.closePath()
    ctx.stroke()
}

/*Алгоритм заливки не мой */
const floodFill = (startX, startY, fillColor) => {
    const getPixelPos = (x, y) => {
        return (y * canvas.width + x) * 4;
    };
    const matchStartColor = (data, pos, startColor)  => {
        return (
            data[pos]   === startColor.r &&
            data[pos+1] === startColor.g &&
            data[pos+2] === startColor.b &&
            data[pos+3] === startColor.a
        );
    };
    const colorPixel = (data, pos, color) =>  {
        data[pos] = color.r || 0;
        data[pos+1] = color.g || 0;
        data[pos+2] = color.b || 0;
        data[pos+3] = color.hasOwnProperty("a") ? color.a : 255;
    };
    var dstImg = ctx.getImageData(0,0,canvas.width,canvas.height);
    var dstData = dstImg.data;
    
    var startPos = getPixelPos(startX, startY);
    var startColor = {
        r: dstData[startPos],
        g: dstData[startPos+1],
        b: dstData[startPos+2],
        a: dstData[startPos+3]
    };
    var todo = [[startX,startY]];
    
    while (todo.length) {
        var pos = todo.pop();
        var x = pos[0];
        var y = pos[1];    
        var currentPos = getPixelPos(x, y);
        
        while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
        currentPos -= canvas.width * 4;
        }
        
        currentPos += canvas.width * 4;
        ++y;
        var reachLeft = false;
        var reachRight = false;
        
        while((y++ < canvas.height-1) && matchStartColor(dstData, currentPos, startColor)) {
        
        colorPixel(dstData, currentPos, fillColor);
        
        if (x > 0) {
            if (matchStartColor(dstData, currentPos-4, startColor)) {
            if (!reachLeft) {
                todo.push([x-1, y]);
                reachLeft = true;
            }
            }
            else if (reachLeft) {
            reachLeft = false;
            }
        }
        
        if (x < canvas.width-1) {
            if (matchStartColor(dstData, currentPos+4, startColor)) {
            if (!reachRight) {
                todo.push([x+1, y]);
                reachRight = true;
            }
            }
            else if (reachRight) {
            reachRight = false;
            }
        }
    
        currentPos += canvas.width * 4;
        }
    }
    ctx.putImageData(dstImg,0,0);
};