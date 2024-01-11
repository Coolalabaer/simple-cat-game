'use strict';

import { movingAreaMinX, movingAreaMaxX, movingAreaMaxY, keys, canvasHeight } from "./settings.js";

class Cat {
    constructor() {
        this.playerImage = new Image();
        this.playerImage.src = 'img/gamecat.png';
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.playerState = 'sit';

        this.velocity = {
            x: 0,
            y: 0
        };
        this.gravity = .5;

        this.staggerFrames = 10;
        this.spriteAnimations = [];

        this.animationStates = [
            {
                name: 'right',
                frames: 3
            },
            {
                name: 'left',
                frames: 3
            },
            {
                name: 'sit',
                frames: 3
            },
        ];

        this.animationStates.forEach((state, index) => {
            let frames = {
                loc: [],
            }
            for (let j = 0; j < state.frames; j++) {
                let positionX = j * this.spriteWidth;
                let positionY = index * this.spriteHeight;
                frames.loc.push({ x: positionX, y: positionY });
            };
            this.spriteAnimations[state.name] = frames;
        });

        this.canvasPositionX = movingAreaMaxX / 2;
        this.canvasPositionY = movingAreaMaxY;
        this.movingSpeed = 5;

        this.base = {
            x: this.canvasPositionX + (.5 * this.spriteWidth),
            y: this.canvasPositionY + (.65 * this.spriteHeight)
        }

    };

    move = (direction) => {
        switch (direction) {
            case 'right':
                if (this.canvasPositionX < movingAreaMaxX) {
                    this.playerState = 'right';
                    this.velocity.x = this.movingSpeed;
                    this.canvasPositionX += this.velocity.x;
                }
                else this.canvasPositionX = movingAreaMaxX;
                break;
            case 'left':
                if (this.canvasPositionX > movingAreaMinX) {
                    this.playerState = 'left';
                    this.velocity.x = this.movingSpeed;
                    this.canvasPositionX -= this.velocity.x;
                }
                else this.canvasPositionX = movingAreaMinX;
                break;
            case 'jump':
                if (this.velocity.y > -1 && this.velocity.y < 1) {
                    this.velocity.y -= 10;
                    this.canvasPositionY += (this.velocity.y / 1000 * canvasHeight);
                }
                break;
            case 'dont':
                this.playerState = 'sit';
                break;
        }
    };
}

export const cat = new Cat();

document.addEventListener('keydown', ({ code }) => {
    if (keys.left.codes.includes(code)) keys.left.pressed = true;
    else if (keys.right.codes.includes(code)) keys.right.pressed = true;
    else if (keys.jump.codes.includes(code)) cat.move('jump');
});

document.addEventListener('keyup', ({ code }) => {
    if (keys.left.codes.includes(code)) keys.left.pressed = false;
    else if (keys.right.codes.includes(code)) keys.right.pressed = false;
});