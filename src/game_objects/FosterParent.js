// SPAWNER
// This functionality allows GameObjects to attach other GameObjects as childs.
// When a parent is destroyed, all its related childs are also destroyed.

/** METHODS */
const attachChild = (GameObject, onChildAttached) => (childObject) => {
    const { id } = childObject;
    GameObject.childs[id] = childObject;
    onChildAttached(GameObject);
};

const destroyChilds = (GameObject) => (...args) => {
    Object.values(GameObject.childs).forEach(child => {
        child.events = child.events || {};
        child.events.destroy = child.events.destroy || function () {}
        child.events.destroy(...args);
    })
}

/** CLASS */
export const FosterParent = (GameObject, params) => {
    /** SANIFICATION */
    const { onChildAttached = () => {} } = params || {};
    GameObject.childs = GameObject.childs || {}; // STATE INITIALIZATION
    GameObject.events = GameObject.events || {};
    const { destroy } = GameObject.events;

    /** METHODS */
    GameObject.events.attachChild = attachChild(GameObject, onChildAttached)

    GameObject.events.destroy = (...args) => {
        destroyChilds(GameObject)(...args)
        destroy(...args);
    }

    return GameObject;
}

export default FosterParent;