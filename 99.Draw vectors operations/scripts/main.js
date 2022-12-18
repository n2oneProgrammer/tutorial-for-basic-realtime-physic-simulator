import Vector2 from "./Vector2.js";
import {drawVector} from "./DrawUtils.js";

class Main {
    static instance;

    constructor() {
        Main.instance = this;
        this.canvasDOM = document.getElementById("screen");
        this.ctx = this.canvasDOM.getContext("2d");
        this.ctx.imageSmoothingEnabled = false
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
            this.loop();
        });
    }

    loop() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        let a = new Vector2(100, -300);
        let b = new Vector2(700, -400);
        let startPoint = new Vector2(this.width / 2-400, this.height / 2+400);
        drawVector(this.ctx, startPoint, a, "red", "a", new Vector2(-50, 0));
        drawVector(this.ctx, startPoint.add(a), b, "green", "b", new Vector2(-60, -10));
        drawVector(this.ctx, startPoint, a.add(b), "yellow", "a+b", new Vector2(20, 50));
    }

    download() {
        let MIME_TYPE = "image/png";
        let imgURL = this.canvasDOM.toDataURL(MIME_TYPE);

        let dlLink = document.createElement('a');
        dlLink.download = "img.png";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
}

let main = new Main();
main.loop();
document.getElementById("download").addEventListener("click", () => main.download())
export {main};
