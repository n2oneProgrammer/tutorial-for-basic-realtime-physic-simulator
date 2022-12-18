import {main} from "./main.js";

export default class Ball {
    constructor(position, radius, color) {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(
            this.position.x + main.width / 2,
            this.position.y + main.height / 2,
            this.radius,
            0,
            2 * Math.PI,
            false
        )
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = "black"
        ctx.stroke()

    }
}
