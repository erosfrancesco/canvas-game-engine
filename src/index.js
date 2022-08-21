import './game.js'
import { FPS } from './examples/FPS.js'

const fps1 = FPS({ id: 'OBJ_1' });
fps1.register();

const fps2 = FPS({ x: 300 });
fps2.events.onAttached = () => {
    console.log('Attached', fps2);
}
fps2.events.onDetached = () => {
    const { context } = fps2.game
    const { fps, x, y } = fps2.state;

    // clean up
    context.clearRect(x, y, 200, 100);    
    delete fps2.state;

    console.log('Detached', fps2);
}

fps1.attachChild(fps2);

setTimeout(() => {
    fps1.detachChild(fps2);
}, 2000);