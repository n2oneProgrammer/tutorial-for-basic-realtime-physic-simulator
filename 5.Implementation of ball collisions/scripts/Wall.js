export default class Wall {
    constructor(distance, normal) {
        this.name = "wall";
        this.distance = distance;
        this.normal = normal.normalize();
    }

    calcEnergy() {
        return 0
    }

    checkCollision() {

    }

    drawUtils(ctx) {
    }

    update(deltaTime) {
    }

    draw(ctx) {

    }
}
