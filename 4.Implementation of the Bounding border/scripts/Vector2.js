export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mul(a) {
        return new Vector2(this.x * a, this.y * a);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    lenSqt() {
        return this.x * this.x + this.y * this.y;
    }

    len() {
        return Math.sqrt(this.lenSqt());
    }

    normalize() {
        let len = this.len();
        return new Vector2(this.x / len, this.y / len);
    }
}
