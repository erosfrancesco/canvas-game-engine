// https://en.wikipedia.org/wiki/Gun_(cellular_automaton)
import { GameObject, FosterParent } from '../game_objects/index.js';

/** METHODS */
const drawObj = (g_obj) => () => {}
const updateObj = (g_obj) => () => {}

const updateCountdown = (g_obj) => (delta) => {
    const { counter } = g_obj.state;
    const { interval, countdown } = counter;

    // console.log('Set up update', counter, delta)
    const updated = countdown + delta;
    g_obj.state.counter.countdown = updated % interval;

    if (updated >= interval) {
        // fire event
        console.log('Feuer Frei!');
    }
}

/** CLASS */
export const CAGun = (params) => {
    /** PARAMS SANITIFICATION */
    const { id, interval = 100 } = params || {};

    /** GAME OBJECT */
    const draw = (g_obj) => (game) => drawObj(g_obj)(game.context);
    const update = (g_obj) => (...args) => {
        updateObj(g_obj)(...args);
        updateCountdown(g_obj)(...args);
    }
    const g_obj = GameObject({ id, draw, update }); 
    
    /** STATE */
    g_obj.state.shots = {};
    g_obj.state.counter = { interval, countdown: 0 };

    return g_obj;
}

export default CAGun