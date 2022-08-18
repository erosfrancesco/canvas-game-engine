// THE MAIN FEATURE OF LIFE
// This functionality allows GameObjects removal from Engine tasks.
// Use with caution. May cause existential crisis.

/** CLASS */
export const Destroyable = (GameObject, params) => {
    const { onDestroy = () => {} } = params || {};
    
    GameObject.events = GameObject.events || {};
    GameObject.events.destroy = () => {
        onDestroy(GameObject);
        const { engine, id } = GameObject;
        engine.tasks.destroy(id);
    };

    return GameObject;
}

export default Destroyable;