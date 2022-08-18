
// * UNUSED * //


// THE MAIN FEATURE OF ALL THINGS. EH.
// This Composition gives methods (handlers) to handle GameObject creation and destruction.

/** CLASS */
export const Existable = (GameObject, params) => {
    const {} = params || {};
    const { events = {} } = GameObject || {};
    
    events.destroy = () => {};
    events.create = () => {};

    return {
        ...GameObject,
        events
    };
}

export default Existable;