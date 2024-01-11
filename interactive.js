'use strict';

import { canvasHeight, canvasWidth, interactives, movingAreaMaxY } from "./settings.js";
import { cat } from "./character.js";

const interactivesCanvas = document.querySelector('#interactiveElements');
const interactivesCtx = interactivesCanvas.getContext('2d');
interactivesCanvas.width = canvasWidth;
interactivesCanvas.height = canvasHeight;

class IntObj {
    interactionBlocker = false;

    constructor(name, src, room, sizeX, sizeY, posX, posY, interaction) {
        this.image = document.querySelector(`#${src}`);
        this.name = name;
        this.room = room;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.posX = posX;
        this.posY = posY;
        this.interaction = interaction;
    }

    draw = () => {
        interactivesCtx.drawImage(this.image, this.posX, this.posY, this.sizeX, this.sizeY);
    };

    interact = () => {
        if (this.interaction == 'makefall') {
            this.interactionBlocker = true;
            let velocity = 0;
            const animation = () => {
                if ((this.posY - this.sizeY) < (.95 * movingAreaMaxY)) {
                    this.posY += velocity;
                    velocity += cat.gravity;
                    interactivesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                    interactives.forEach(element => element.draw());
                    requestAnimationFrame(animation);
                };
            }
            animation();
        }
        if (this.name == 'key') {
            if ((interactives.find(element => element.name == 'flowers').posY) > (.9 * movingAreaMaxY)) {
                this.interactionBlocker = true;
                interactives.splice(interactives.indexOf(this), 1);
                interactivesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                interactives.forEach(element => element.draw());
                interactives.find(element => element.name == 'fireex').interactionBlocker = true;
            };
        };
        if (this.name == 'door') {
            if (interactives.find(element => element.name == 'key') == undefined) {
                this.interactionBlocker = true;
                interactives.splice(interactives.indexOf(this), 1);
                interactives.push(new IntObj('open', 'open', 'livingroom', (.08 * canvasHeight), (.304 * canvasHeight), (.608 * canvasWidth), (.68 * canvasHeight), ''));
                interactivesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                interactives.forEach(element => element.draw());
                setTimeout(() => { interactives.find(element => element.name == 'fireex').interactionBlocker = false; }, 200);
            }
        }
        if (this.name == 'fireex') {
            this.interactionBlocker = true;
            interactives.splice(interactives.indexOf(this), 1);
            interactivesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            interactives.forEach(element => element.draw());
            interactives.find(element => element.name == 'hole').interactionBlocker = true;
        };
        if (this.name == 'fire') {
            if (interactives.find(element => element.name == 'fireex') == undefined) {
                this.interactionBlocker = true;
                interactives.splice(interactives.indexOf(this), 1);
                interactivesCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                interactives.forEach(element => element.draw());
                setTimeout(() => { interactives.find(element => element.name == 'hole').interactionBlocker = false; }, 200);
            };
        };
        if (this.name == 'hole') {
            if (interactives.find(element => element.name == 'fire') == undefined) {
                this.interactionBlocker = true;
                location.reload();
                alert('Yey, you did it! Here\'s a cookie for your effort: 🍪');
                return;
            };
        };
    };
}

export const createInteractives = () => {
    interactives.push(new IntObj('key', 'key', 'livingroom', (.12 * canvasHeight), (.12 * canvasHeight), (.797 * canvasWidth), (.42 * canvasHeight), 'take'));
    interactives.push(new IntObj('flowers', 'flowers', 'livingroom', (.12 * canvasHeight), (.12 * canvasHeight), (.795 * canvasWidth), (.409 * canvasHeight), 'makefall'));
    interactives.push(new IntObj('fireex', 'fireex', 'livingroom', (.15 * canvasHeight), (.25 * canvasHeight), (.62 * canvasWidth), (.69 * canvasHeight), 'take'));
    interactives.push(new IntObj('door', 'door', 'livingroom', (.2 * canvasHeight), (.262 * canvasHeight), (.608 * canvasWidth), (.68 * canvasHeight), 'use'));
    interactives.push(new IntObj('hole', 'hole', 'livingroom', (.155 * canvasHeight), (.125 * canvasHeight), (.4 * canvasWidth), (.753 * canvasHeight), 'use'));
    interactives.push(new IntObj('fire', 'fire', 'livingroom', (.31 * canvasHeight), (.14 * canvasHeight), (.357 * canvasWidth), (.74 * canvasHeight), 'use'));
    interactives.push(new IntObj('clock', 'clock', 'livingroom', (.12 * canvasHeight), (.12 * canvasHeight), (.33 * canvasWidth), (.53 * canvasHeight), 'makefall'));
};