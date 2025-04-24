function createDinophyte(container) {
  const animation_container = document.createElement('div');
  animation_container.classList.add('animation-container');

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

  animation_container.appendChild(dino);
  container.appendChild(animation_container);
}

const dinoConfig = [
    { name: 'specific-clock', lower: 0.4, upper: 1, unit: '' },
    { name: 'dino-size', lower: 40, upper: 100, unit: '%' },
    { name: 'dino-shape', lower: 0.25, upper: 0.6, unit: '' },
    { name: 'top-to-total-ratio', lower: 0.25, upper: 0.9, unit: '', concCenter: true, steepness: 7 },
    { name: 'cingulum-width', lower: 0, upper: 100, unit: '%' },
    { name: 'cingulum-length', lower: 0, upper: 100, unit: '%' },
    { name: 'cingulum-position', lower: 0, upper: 100, unit: '%' },
    { name: 'cingulum-depth', lower: 0, upper: 50, unit: '%' },
    { name: 'cingulum-thickness', lower: 0, upper: 100, unit: '%' },
    { name: 'roundness', lower: 60, upper: 100, unit: '%' },
    { name: 'cilium-thickness', lower: 0, upper: 0.5, unit: '', lowerThreshold: 0.1 },
    { name: 'cilium-length', lower: 0, upper: 50, unit: '%', lowerThreshold: 17 },
    { name: 'horn-length', lower: 0, upper: 50, unit: '%', lowerThreshold: 10 },
    { name: 'horn-width', lower: 0, upper: 80, unit: '%', lowerThreshold: 10 },
    { name: 'wing-width', lower: 0, upper: 100, unit: '%', lowerThreshold: 35 },
    { name: 'wing-height', lower: 0, upper: 100, unit: '%', lowerThreshold: 35 },
    { name: 'wing-position', lower: 0, upper: 100, unit: '%' },
    { name: 'wing-skew', lower: -25, upper: 25, unit: 'deg' },
    { name: 'glow-size', lower: 0, upper: 30, unit: '', lowerThreshold: 10, concCenter: true, steepness: 7  },
    { name: 'nucleus-deformation', lower: 0, upper: 1, unit: '' },
    { name: 'shell-opacity', lower: 10, upper: 100, unit: '%', lowerThreshold: 10, upperThreshold: 90 },
    { name: 'r-channel', lower: 30, upper: 255, unit: '' },
    { name: 'g-channel', lower: 30, upper: 255, unit: '' },
    { name: 'b-channel', lower: 30, upper: 255, unit: '' },
    { name: 'r-channel-highlight', lower: 0, upper: 255, unit: '' },
    { name: 'g-channel-highlight', lower: 0, upper: 255, unit: '' },
    { name: 'b-channel-highlight', lower: 0, upper: 255, unit: '' }
];

function modifyDinophyteParams(parameter) {
    const result = { ...parameter }; 

    const wingHeight = parseFloat(parameter['wing-height']);
    const wingWidth = parseFloat(parameter['wing-width']);

    const shellOpacity = parseFloat(parameter['shell-opacity']);

    const glowSize = parseFloat(parameter['glow-size']);

    if (wingHeight <= 0 || wingWidth <= 0) {
        result['wings-display'] = 'none';
    } else {
        result['wings-display'] = 'block'; 
    }

    if (shellOpacity <= 10) {
        result['shell-opacity'] = '0%';
        result['cilium-thickness'] = '0%';
        result['cilium-length'] = '0%';
    }   

    if (glowSize <= 10) {
        result['glow-color-intensity'] = '0.1';
    }   else if (glowSize < 25) {
        result['glow-color-intensity'] = '0.5';
    } else if (glowSize < 28) {
        result['glow-color-intensity'] = '0.75';
    } else {
        result['glow-color-intensity'] = '1.5';
    }

    return result;
}

async function createDinophytes(dinoSpace, numDinophytes, creationDifference) {
    const Dinophytes = [];
    const DinophytesContainer = [];

    for (let i = 0; i < numDinophytes; i++) {
        
        const container = document.createElement('div');
        container.classList.add('dinophyte-container', 'pre-enter');
        container.id = `dino-container-${i + 1}`;

        dinoSpace.appendChild(container);

        await new Promise(resolve => setTimeout(resolve, creationDifference));
       
        createDinophyte(container);
        const dinophyte = container.lastElementChild;

        
        DinophytesContainer.push(container);
        Dinophytes.push(dinophyte);
    }

    return { Dinophytes, DinophytesContainer };
}


