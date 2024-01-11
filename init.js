'use strict';

import { interactives } from "./settings.js";
import { animate } from "./animation.js";
import { createInteractives } from "./interactive.js";
import { livingroom } from "./room.js";

window.addEventListener("load", () => {
    livingroom.draw();
    createInteractives();
    interactives.forEach(element => element.draw());
    animate();
});