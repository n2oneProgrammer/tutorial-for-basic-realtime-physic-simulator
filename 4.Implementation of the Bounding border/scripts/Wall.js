export default class Wall {
    constructor(distance, normal) {
        this.name = "wall";
        this.distance = distance;
        this.normal = normal.normalize();
    }
    checkCollision(){

    }
    drawUtils(ctx) {
    }

    update(deltaTime) {
    }

    draw(ctx) {

    }
}
