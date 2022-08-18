export const TheWorld = (game, params = {}) => {
    game.world = {
        coordinates: ['x', 'y', 'z'],
        boundaries: {}
    };
}

export default TheWorld;