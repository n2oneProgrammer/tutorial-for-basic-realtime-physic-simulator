function drawVector(ctx, startPos, vector, color) {
    let headLen = 10;
    let endPoint = startPos.add(vector);
    let angle = Math.atan2(vector.y, vector.x);
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headLen * Math.cos(angle - Math.PI / 4), endPoint.y - headLen * Math.sin(angle - Math.PI / 4));
    ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headLen * Math.cos(angle + Math.PI / 4), endPoint.y - headLen * Math.sin(angle + Math.PI / 4));
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}

export {drawVector}
