'use strict';

export const canvasWidth = window.innerWidth;
export const canvasHeight = canvasWidth/2.2223;
export const characterSize = canvasHeight/5;

export const movingAreaMinX = 0 * canvasWidth;
export const movingAreaMaxX = 1 * canvasWidth;
export const movingAreaMinY = 0 * canvasHeight;
export const movingAreaMaxY = .78 * canvasHeight;

export const keys = {
    left: {
        codes: ['KeyA', 'ArrowLeft'],
        pressed: false
    },
    right: {
        codes: ['KeyD', 'ArrowRight'],
        pressed: false
    },
    jump: {
        codes: ['KeyW', 'ArrowUp', 'Space']
    },
    interact: {
        codes: ['KeyE', 'KeyX']
    }
}

export const interactives = []