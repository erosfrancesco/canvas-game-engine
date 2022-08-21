import './game.js'
import { FPS } from './examples/FPS.js'

const fps1 = FPS({ id: 'OBJ_1' });
fps1.register();

const fps2 = FPS({ id: 'OBJ_2', x: 300 });
fps1.attachChild(fps2);