function customizeDinophyte(options, container) {
    Object.entries(options).forEach(([key, value]) => {
      container.style.setProperty(`--${key}`, value);
    });
}

const sigmoid = (value, steepness) => {
    const x0 = 0.5; 
    return 1 / (1 + Math.exp(-steepness * (value - x0)));
}

const xxminussigmoid = (value, steepness) => {
    const x0 = 0.5; 
    const output = value + value - 1 / (1 + Math.exp(-steepness * (value - x0)));
    if (output > 1) {
        return 1;
    } else if (output < 0) {    
        return 0;
    }
    return output;
}

const ConvertToInput = (value, lowerBound, upperBound, unit = '', lowerThreshold = null, upperThreshold = null, concOutside = false, concCenter = false, steepness = 7) => {
    
    if (concOutside) {
        value = sigmoid(value, steepness);
    } else if (concCenter) {
        value = xxminussigmoid(value, steepness);
    }
    
    
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
        result[param.name] = ConvertToInput(vector[i], param.lower, param.upper, param.unit, param.lowerThreshold, param.upperThreshold, param.concOutside, param.concCenter, param.steepness);
    });

    return result;
}



function mutateVector(parentVector, mutationRate, mutationAmount) {
    return parentVector.map(value => {
        if (Math.random() < mutationRate) {
            let delta = (Math.random() * 2 - 1) * mutationAmount;
            let newValue = value + delta;

            return Math.min(1, Math.max(0, newValue));
        }
        return value; 
    });
}

function setupDinophytes(dinoElements, dinoConfig, Index, rawValues = null, mutationRate, mutationAmount) {
    const rawValuesArray = [];

    dinoElements.forEach((dinoElement, i) => {
        let rawValuesForDino;

        if (rawValues === null) {
            rawValuesForDino = Array.from({ length: dinoConfig.length }, () => Math.random());
        } else if (Index === i) { 
            rawValuesForDino = rawValues;
        } else {
            rawValuesForDino = mutateVector(rawValues, mutationRate, mutationAmount)
        }

        const params = generateDinophyteParams(rawValuesForDino, dinoConfig);
        const modifiedParams = modifyDinophyteParams(params);
        customizeDinophyte(modifiedParams, dinoElement);

        rawValuesArray.push(rawValuesForDino);  
    });

    return rawValuesArray;
}

function AdaptMutation(value, generation, percentRatePerGen = 0.9) {
    return value * Math.pow(percentRatePerGen, generation);
}


function floatOutDinophytes(dinoContainers) {
    dinoContainers.forEach(dc => {
        dc.classList.remove('float-in');
        dc.classList.add('float-out');
    });
}

function floatToStartDinophytes(dinoContainers) {
    dinoContainers.forEach(dc => {
        dc.classList.remove('float-out');
        dc.classList.remove('float-in'); 
        dc.classList.add('pre-enter');
    });
}

function floatInDinophytes(dinoContainers) {
    requestAnimationFrame(() => {
        dinoContainers.forEach(dc => {
            dc.classList.remove('pre-enter');
            dc.classList.add('float-in');
        });
    });
}

function reset(DinophytesContainer, Dinophytes, rawValuesArrayRef) {

    DinophytesContainer.forEach((dc) => {
        dc.style.display = 'flex';
    });

    generation = 0;
    mutationRate = baseMutationRate;
    mutationAmount = baseMutationAmount;
    rawValuesArrayRef.current = setupDinophytes(Dinophytes, dinoConfig);
    generation_sign.innerHTML = `${generation}`;
    finalized = false;

    floatToStartDinophytes(DinophytesContainer);
    console.log('Reset complete!'); 

    return rawValuesArrayRef.current;
}

