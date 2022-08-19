// import game from './g_engine.js' // no game world
import game from './game_world/index.js' // with game world
import FPS from './examples/fps.js'
import Ghost from './examples/ghost.js'
import Inabitant from './examples/world.js'

/** */
// GAME INIT
const fps = FPS({ id: 'G-Object_001' })
game.add(fps)

const ghost = Ghost({ id: 'G-Object_002', livesFor: 1 });
game.add(ghost)
/** */

const inabitant = Inabitant({ id: 'World_Obj_001' });
game.add(inabitant);