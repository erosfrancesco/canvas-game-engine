// Root functionality. Gives GameObject compatible with game engine
// All object in game should have this functionality


/** METHODS */
// Register a task in game. Tasks could also be treated as objects (GameObjects)
const register = (engine, id, draw, update) => engine.tasks.add(id, () => draw(engine), (delta) => update(delta, engine));

/** CLASS */
export const GameObject = (params, opts = {}) => {
    const { id, draw = () => () => {}, update = () => () => {} } = params || {};

    const gObj = { id, state: {}, ...opts };

    /** METHODS */
    gObj.draw = draw(gObj);
    gObj.update = update(gObj);
    gObj.register = (engine) => {
        gObj.engine = engine;
        register(engine, id, gObj.draw, gObj.update);
    }
    
    return gObj;
};

export default GameObject;