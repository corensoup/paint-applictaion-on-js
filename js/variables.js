const HEIGHT = document.documentElement.clientHeight - 100
const WIDTH = document.documentElement.clientWidth - 100

let color = 'black'
let tool = 'brush'
let size = 10

const hexToRGBcolors = {
    'white' : {r: 255, g: 255, b: 255},
    'black' : {r: 0, g: 0, b: 0},
    'green': {r: 0, g: 128, b: 0},
    'red' : {r: 255, g: 0, b: 0},
    'blue': {r: 0, g: 0, b:255},
    'cyan': {r: 0, g: 255, b: 255},
    'magenta': {r: 255, g: 0, b: 255},
    'orange': {r: 255, g: 165, b: 0},
    'purple': {r: 128, g: 0, b: 128},
    'pink': {r: 255, g: 192, b: 203},
    'royalblue': {r: 65, g: 105, b: 225},
}