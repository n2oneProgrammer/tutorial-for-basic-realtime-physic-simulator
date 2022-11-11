import Ball from "./Ball.js";
import Vector2 from "./Vector2.js";
import {drawVector} from "./DrawUtils.js";

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
        this.gravity = new Vector2(0, 40);
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

    loop() {
        if (this.lastTime != null) {
            let deltaTime = (Date.now() - this.lastTime) / 1000;
            this.ctx.clearRect(0, 0, this.width, this.height)
            drawVector(this.ctx, new Vector2(20, 20), this.gravity, "green");
            this.ctx.font = '20px serif';
            this.ctx.fillStyle = "green"
            this.ctx.fillText('g', 30, 60);
            this.objects.forEach(o => o.update(deltaTime));
            this.objects.forEach(o => o.draw(this.ctx));
            this.objects.forEach(o => o.drawUtils(this.ctx));
        }

        this.lastTime = Date.now()
        requestAnimationFrame(() => this.loop());
    }
}

let main = new Main();
main.addObject(new Ball(new Vector2(0, 0), 40, "red", new Vector2(150, -50)))
main.loop();
export {main};
