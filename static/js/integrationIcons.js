const integrations = [
  { name: 'VSC', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/VSC.jpeg?updatedAt=1760120392344' },
  { name: 'ChatGPT', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/chatGPT.png?updatedAt=1760119825377' },
  { name: 'Gemini', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/gemini.png?updatedAt=1760119826395' },
  { name: 'Claude', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/claude.png?updatedAt=1760119825880' },
  { name: 'Figma', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/figma.avif?updatedAt=1760119996658' },
  { name: 'Square', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/squar.png?updatedAt=1760119825298' },
  { name: 'Perplexity', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/perplexity.png?updatedAt=1760119826703' },
  { name: 'Google Studio', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/googlelab.png?updatedAt=1760119825276' },
  { name: 'Gmail', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/gmail.jpg?updatedAt=1760119825440' },
  { name: 'Midjourney', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/midjourney.png?updatedAt=1760120104757' },
  { name: 'X', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/x.png?updatedAt=1760120150473' },
  { name: 'Minimax', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/minimax.jpeg?updatedAt=1760120214682' },
  { name: 'Netlify', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/netlify.png?updatedAt=1760120255427' },
  { name: 'Make', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/make.webp?updatedAt=1760120300206' },
  { name: 'Firebase', logo: 'https://ik.imagekit.io/sebastienaugustin/images/projects/Company%20Logos/Screenshot%202025-10-10%20at%2012.18.56%20PM.png?updatedAt=1760120343912' },
];

// Helper to shuffle array (Fisher–Yates)
function shuffle(array) {
  const arr = array.slice(); // copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate integration cards in a container
function generateIntegrationCards(containerId, items) {
  const container = document.getElementById(containerId);
  // Append items twice for seamless scroll
  for (let i = 0; i < 2; i++) {
    items.forEach(integration => {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'integration-card';
      
      const logoDiv = document.createElement('div');
      logoDiv.className = 'integration-logo';
      
      const img = document.createElement('img');
      img.src = integration.logo;
      img.alt = integration.name;
      
      logoDiv.appendChild(img);
      const span = document.createElement('span');
      span.textContent = integration.name;
      
      card.appendChild(logoDiv);
      card.appendChild(span);
      container.appendChild(card);
    });
  }
}

// Left row: in order
generateIntegrationCards('integrations-left', integrations);

// Right row: shuffled
generateIntegrationCards('integrations-right', shuffle(integrations));

const scrollContainerright = document.querySelector('.integrations-wrapper');
const scrollContentright = scrollContainerright.querySelector('.scroll-right');

let speed = 0.5; // pixels per frame
let pos = 0;

function scrollRight() {
pos -= speed;
// reset when first half has completely scrolled out
if (Math.abs(pos) >= scrollContentright.scrollWidth / 2) {
    pos = 0;
}
scrollContentright.style.transform = `translateX(${pos}px)`;
requestAnimationFrame(scrollRight);
}

scrollRight();

const scrollContainer = document.getElementById('integrations-wrapper');
const scrollContent = scrollContainer.querySelector('.scroll-left');

let pos2 = -scrollContent.scrollWidth / 2; // start from the left half

function scroll() {
pos2 += speed; // move right instead of left
// reset when second half has completely scrolled out
if (pos2 >= 0) {
    pos2 = -scrollContent.scrollWidth / 2;
}
scrollContent.style.transform = `translateX(${pos2}px)`;
requestAnimationFrame(scroll);
}

scroll();