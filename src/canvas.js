export const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

// CANVAS CONFIGS
canvas.width = 800
canvas.height = 600
canvas.style.background = 'rgb(34, 34, 34)'
//

export const context = canvas.getContext('2d')
export default context;
