'use strict';

import { canvasWidth, canvasHeight, characterSize, movingAreaMaxY, keys, interactives } from "./settings.js";
import { cat } from "./character.js";
import { livingroom } from "./room.js";

const playerCanvas = document.querySelector('#player');
const playerCtx = playerCanvas.getContext('2d');
playerCanvas.width = canvasWidth;
playerCanvas.height = canvasHeight;
let gameFrame = 0;


const fallDown = () => {
    let fallToHeight = movingAreaMaxY + cat.spriteHeight;
    let leftBottomCatCorner = cat.canvasPositionY + cat.spriteHeight;

    livingroom.platforms.forEach(platform => {
        if (
            platform.position.x < cat.canvasPositionX &&
            (platform.position.x + platform.width) > cat.canvasPositionX &&
            leftBottomCatCorner <= platform.position.y
        ) {
            fallToHeight = platform.position.y;
        };
    });

    if ((leftBottomCatCorner + cat.velocity.y) < fallToHeight) {
        cat.canvasPositionY += cat.velocity.y;
        cat.velocity.y += cat.gravity;
    } else {
        cat.velocity.y = 0;
        cat.canvasPositionY = fallToHeight - cat.spriteHeight;
    }
};

export const animate = () => {
    if (keys.left.pressed) cat.move('left');
    else if (keys.right.pressed) cat.move('right');
    else cat.move('dont');

    fallDown();

    playerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    let position = Math.floor(gameFrame / cat.staggerFrames) % cat.spriteAnimations[cat.playerState].loc.length;
    let frameX = cat.spriteWidth * position;
    let frameY = cat.spriteAnimations[cat.playerState].loc[position].y;

    playerCtx.drawImage(cat.playerImage, frameX, frameY, cat.spriteWidth, cat.spriteHeight, cat.canvasPositionX, cat.canvasPositionY, characterSize, characterSize);

    document.addEventListener('keypress', ({ code }) => {
        if (keys.interact.codes.includes(code)) {
            interactives.forEach(element => {
                if (element.interactionBlocker == false) {
                    let catCenterX = cat.canvasPositionX + cat.spriteWidth / 2;
                    let catCenterY = cat.canvasPositionY + cat.spriteHeight / 2;
                    let top = element.posY - .1 * canvasHeight;
                    let bottom = element.posY + element.sizeY + .1 * canvasHeight;
                    let left = element.posX - .1 * canvasWidth;
                    let right = element.posX + element.sizeX + .1 * canvasWidth;
                    if (
                        catCenterX > left &&
                        catCenterX < right &&
                        catCenterY > top &&
                        catCenterY < bottom &&
                        element.interactionBlocker == false) {
                        element.interact();
                    };
                }
            });
        };
    });

    gameFrame++;
    requestAnimationFrame(animate);
};



