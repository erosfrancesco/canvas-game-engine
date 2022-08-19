// EXAMPLE OF SIMPLE GAMEOBJECT
import { GameObject } from '../game_objects/index.js';

/** METHODS */
const updateObj = gObj => secondsPassed => {
    // maybe update position ?
};

const drawObj = gObj => game => {
    const { id } = gObj;
    const { context, world } = game;
    const position = world.positions[id];

    context.fillStyle = 'green';
    context.beginPath();
    context.arc(position.x, position.y, 50, 0, 2 * Math.PI);
    context.fill();
};

/** CLASS */
export const Inabitant = (params) => {
    const { id } = params || {};

    const draw = (gObj) => (game) => drawObj(gObj)(game);
    const update = (gObj) => (delta, game) => updateObj(gObj)(delta, game);

    /** EXISTANCE */
    const exists = GameObject({ id, draw, update });

    return exists;


    /** PARAMS SANITIZATION */
    console.log(params)

    /** STATE */
    const state = {
        worldParams: {
            position: world.createPosition(),

            /** WORLD HANDLERS */
            updatePosition: (...args) => {
                console.log(...args)
                return { x: 2, y: 300 }
            },
            /** */

            onWorldAdded: (futureSelf) => {
                return futureSelf;
            }
            /** */
        }
    }
}

export default Inabitant