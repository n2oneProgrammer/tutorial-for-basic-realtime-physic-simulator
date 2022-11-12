import {main} from "./main.js";
import Vector2 from "./Vector2.js";
import {drawVector} from "./DrawUtils.js";

export default class Ball {
    constructor(position, radius, color, velocity = null) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity || new Vector2(0, 0);
    }

    drawUtils(ctx) {
        drawVector(ctx, this.position.add(new Vector2(main.width / 2, main.height / 2)), this.velocity, "green");
    }

    update(deltaTime) {
        this.position = this.position.add(this.velocity.mul(deltaTime));
        this.velocity = this.velocity.add(main.gravity.mul(deltaTime));
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "black"
        ctx.arc(this.position.x + main.width / 2, this.position.y + main.height / 2, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.stroke()
    }

    reflection(normal) {
        return this.velocity.sub(normal.normalize().mul(2 * this.velocity.dot(normal.normalize())));
    }

    checkCollision(objects) {
        objects.forEach(o => {
            if (o === this) return;
            let result = {isCollide: false};
            if (o.name === "wall") {
                result = this.checkCollisionCircleWall(o);
            }
            if (result.isCollide) {
                this.velocity = this.reflection(result.normal);
            }
        })
    }

    checkCollisionCircleWall(wall) {
        let dot = this.position.dot(wall.normal);
        let distance = dot - wall.distance;
        let closestPoint = this.position.sub(wall.normal.mul(distance));
        let distSq = this.position.sub(closestPoint).lenSqt();
        if (distSq < this.radius * this.radius) {
            return {
                isCollide: true,
                normal: wall.normal
            }
        }
        return {
            isCollide: false
        }
    }
}
