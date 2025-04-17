function customizeDinophyte(options, container) {
    // Set CSS variables on the container element of the dinophyte
    Object.entries(options).forEach(([key, value]) => {
      container.style.setProperty(`--${key}`, value);
    });
}

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
    <div class="cingulum">
      <div class="transverse-cilium"></div>
    </div>
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


const container = document.getElementById('dino-container-left');

createDinophyte(container);

const firstDino = container.lastElementChild;

customizeDinophyte({
    'dino-size': '100%',
    'dino-shape': '0.6',
    'horn-size': '12%',
    'wing-width': '1.2',
    'wing-skew': '30deg',
    'glow-color-intensity': '0.6',
    'r-channel': '200',
    'g-channel': '100',
    'b-channel': '150'
}, firstDino);

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