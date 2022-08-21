// EXAMPLE OF SIMPLE GAMEOBJECT
import { GameObject } from '../game.js';

/** METHODS */
const updateFPS = g_obj => delta => {
    g_obj.state.fps = Math.round(1 / delta);
};

const drawFPS = g_obj => context => {
    const { fps, x, y } = g_obj.state;

    context.fillStyle = 'black';
    context.fillRect(x, y, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText('FPS: ' + fps, x + 10, y + 30);
};

/** CLASS */
export const FPS = (params) => {
    const g_obj = GameObject(params); 

    const { x = 0, y = 0 } = params || {};

    /** STATE */
    g_obj.state = { fps: 0, x, y };

    /** METHODS */
    g_obj.draw = () => drawFPS(g_obj)(g_obj.game.context);
    g_obj.update = (delta) => updateFPS(g_obj)(delta);

    return g_obj;
}

export default FPS