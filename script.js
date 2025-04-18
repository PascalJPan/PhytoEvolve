// create a dinophyte
function createDinophyte(container) {
  const dino = document.createElement('div');
  dino.classList.add('dinophyte-body');

    // Create the horn
    const horn = document.createElement('div');
    horn.classList.add('plate','horn');

    const horn_pillar = document.createElement('div');
    horn_pillar.classList.add('plate','horn-pillar');

  // Create the top body half
  const bodyTop = document.createElement('div');
  bodyTop.classList.add('body-half', 'top');
  bodyTop.innerHTML = `
    <div class="plate top-plate"></div>
    <div class="plate wing-left-top"></div>
    <div class="plate wing-right-top"></div>
  `;
  
  // Create the cingulum container
  const cingulumContainer = document.createElement('div');
  cingulumContainer.classList.add('cingulum-container');
  cingulumContainer.innerHTML = `

    <div class="cingulum"></div>
    <div class="transverse-cilium"></div> 
  `;

  // Create the bottom body half
  const bodyBottom = document.createElement('div');
  bodyBottom.classList.add('body-half', 'bottom');
  bodyBottom.innerHTML = `
    <div class="plate bottom-plate"></div>
    <div class="plate wing-left-bottom"></div>
    <div class="plate wing-right-bottom"></div>
  `;

  // Create additional plates
  const plate8 = document.createElement('div');
  plate8.classList.add('plate', 'plate-8');
  
  const plate9 = document.createElement('div');
  plate9.classList.add('plate', 'plate-9');

  // Create the cilium
  const cilium = document.createElement('div');
  cilium.classList.add('cilium');

  // Create the cytoplasm and nucleus container
  const cytoplasm = document.createElement('div');
  cytoplasm.classList.add('cytoplasm');
  cytoplasm.innerHTML = `
    <div class="nucleus-container">
      <div class="nucleus"></div>
    </div>
  `;

  // Append all the elements to the body
  dino.appendChild(horn);
  dino.appendChild(horn_pillar);
  dino.appendChild(bodyTop);
  dino.appendChild(cingulumContainer);
  dino.appendChild(bodyBottom);
  dino.appendChild(plate8);
  dino.appendChild(plate9);
  dino.appendChild(cilium);
  dino.appendChild(cytoplasm);

  container.appendChild(dino);
}

const dinoConfig = [
    { name: 'dino-size', lower: 50, upper: 100, unit: '%' },
    { name: 'dino-shape', lower: 0.25, upper: 0.75, unit: '' },
    { name: 'cingulum-depth', lower: 0, upper: 75, unit: '%' },
    { name: 'cingulum-thickness', lower: 0, upper: 100, unit: '%' },
    { name: 'roundness', lower: 60, upper: 100, unit: '%' },
    { name: 'cilium-thickness', lower: 0, upper: 0.5, unit: '', lowerThreshold: 0.1 },
    { name: 'cilium-length', lower: 0, upper: 50, unit: '%', lowerThreshold: 17 },
    { name: 'horn-length', lower: 0, upper: 50, unit: '%' },
    { name: 'horn-width', lower: 0, upper: 80, unit: '%' },
    { name: 'wing-width', lower: 0, upper: 100, unit: '%', lowerThreshold: 35 },
    { name: 'wing-height', lower: 0, upper: 100, unit: '%', lowerThreshold: 35 },
    { name: 'wing-position', lower: 0, upper: 100, unit: '%' },
    { name: 'wing-skew', lower: -25, upper: 25, unit: 'deg' },
    { name: 'glow-size', lower: 0, upper: 30, unit: '' },
    { name: 'glow-color-intensity', lower: 0, upper: 1, unit: '' },
    { name: 'nucleus-deformation', lower: 0, upper: 1, unit: '' },
    { name: 'shell-opacity', lower: 0, upper: 100, unit: '%' },
    { name: 'r-channel', lower: 0, upper: 255, unit: '' },
    { name: 'g-channel', lower: 0, upper: 255, unit: '' },
    { name: 'b-channel', lower: 0, upper: 255, unit: '' },
    { name: 'r-channel-highlight', lower: 0, upper: 255, unit: '' },
    { name: 'g-channel-highlight', lower: 0, upper: 255, unit: '' },
    { name: 'b-channel-highlight', lower: 0, upper: 255, unit: '' }
];

function customizeDinophyte(options, container) {
    // Set CSS variables on the container element of the dinophyte
    Object.entries(options).forEach(([key, value]) => {
      container.style.setProperty(`--${key}`, value);
    });
}

const ConvertToInput = (value, lowerBound, upperBound, unit = '', lowerThreshold = null, upperThreshold = null) => {
    let newValue = lowerBound + (value * (upperBound - lowerBound));
    
    if (lowerThreshold !== null && newValue < lowerThreshold) {
        newValue = lowerBound;
    }

    if (upperThreshold !== null && newValue > upperThreshold) {
        newValue = upperBound;
    }

    return `${newValue.toFixed(2)}${unit}`;
};

