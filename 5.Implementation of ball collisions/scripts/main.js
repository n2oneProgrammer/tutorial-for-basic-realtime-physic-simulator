import Ball from "./Ball.js";
import Vector2 from "./Vector2.js";
import {drawVector} from "./DrawUtils.js";
import Wall from "./Wall.js";

class Main {
    static instance;

    constructor() {
        Main.instance = this;
        this.canvasDOM = document.getElementById("screen");
        this.ctx = this.canvasDOM.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvasDOM.width = window.innerWidth;
        this.canvasDOM.height = window.innerHeight;
        this.gravity = new Vector2(0, 100);
        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvasDOM.width = window.innerWidth;
            this.canvasDOM.height = window.innerHeight;
        });
        this.objects = [];
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    energy = 0;

    loop() {
        if (this.lastTime != null) {
            let deltaTime = (Date.now() - this.lastTime) / 1000;
            this.ctx.clearRect(0, 0, this.width, this.height)
            drawVector(this.ctx, new Vector2(20, 20), this.gravity, "green");
            this.ctx.font = '20px serif';
            this.ctx.fillStyle = "green"
            this.ctx.fillText('g', 30, 60);
            this.objects.forEach(o => o.update(deltaTime));
            this.objects.forEach(o => o.checkCollision(this.objects));
            this.objects.forEach(o => o.draw(this.ctx));
            this.objects.forEach(o => o.drawUtils(this.ctx));
            let energy = 0;
            this.objects.forEach((o) => energy += o.calcEnergy())
            console.log(energy - this.energy)
            this.energy = energy;
        }
        this.lastTime = Date.now()
        requestAnimationFrame(() => this.loop());
    }
}

let main = new Main();
main.addObject(new Ball(10, new Vector2(0, -200), 40, "red", new Vector2(0, 80)))
main.addObject(new Ball(20, new Vector2(0, 0), 80, "blue", new Vector2(0, 0)))
main.addObject(new Wall(main.width / 2, new Vector2(-1, 0)))
main.addObject(new Wall(main.width / 2, new Vector2(1, 0)))
main.addObject(new Wall(main.height / 2, new Vector2(0, 1)))
main.addObject(new Wall(main.height / 2, new Vector2(0, -1)))
main.loop();
export {main};
