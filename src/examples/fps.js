// EXAMPLE OF SIMPLE GAMEOBJECT
import { GameObject } from '../classes/index.js';

/** METHODS */
const calculateFPS = gObj => secondsPassed => {
    gObj.updates.fps = Math.round(1 / secondsPassed);
};

const drawFPS = gObj => context => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText('FPS: ' + gObj.updates.fps, 10, 30);
};

/** CLASS */
export const FPS = (params) => {
    /** PARAMS SANITIZATION */
    const { id } = params || {};

    /** STATE */
    const state =  { updates: { fps: 0 } }; // State could be managed better.

    /** METHODS */
    const draw = (gObj) => (game) => drawFPS(gObj)(game.context);
    const update = (gObj) => (delta, game) => calculateFPS(gObj)(delta);

    /** CLASS */
    return GameObject({ id, draw, update }, state); 
}

export default FPS