function generateDinophyteParams(vector, dinoConfig) {
    if (vector.length !== dinoConfig.length) {
        throw new Error(`Vector length (${vector.length}) does not match dinoConfig length (${dinoConfig.length})`);
    }

    const result = {};
    dinoConfig.forEach((param, i) => {
        result[param.name] = ConvertToInput(vector[i], param.lower, param.upper, param.unit, param.lowerThreshold, param.upperThreshold);
    });

    return result;
}

function modifyDinophyteParams(parameter) {
    const result = { ...parameter }; // copy the original object

    const wingHeight = parseFloat(parameter['wing-height']);
    const wingWidth = parseFloat(parameter['wing-width']);

    if (wingHeight <= 0 || wingWidth <= 0) {
        result['wings-display'] = 'none';
    } else {
        result['wings-display'] = 'block'; // or whatever you prefer
    }

    return result;
}

function mutateVector(parentVector, mutationRate, mutationAmount) {
    return parentVector.map(value => {
        if (Math.random() < mutationRate) {
            // Apply random mutation in range [-mutationAmount, +mutationAmount]
            let delta = (Math.random() * 2 - 1) * mutationAmount;
            let newValue = value + delta;

            // Clamp the new value between 0 and 1
            return Math.min(1, Math.max(0, newValue));
        }
        return value; // unchanged
    });
}

function setupDinophytes(dinoElements, dinoConfig, rawValues = null, mutationRate, mutationAmount) {
    const rawValuesArray = [];

    dinoElements.forEach((dinoElement) => {
        let rawValuesForDino;
        if (rawValues === null) {
            rawValuesForDino = Array.from({ length: dinoConfig.length }, () => Math.random());
        } else {
            rawValuesForDino = mutateVector(rawValues, mutationRate, mutationAmount)
        }

        const params = generateDinophyteParams(rawValuesForDino, dinoConfig);
        const modifiedParams = modifyDinophyteParams(params);
        customizeDinophyte(modifiedParams, dinoElement);

        rawValuesArray.push(rawValuesForDino);  // store raw values for each dino
    });

    return rawValuesArray;
}

function AdaptMutation(value, generation) {
    return value * Math.pow(0.95, generation);
}


// get dino containers
const dc1 = document.getElementById('dino-container-1');
const dc2 = document.getElementById('dino-container-2');
const dc3 = document.getElementById('dino-container-3');
const dc4 = document.getElementById('dino-container-4');

const generation_sign = document.getElementById('generation-sign');

// Create the dinophytes
createDinophyte(dc1);
const D1 = dc1.lastElementChild;

createDinophyte(dc2);
const D2 = dc2.lastElementChild;

createDinophyte(dc3);
const D3 = dc3.lastElementChild;

createDinophyte(dc4);
const D4 = dc4.lastElementChild;

const Dinophytes = [D1, D2, D3, D4];
const DinophytesContainer = [dc1, dc2, dc3, dc4];

// Set up the dinophytes
let rawValuesArray = setupDinophytes(Dinophytes, dinoConfig);

const baseMutationRate = 1;
const baseMutationAmount= 1;
let generation = 0;

let mutationRate = AdaptMutation(baseMutationRate, generation);
let mutationAmount = AdaptMutation(baseMutationAmount, generation);

let finalized = false;

function handleDinoClick(dinoContainer, rawValuesIndex) {
    dinoContainer.addEventListener('click', () => {
        if (generation < 15) {
            // Set up the dinophytes with the current parameters and mutation rates
            rawValuesArray = setupDinophytes(Dinophytes, dinoConfig, rawValuesArray[rawValuesIndex], mutationRate, mutationAmount);
            
            // Increase generation count
            generation++;

            // Adjust mutation rates based on the new generation
            mutationRate = AdaptMutation(baseMutationRate, generation);
            mutationAmount = AdaptMutation(baseMutationAmount, generation);

            console.log('Generation:', generation);
            console.log('Mutation Rate:', mutationRate);
            console.log('Mutation Amount:', mutationAmount);

            generation_sign.innerHTML = `Generation: ${generation}`;    
        } else if (!finalized && generation >= 10){
            // Final generation: show only the winner
            DinophytesContainer.forEach((dc) => {
                if (dc !== dinoContainer) {
                    dc.style.display = 'none';
                } else {
                    // Scale up the winning dinophyte
                    dc.style.transform = 'scale(2)';
                    dc.style.transition = 'transform 0.5s ease';
                }
            });

            generation_sign.innerHTML = ``;
            console.log('Final winner selected!');

            finalized = true;

        } else if (finalized) {
            // Reset everything
            DinophytesContainer.forEach((dc) => {
                dc.style.display = '';
                dc.style.transform = 'scale(1)';
                dc.style.transition = '';
            });

            generation = 0;
            mutationRate = baseMutationRate;
            mutationAmount = baseMutationAmount;
            rawValuesArray = setupDinophytes(Dinophytes, dinoConfig);
            generation_sign.innerHTML = `Generation: ${generation}`;
            finalized = false;

            console.log('Reset complete!');
        }
    });
}

// Handle all the dc elements (dc1, dc2, dc3, dc4) with their corresponding rawValuesArray index
handleDinoClick(dc1, 0);
handleDinoClick(dc2, 1);
handleDinoClick(dc3, 2);
handleDinoClick(dc4, 3);




