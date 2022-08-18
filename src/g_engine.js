// import canvas and attach it to game
import canvas, { context } from "./canvas.js";
export const game = {};
game.context = context; 
game.canvas = canvas;
//

// loop
export const gameLoop = (oldTimeStamp, timeStamp) => {
    // Calculate how much time has passed
    const secondsPassed = (timeStamp - oldTimeStamp) / 1000;

    // Move forward in time with a maximum amount
    // Pass the time to the update
    update(Math.min(secondsPassed, 0.1));
    draw();

    window.requestAnimationFrame((...args) => gameLoop(timeStamp, ...args));
}

// tasks
game.tasks = {
    draw: {},
    update: {},
    add: (id, draw, update) => {
        game.tasks.draw[id] = draw
        game.tasks.update[id] = update
    },
    destroy: (id) => {
        delete game.tasks.draw[id];
        delete game.tasks.update[id];
    }
}

export const draw = () => Object.values(game.tasks.draw).forEach(task => task());
export const update = secondsPassed => Object.values(game.tasks.update).forEach(task => task(secondsPassed || 0)); 

game.gameLoop = gameLoop

// Start the first frame request
window.requestAnimationFrame(gameLoop);

export default game;