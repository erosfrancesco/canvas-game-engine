// EXAMPLE OF DESTROYABLE GAMEOBJECT
import { GameObject, Destroyable } from '../classes/index.js';

/** METHODS */
const updateGhost = gObj => secondsPassed => {
    const { livesFor, livesFrom } = gObj.updates;

    if (livesFrom > livesFor) {
        gObj.events.destroy();
    }

    gObj.updates.livesFrom = livesFrom + secondsPassed;
};

const drawGhost = gObj => context => {
    context.fillStyle = 'lightgrey';
    context.fillRect(200, 100, 400, 200);
};

/** CLASS */
export const Ghost = (params) => {
    /** PARAMS SANITIZATION */
    const { id, livesFor = 0 } = params || {};

    /** STATE */
    const state =  { updates: { livesFor, livesFrom: 0 } }; // State could be managed better.

    /** METHODS */
    const draw = (gObj) => (game) => drawGhost(gObj)(game.context);
    const update = (gObj) => (delta, game) => updateGhost(gObj)(delta);
    const onDestroy = (gObj) => {
        const { context } = gObj.engine;
        context.clearRect(210, 110, 380, 180);
    }

    /** CLASS */
    return Destroyable(GameObject({ id, draw, update }, state), { onDestroy });
}

export default Ghost