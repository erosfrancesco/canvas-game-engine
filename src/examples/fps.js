// EXAMPLE OF SIMPLE GAMEOBJECT
import { GameObject } from '../game.js';

/** METHODS */
const updateFPS = g_obj => delta => {
    g_obj.state.fps = Math.round(1 / delta);
};

const drawFPS = g_obj => context => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'white';
    context.fillText('FPS: ' + g_obj.state.fps, 10, 30);
};

/** CLASS */
export const FPS = (params) => {
    const g_obj = GameObject(params); 

    /** STATE */
    g_obj.state = { fps: 0 };

    /** METHODS */
    g_obj.draw = () => drawFPS(g_obj)(g_obj.game.context);
    g_obj.update = (delta) => updateFPS(g_obj)(delta);

    /** INTIALIZATION */
    g_obj.register();

    return g_obj;
}

export default FPS