function handleDinoClick({
    dinoContainer,
    rawValuesIndex,
    DinophytesContainer,
    DinophytesContainerFull,
    Dinophytes,
    DinophytesFull,
    dinoConfig,
    generation_sign,
    maxGenerations,
    baseMutationRate,
    baseMutationAmount,
    rawValuesArrayRef
}) {

    const updateTransitions = (durationFn) => {
        DinophytesContainerFull.forEach(dc => {
            dc.style.transition = typeof durationFn === 'function'
                ? `${durationFn()}s linear`
                : durationFn;
        });
    };

    const runFinalization = () => {
        DinophytesContainer.forEach(dc => {
            if (dc !== dinoContainer) dc.style.display = 'none';
        });
        generation_sign.innerHTML = '';
        console.log('Final winner selected!');
        finalized = true;
    };

    const runReset = () => {
        floatOutDinophytes(DinophytesContainerFull);

        setTimeout(() => {
            updateTransitions('0s linear');
            rawValuesArrayRef.current = reset(
                DinophytesContainerFull,
                DinophytesFull,
                rawValuesArrayRef.current[rawValuesIndex]
            );
        }, 400);

        setTimeout(() => {
            
            dinoSpeed = Math.random() * 0.05 + 0.5;
            updateTransitions(() => Math.random() * 0.2 + 0.4);
        }, 700);

        setTimeout(() => floatInDinophytes(DinophytesContainerFull), 800)
        
        return rawValuesArrayRef.current;
    };

    dinoContainer.addEventListener('click', () => {
        GenerationReport(rawValuesArrayRef.current);

        if (generation < maxGenerations) {
            floatOutDinophytes(DinophytesContainer);

            setTimeout(() => {
                updateTransitions('0s linear');

                rawValuesArrayRef.current = setupDinophytes(
                    DinophytesFull,
                    dinoConfig,
                    rawValuesIndex,
                    rawValuesArrayRef.current[rawValuesIndex],
                    mutationRate,
                    mutationAmount
                );

                generation++;
                mutationRate = AdaptMutation(baseMutationRate, generation);
                mutationAmount = AdaptMutation(baseMutationAmount, generation);
                generation_sign.innerHTML = `${generation}`;

                floatToStartDinophytes(DinophytesContainer);
            }, 400);

            setTimeout(() => {
                dinoSpeed = Math.random() * 0.05 + 0.5;
                updateTransitions(() => Math.random() * 0.2 + 0.4);
            }, 700);

            setTimeout(() => floatInDinophytes(DinophytesContainer), 800);
        }

        else if (!finalized && generation >= maxGenerations) {
            runFinalization();
        }

        else if (finalized) {
            rawValuesArrayRef.current = runReset();
        }
    });
}

const GenerationReport = (rawValuesArrayRef) => {
    console.log(`Generation: ${generation}`);
    console.log(`Mutation Rate: ${mutationRate}`);
    console.log(`Mutation Amount: ${mutationAmount}`);
    console.log('-----------------------------------');
    console.log('Raw Values Array:');
    console.log(rawValuesArrayRef);
}

// get html elements
const dinoSpace = document.getElementById('dino-space');
const generation_sign = document.getElementById('generation-sign');

//parameters
const baseMutationRate = 0.9;
const baseMutationAmount = 0.9;
let generation = 0;
let maxGenerations = 10;
let mutationRate = AdaptMutation(baseMutationRate, generation);
let mutationAmount = AdaptMutation(baseMutationAmount, generation);

let dinoAmount = 3;
let finalized = false;
let dinoSpeed = 0.5;
let creationDifference = 10; //ms

// dynamically create dinophyte containers and dinophytes
(async () => {
    let { Dinophytes, DinophytesContainer } = await createDinophytes(dinoSpace, dinoAmount, creationDifference);

    console.log('Dinophytes created:', Dinophytes);
    console.log('Dinophytes containers created:', DinophytesContainer);
    

    // Set up the dinophytes
    let rawValuesArray = setupDinophytes(Dinophytes, dinoConfig);

    let rawValuesArrayRef = { current: rawValuesArray };

    // Handle all the dc elements (dc1, dc2, dc3, dc4) with their corresponding rawValuesArray index
    
    DinophytesContainer.forEach((dc, index) => {
        handleDinoClick({
            dinoContainer: dc,
            rawValuesIndex: index,
            DinophytesContainer: DinophytesContainer.filter((_, i) => i !== index),
            Dinophytes: Dinophytes.filter((_, i) => i !== index),
            DinophytesContainerFull: DinophytesContainer,
            DinophytesFull: Dinophytes,
            dinoConfig,
            generation_sign,
            maxGenerations,
            baseMutationRate,
            baseMutationAmount,
            rawValuesArrayRef
        });
    });

    // Float in the dinophytes
    floatInDinophytes(DinophytesContainer)

})();




