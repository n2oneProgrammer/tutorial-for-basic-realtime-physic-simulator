import Vector2 from "./Vector2.js";

function drawVector(ctx, startPos, vector, color, name = "", repairPos = new Vector2(0, 0)) {
    if (vector.len() === 0) return;
    let headLen = 60;
    let endPoint = startPos.add(vector);
    let angle = Math.atan2(vector.y, vector.x);
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headLen * Math.cos(angle - Math.PI / 4), endPoint.y - headLen * Math.sin(angle - Math.PI / 4));
    ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(endPoint.x - headLen * Math.cos(angle + Math.PI / 4), endPoint.y - headLen * Math.sin(angle + Math.PI / 4));
    ctx.strokeStyle = color;
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.font = '90px serif';
    ctx.fillStyle = color
    let pos = startPos.add(vector.mul(0.5)).add(repairPos)
    ctx.fillText(name, pos.x, pos.y);
}

export {drawVector}
