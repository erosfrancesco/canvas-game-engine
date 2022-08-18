const game = {}

// canvas and context
export const canvas = document.createElement('canvas')
game.canvas = canvas
document.body.appendChild(canvas)

canvas.width = 800
canvas.height = 600
canvas.style.background = 'rgb(15 14 28)'

export const context = canvas.getContext('2d')
game.context = context


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
game.tasks = {
    draw: {},
    update: {},
    add: (id, draw, update) => {
        game.tasks.draw[id] = draw
        game.tasks.update[id] = update
    }
}
export const draw = () => {
    Object.keys(game.tasks.draw).forEach(id => {
        const task = game.tasks.draw[id]
        // should check if is a valid function, but whatever...
        // if even one is not valid everything will crash. It should be that way
        task()
    })
}

export const update = secondsPassed => {
    Object.keys(game.tasks.update).forEach(id => {
        const task = game.tasks.update[id]
        // should check if is a valid function, but whatever...
        // if even one is not valid everything will crash. It should be that way
        task(secondsPassed)
    })
}
// 

game.gameLoop = gameLoop


// Start the first frame request
window.requestAnimationFrame(gameLoop);
export default game