// Root functionalit. Gives GameObject compatible with game engine
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
    
    /** STATE GET & SET */
    gObj.getState = (...path) => {
        return path.reduce((acc, s) => { return acc[s] || {} }, gObj.state);
    }

    gObj.setState = (value, ...path) => {

        if (path.length === 1) {
            gObj.state[path[0]] = value;
            return gObj.state;
        }

        const { parent: updated } = path.reduce((acc, s, i) => {
            const { parent, current } = acc;
            const lastPath = path[i - 1] || path[i];
            current[s] = i < path.length - 1 ? {} : value
            parent[lastPath] = current;

            return { parent, current: current[s] };

        }, { parent: {}, current: {} });

        return Object.assign(gObj.state, updated);
    }
    /** */

    /*
    // TESTS
    gObj.setState('Exists', 'hello', 'world');
    gObj.setState('Exists also', 'hello there');
    console.log(gObj.state, '\n', gObj.getState('hello there'), '\n', gObj.getState('hello', 'world'))
    /** */
    
    return gObj;
};

export default GameObject;