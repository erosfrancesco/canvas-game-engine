# Canvas Game Engine

Minimal game engine. This is the result of combining various tutorials and example codes.

## Tecnicalities

* Loop with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* Serve with [express](https://expressjs.com/) and [cors](https://www.npmjs.com/package/cors)

To see example of GameObjects usable with this engine and their functionality, see example folder

Game Objects functionality so far:

* Can be created (registered on the engine)
* Can be destroyed (removed from the engine)
* Can attach / detach children

## TODOs

* Set up attach / detach events on GameObject
* Create custom GameObject classes (like FPS)
