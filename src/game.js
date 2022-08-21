// import canvas and attach it to game
import canvas, { context } from "./canvas.js";
export const game = {};
game.context = context; 
game.canvas = canvas;
//


// CHILDREN MANAGEMENT FUNCTIONALITY
const ChildrenManager = (g_obj) => {
    g_obj.children = {};

    // events
    g_obj.events = g_obj.events || {};
    g_obj.events.onAttached = g_obj.events.onAttached || function() {};
    g_obj.events.onDetached = g_obj.events.onDetached || function() {};
    g_obj.events.onChildAttached = g_obj.events.onChildAttached || function() {};
    g_obj.events.onChildDetached = g_obj.events.onChildDetached || function() {};
    
    // methods
    g_obj.attachChild = (child) => {
        g_obj.children[child.id] = child;
        child.parent = g_obj;

        child.events.onAttached(parent);
        g_obj.events.onChildAttached(child);
    }
    g_obj.detachChild = (child) => {
        delete g_obj.children[child.id]
        delete child.parent
        
        child.events.onDetached(parent);
        g_obj.events.onChildDetached(child);
    }
}
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
    g_obj.events = {};              // EVENTS
    g_obj.draw = draw(g_obj);       // DRAW METHOD
    g_obj.update = update(g_obj);   // UPDATE METHOD

    /** GAME INITIALIZATION */
    g_obj.register = () => game.attachChild(g_obj); // possible event

    ChildrenManager(g_obj);
    
    const attach = g_obj.attachChild;
    g_obj.attachChild = (child) => {
        child.id = child.id || g_obj.id + '_CHILD_' + Object.keys(child.children).length;
        attach(child);
    }

    return g_obj;
};
//


// Game Object management
ChildrenManager(game);
game.forEachChild = (f) => Object.values(game.children).forEach(f);

const attach = game.attachChild;
const detach = game.detachChild;
game.attachChild = (g_obj) => {
    g_obj.update = g_obj.update || {};
    g_obj.draw = g_obj.draw || {};
    g_obj.id = g_obj.id || 'GAME_OBJECT_' + Object.keys(game.children).length;
    console.log(g_obj.id);
    attach(g_obj);
}

game.detachChild = (g_obj) => {
    delete g_obj.game;
    detach(g_obj);
}
//


// Engine main Methods
const iterate = (g_obj, name, ...params) => {
    g_obj[name](...params);
    Object.values(g_obj.children).forEach(c => iterate(c, name, ...params));
}

export const draw = () => game.forEachChild(c => iterate(c, 'draw'));
export const update = secondsPassed => game.forEachChild(child => iterate(child, 'update', secondsPassed || 0)); 
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