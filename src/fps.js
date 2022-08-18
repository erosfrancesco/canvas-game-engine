// Simple example of game object
export class FPS {
    constructor() {
        const calculateFPS = secondsPassed => {
            this.updates.fps = Math.round(1 / secondsPassed)
        }
        const drawFPS = context => {
            context.fillStyle = 'black';
            context.fillRect(0, 0, 200, 100);
            context.font = '25px Arial';
            context.fillStyle = 'white';
            context.fillText('FPS: ' + this.updates.fps, 10, 30);
        }
    

        // 
        this.updates = {fps: 0}
        this.register = game => {
            const id = 'FPS-TASK'
            game.tasks.add(id, () => drawFPS(game.context), calculateFPS)
        }
    }
}

export default FPS