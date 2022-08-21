import './game.js'
import { FPS } from './examples/FPS.js'

const fps1 = FPS({ id: 'OBJ_1' });
fps1.register();

const fps2 = FPS({ id: 'OBJ_2', x: 300 });
fps1.attachChild(fps2);


/*
import FPS from './examples/fps.js'
import Ghost from './examples/ghost.js'
import CAGun from './examples/spawner.js'


/** GAME INIT 
const fps = FPS({ id: 'G-Object_001' })
fps.register(game)

const ghost = Ghost({ id: 'G-Object_002', livesFor: 1 })
ghost.register(game)

const caGun = CAGun({ id: 'G-Object_003', interval: 2 })
caGun.register(game)
/** */
