import Ball from "./Ball.js";
import Vector2 from "./Vector2.js";

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
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.objects.forEach(o => o.draw(this.ctx));
        requestAnimationFrame(() => this.loop());
    }
}

let main = new Main();
main.addObject(new Ball(new Vector2(0, 0), 40, "red"))
main.loop();
export {main};
