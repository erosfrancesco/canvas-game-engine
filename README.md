# Canvas Game Engine

Minimal game engine. This is the result of combining various tutorials and example codes.

To see example of GameObjects usable with this engine and their functionality, see example folder

## Tecnicalities

* Loop with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* Serve with [express](https://expressjs.com/) and [cors](https://www.npmjs.com/package/cors)

GameObject functionality so far:

* Can be registered to the engine (Note that a GameObject can be created but not registered)
* Can be removed from the engine
* Can attach / detach children. Children are updated automatically if their parent is registered in game

## TODOs

* Set up attach / detach events on GameObject
* Create custom GameObject classes (like FPS)
