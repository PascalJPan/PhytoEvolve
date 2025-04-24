customizeDinophyte({
    'dino-size': '100%', //50% - 100%
    'dino-shape': '0.5', //0.25 - 0.75
    'cingulum-depth': '25%', //0% - 75%
    'cingulum-thickness': '100%', //0% - 100%
    'roundness': '100%', //60% - 100%
    'cilium-thickness': '0.5', //0 - 0.5
    'cilium-length': '50%', //0% - 50%
    'horn-length': '10%', //0% - 50%
    'horn-width': '80%', //0% - 80%
    'wing-width': '1', //0 - 1
    'wing-height': '100%', //0% - 100%
    'wing-position': '100%', //0% - 100%
    'wing-skew': '-25deg', // -25deg - 40deg
    'glow-size': '30', //0 - 30
    'glow-color-intensity': '0.6', //0 - 1
    'nucleus-deformation': '0.2', //0 - 1
    'shell-opacity': '0.2', //0% - 100%
    'r-channel': '0', //0 - 255
    'g-channel': '255', //0 - 255
    'b-channel': '150', //0 - 255
    'r-channel-highlight': '200', //0 - 255
    'g-channel-highlight': '100', //0 - 255
    'b-channel-highlight': '150' //0 - 255
}, firstDino);


createDinophytes(dinoSpace, 4);

const dc1 = document.getElementById('dino-container-1');
const dc2 = document.getElementById('dino-container-2');
const dc3 = document.getElementById('dino-container-3');
const dc4 = document.getElementById('dino-container-4');

const D1 = dc1.lastElementChild;
const D2 = dc2.lastElementChild;
const D3 = dc3.lastElementChild;
const D4 = dc4.lastElementChild;

const values = [0.01, 0.05, 0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 0.99];
const transformedOutside = values.map(v => concOutside(v,7));
console.log(transformedOutside);

const transformedCenter = values.map(v => concCenter(v,7));
console.log(transformedCenter);


// sigmoid with steepness 7 leads to concentration outside
// concCenter() with 7 leads to concentration inside
