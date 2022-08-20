// THE NATURAL LAW, THE IMMUTABLE HORIZON OF THINGS, AS GREEKS THOUGHT.

// Use the game world to store data outside of GameObjects, such as world coordinate system or time
// (should the data be shared with all of them?)
// Note that the game world is not necessary for a game, only the game engine is.
// You could very well develop a game with only GameObjects, and there will be no need to tie them to a particular WorldObject

import game from '../g_engine.js';

export {game};
export default game;