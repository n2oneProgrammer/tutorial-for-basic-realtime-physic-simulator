import {main} from "./main.js";
import Vector2 from "./Vector2.js";
import {drawVector} from "./DrawUtils.js";

export default class Ball {
    constructor(mass, position, radius, color, velocity = null) {
        this.name = "Ball"
        this.mass = mass
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.lastVelocity = velocity || new Vector2(0, 0);
        this.velocity = velocity || new Vector2(0, 0);
    }

    calcEnergy() {
        return this.mass * main.gravity.y * (3 / 2 * main.height - this.position.y) + this.mass * this.velocity.y * this.velocity.y / 2;
    }

    drawUtils(ctx) {
        drawVector(ctx, this.position.add(new Vector2(main.width / 2, main.height / 2)), this.velocity, "green");
    }

    update(deltaTime) {
        this.position = this.position.add(this.velocity.mul(deltaTime).add(main.gravity.mul(deltaTime * deltaTime / 2)));
        this.velocity = this.velocity.add(main.gravity.mul(deltaTime));
        this.lastVelocity = this.velocity;
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

    reflectionWithBall(ball) {
        let u1 = this.lastVelocity.mul((this.mass - ball.mass) / (this.mass + ball.mass))
        let u2 = ball.lastVelocity.mul((2 * ball.mass) / (this.mass + ball.mass))
        return u1.add(u2);
    }

    checkCollision(objects) {
        objects.forEach(o => {
            if (o === this) return;
            let result = {isCollide: false};
            if (o.name === "wall") {
                result = this.checkCollisionCircleWall(o);
                if (result.isCollide) {
                    let pos1 = this.position.project(result.normal)
                    let pos2 = result.normal.mul(o.distance);
                    this.position = this.position.sub(pos1.sub(pos2).add(result.normal.mul(this.radius)));
                    this.velocity = this.reflection(result.normal);
                }
            }
            if (o.name === "Ball") {
                result = this.checkCollisionCircleCircle(o);
                if (result.isCollide) {
                    let distVect = this.position.sub(o.position)
                    let dist = distVect.len();
                    let penetration = (this.radius + o.radius) - dist;
                    this.position = this.position.add(distVect.normalize().mul(penetration / 2))
                    o.position = o.position.sub(distVect.normalize().mul(penetration / 2))

                    this.velocity = this.reflectionWithBall(o, result.normal);
                }
            }
        })
    }

    checkCollisionCircleCircle(circle) {
        let distanceVector = circle.position.sub(this.position);
        if (distanceVector.lenSqt() > (this.radius + circle.radius) * (this.radius + circle.radius)) {
            return {
                isCollide: false
            }
        }
        let normalDistance = distanceVector.normalize();
        return {
            isCollide: true,
            normal: normalDistance
        }
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
