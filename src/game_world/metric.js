/** DEFAULTS */
const coordinates_2d = ['x', 'y'];
const createStandardPosition = (coordinates) => (params) => {
    params = params || {};
    const position = {};
    coordinates.forEach((c) => {
        position[c] = params[c] || 0;
    });

    return position;
};
/** */

export const MetricWorld = (game, worldParams) => {
    const { coordinates = coordinates_2d, createPosition = createStandardPosition } = worldParams || {};

    /** METHOD OVERRIDE */
    game.add = (gObj) => {
        // EXISTANCE PRECEDES ESSENCE
        gObj.register(game);

        return WorldObject(gObj, gObj.worldParams);
    };

    game.world = {
        /** STATE */
        coordinates,
        positions: {},
        
        /** METHODS */
        createPosition: createPosition(coordinates),
        givePosition: (gobj_id, position) => {
            game.world.positions[gobj_id] = position;
        }
    };

    return game;
}


export const WorldObject = (GameObject, params) => {
    
    /** PARAMS SANITIZATION */
    const { position, updatePosition = () => { return {} }, onWorldAdded = (g) => { return g } } = params || {};
    const { id, engine } = GameObject;
    const { world } = engine;
    GameObject.events = GameObject.events || {};
    /** */

    /** METHODS */
    const update = GameObject.update;
    const updatePositionLoop = (...args) => {
        const positionData = updatePosition(...args);
        const newPosition = world.createPosition(positionData);
        world.givePosition(id, newPosition);
    }
    GameObject.update = (...args) => {
        updatePositionLoop(...args);
        update(...args)
    }

    const destroy = GameObject.events.destroy || function() {};
    GameObject.events.destroy = (...args) => {
        delete world.positions[id];
        destroy(...args);
    }
    
    const initialPosition = position || world.createPosition();
    updatePositionLoop(initialPosition);

    
    return onWorldAdded(GameObject);
}

export default MetricWorld;