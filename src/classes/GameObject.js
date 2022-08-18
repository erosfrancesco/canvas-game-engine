// Root functionalit. Gives GameObject compatible with game engine
// All object in game should have this functionality

/** METHODS */
// Register a task in game. Tasks could also be treated as objects (GameObjects)
const register = (game, id, draw, update) => game.tasks.add(id, () => draw(game), (delta) => update(delta, game));

/** CLASS */
export const GameObject = (params, opts = {}) => {
    const { id, draw = () => () => {}, update = () => () => {} } = params || {};

    const gObj = { id, ...opts };
    gObj.draw = draw(gObj);
    gObj.update = update(gObj);
    gObj.register = (game) => register(game, id, gObj.draw, gObj.update);
    
    return gObj;
};

export default GameObject;