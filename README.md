# Canvas Game Engine

Basic feaures (npm):
* Loop with [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* Serve with [express](https://expressjs.com/) and [cors](https://www.npmjs.com/package/cors)

Can add and update Tasks (or GameObjects) on game loop (see FPS Counter file: src/fps.js)

ex:

```

const drawFunction = (context) => { ... }

const updateFunction = (delta) => { ... }

game.tasks.add('GAME_OBJECT_ID_1', () => drawFunction(game.context), updateFunction)

```



