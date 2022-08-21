// import canvas and attach it to game
import canvas, { context } from "./canvas.js";
export const game = {};
game.context = context; 
game.canvas = canvas;
//


// GameObject constructor
export const GameObject = (params) => {
    /** SANITIZATION */
    const { 
        id, 
        draw = () => () => {}, 
        update = () => () => {} 
    } = params || {};

    /** INITIALIZATION */
    const g_obj = {};
    g_obj.game = game;

    g_obj.id = id;                  // ID
    g_obj.state = {};               // STATE
    g_obj.draw = draw(g_obj);       // DRAW METHOD
    g_obj.update = update(g_obj);   // UPDATE METHOD

    /** GAME INITIALIZATION */
    g_obj.register = () => game.addChild(g_obj);

    /** CHILDREN MANAGEMENT */
    g_obj.children = {};
    g_obj.attachChild = (child) => {
        g_obj.children[child.id] = child;
        child.parent = g_obj;
    }
    g_obj.detachChild = (child) => {
        delete child.parent
        delete g_obj.children[child.id]
    }

    return g_obj;
};
//

// Game Object management
game.children = {};
game.addChild = (g_obj) => {
    /** SANITIZATION. SHOULD HAPPEN HERE? */
    g_obj.update = g_obj.update || {};
    g_obj.draw = g_obj.draw || {};
    g_obj.id = g_obj.id || 'GAME_OBJECT_' + Object.keys(game.children).length;

    game.children[g_obj.id] = g_obj;
    g_obj.parent = game;

    return g_obj;
}
game.removeChild = (g_obj) => {
    delete game.children[g_obj.id];
    delete g_obj.parent;
    delete g_obj.game;
}
game.forEachChild = (f) => Object.values(game.children).forEach(f);
//


const iterDraw = (g_obj, ...params) => {
    g_obj.draw(...params);
    Object.values(g_obj.children).forEach(c => iterDraw(c, ...params));
}
const iterUpdate = (g_obj, ...params) => {
    g_obj.update(...params);
    Object.values(g_obj.children).forEach(c => iterUpdate(c, ...params));
}

// Engine main Methods
export const draw = () => game.forEachChild(iterDraw);
export const update = secondsPassed => game.forEachChild(child => iterUpdate(child, secondsPassed || 0)); 
// game loop
export const gameLoop = (oldTimeStamp, timeStamp) => {
    // Calculate how much time has passed
    const secondsPassed = (timeStamp - oldTimeStamp) / 1000;

    // Move forward in time with a maximum amount
    // Pass the time to the update
    update(Math.min(secondsPassed, 0.1));
    draw();

    window.requestAnimationFrame((...args) => gameLoop(timeStamp, ...args));
}
//


// Game Init. Nothing important past this point. It's automated.
game.gameLoop = gameLoop
window.requestAnimationFrame(gameLoop); // Start the first frame request
export default game;