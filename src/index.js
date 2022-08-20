import game from './g_engine.js'
import FPS from './examples/fps.js'
import Ghost from './examples/ghost.js'

/** GAME INIT */
const fps = FPS({ id: 'G-Object_001' })
fps.register(game)

const ghost = Ghost({ id: 'G-Object_002', livesFor: 1 })
ghost.register(game)
/** */
