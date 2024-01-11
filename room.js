'use strict';

import { canvasWidth, canvasHeight } from "./settings.js";

const backgroundCanvas = document.querySelector('#background');
const backgroundCtx = backgroundCanvas.getContext('2d');
backgroundCanvas.width = canvasWidth;
backgroundCanvas.height = canvasHeight;

class Room {
    constructor(src, platforms) {
        this.src = src;
        this.platforms = platforms;
    }

    draw = () => {
        const bgd = new Image();
        bgd.addEventListener('load', () => {
            backgroundCtx.drawImage(bgd, 0, 0, canvasWidth, canvasHeight);
        });
        bgd.src = this.src;
    };
}

class Platform {
    constructor(x, y, width, height) {
        this.position = {
            x: x,
            y: y
        };
        this.width = width;
        this.height = height;
    }
}

// Ich habe leider die ganze Zeit meine Plattformen relativ zum falschen Punkt angelegt und jetzt funktioniert es nur für eine Fenstergröße... Bug to fix
export const livingroom = new Room('img/gameroom.jpg', [
    new Platform(.1 * canvasWidth, .843 * canvasHeight, .1 * canvasWidth, .02 * canvasHeight),
    new Platform(.25 * canvasWidth, .675 * canvasHeight, .275 * canvasWidth, .02 * canvasHeight),
    new Platform(.525 * canvasWidth, .565 * canvasHeight, .41 * canvasWidth, .02 * canvasHeight)
]);

// So habe ich es noch versucht zu lösen, aber leider ein bisschen erfolglos... bisher!
// const canvasCenter = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2
// };
// export const livingroom = new Room('img/gameroom.jpg', [
//     new Platform(   canvasCenter.x - .4 * canvasWidth, 
//                     canvasCenter.y - .2 * canvasHeight, 
//                     .1 * canvasWidth, 
//                     .02 * canvasHeight),
//     new Platform(   canvasCenter.x - .22 * canvasWidth, 
//                     canvasCenter.y - .37 * canvasHeight, 
//                     .275 * canvasWidth, 
//                     .02 * canvasHeight),
//     new Platform(   canvasCenter.x + .05 * canvasWidth, 
//                     canvasCenter.y - .5 * canvasHeight, 
//                     .41 * canvasWidth, 
//                     .02 * canvasHeight)
// ]);