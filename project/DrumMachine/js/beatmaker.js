// Create new instrument track
const trackNames = [
    { id: 'kick', display: 'Kick' },
    { id: 'snare', display: 'Snare' },
    { id: 'clap', display: 'Clap' },
    { id: 'hihat', display: 'High Hat' },
    { id: 'ophat', display: 'Open Hat' },
    { id: 'perc', display: 'Percussion' }
];
const trackContainer = document.getElementById('track-container');
// Function to create a new track row
trackNames.forEach(track => {
    const trackRow = document.createElement('section');
    trackRow.classList.add('trackRow');

    // Create control div
    const trackRowCtrl = document.createElement('div');
    trackRowCtrl.classList.add('trackRow_ctrl');

    // Create control div
    const trackPanning = document.createElement('div');
    trackPanning.classList.add('trackPanning');

    // Create the track title button
    const trackTitleButton = document.createElement('button');
    trackTitleButton.classList.add('track-title');
    trackTitleButton.textContent = track.display; // Use display name

    // Create the panning knob (input range)

    // Track mute state
    let isMuted = false;

    // Attach click event listener for mute functionality
    trackTitleButton.addEventListener('click', () => {
        isMuted = !isMuted; // Toggle mute state
        if (isMuted) {
            trackTitleButton.classList.add('active'); // Add active class for muted state
            sounds[track.id].volume = 0; // Mute the track
            trackRowCtrlVol.style.opacity = '0'; // Hide volume control input
            trackRowCtrlVol.disabled = true;
        } else {
            trackTitleButton.classList.remove('active'); // Remove active class for unmuted state
            sounds[track.id].volume = 1; // Restore track volume
            trackRowCtrlVol.style.opacity = '1'; // Show volume control input
            trackRowCtrlVol.disabled = false;
        }
    });

    // Create the volume control input
    const trackRowCtrlVol = document.createElement('input');
    trackRowCtrlVol.type = 'range';
    trackRowCtrlVol.min = '0';
    trackRowCtrlVol.max = '100';
    trackRowCtrlVol.classList.add('trackRow_ctrlVol');
    trackRowCtrlVol.value = '100'; // Default volume value

    // Attach an event listener to update volume for the corresponding track
    trackRowCtrlVol.addEventListener('input', function() {
        const volume = this.value / 100; // Scale the value from 0 to 1
        sounds[track.id].volume = volume; // Use the ID to access the sound
    });

    // Append the title button and volume control to the control div
    trackRowCtrl.appendChild(trackTitleButton);
    trackRowCtrl.appendChild(trackRowCtrlVol);


    // Create the div for the track with a unique id matching the track ID
    const trackDiv = document.createElement('div');
    trackDiv.classList.add('track');
    trackDiv.id = track.id; // Use the ID for the track div

    // Append the control div and track div to the trackRow section
    trackRow.appendChild(trackRowCtrl);
    trackRow.appendChild(trackPanning);
    trackRow.appendChild(trackDiv);

    // Finally, append the trackRow to the track container
    trackContainer.appendChild(trackRow);
});
const tracks = {
kick: Array(32).fill(false),
snare: Array(32).fill(false),
clap: Array(32).fill(false),
hihat: Array(32).fill(false),
ophat: Array(32).fill(false),
perc: Array(32).fill(false)
};

let sounds = {
    kick : new Audio('sounds/Trap/Kick.wav'),
    snare : new Audio('sounds/Trap/Snare.wav'),
    clap : new Audio('sounds/Trap/Clap.wav'),
    hihat : new Audio('sounds/Trap/HighHat.wav'),
    ophat : new Audio('sounds/Trap/openHat.wav'),
    perc : new Audio('sounds/Trap/Perc.wav'),
  };
  
  // Function to change the sound based on genre and apply active styles
  function changeGenre(genre) {
    // Update sounds based on the genre
    if (genre === 'trap') {
      sounds.kick = new Audio('sounds/Trap/Kick.wav');
      sounds.snare = new Audio('sounds/Trap/Snare.wav');
      sounds.clap = new Audio('sounds/Trap/Clap.wav');
      sounds.hihat = new Audio('sounds/Trap/HighHat.wav');
      sounds.ophat = new Audio('sounds/Trap/openHat.wav');
      sounds.perc = new Audio('sounds/Trap/Perc.wav');
    } else if (genre === 'boombap') {
      sounds.kick = new Audio('sounds/Boombap/Ben_K.wav');
      sounds.snare = new Audio('sounds/Boombap/Crt_Sn.wav');
      sounds.clap = new Audio('sounds/Boombap/ATL Clap.wav');
      sounds.hihat = new Audio('sounds/Boombap/Hgh_H2.wav');
      sounds.ophat = new Audio('sounds/Boombap/Ophat1.wav');
      sounds.perc = new Audio('sounds/Boombap/Perc.wav');
    } else if (genre === 'groovy') {
        sounds.kick = new Audio('sounds/Groovy/Kick.wav');
        sounds.snare = new Audio('sounds/Groovy/Snare.wav');
        sounds.clap = new Audio('sounds/Groovy/Clap.wav');
        sounds.hihat = new Audio('sounds/Groovy/HighHat.wav');
        sounds.ophat = new Audio('sounds/Groovy/openHat.wav');
        sounds.perc = new Audio('sounds/Groovy/Perc.wav');
    }  else if (genre === 'dirty') {
        sounds.kick = new Audio('sounds/Dirty/BWB [WAVE 2] KICK (31).wav');
        sounds.snare = new Audio('sounds/Dirty/BWB WAV 7 SNARE (41).wav');
        sounds.clap = new Audio('sounds/Dirty/Bg_Clp.wav');
        sounds.hihat = new Audio('sounds/Dirty/BWB [WAVE 2] HAT (21).wav');
        sounds.ophat = new Audio('sounds/Dirty/BWB WAV 9 OPEN HAT (6).wav');
        sounds.perc = new Audio('sounds/Dirty/BWB WAV 6 PERC (66).wav');
    }  else if (genre === 'bounce') {
        sounds.kick = new Audio('sounds/Bounce/BWB - Short 808 15.wav');
        sounds.snare = new Audio('sounds/Bounce/BWB [WAVE 2] SNARE (33).wav');
        sounds.clap = new Audio('sounds/Bounce/BWB - Clap 25.wav');
        sounds.hihat = new Audio('sounds/Bounce/BWB WAV 9 HAT (17).wav');
        sounds.ophat = new Audio('sounds/Bounce/BWB WAVE 3 OPEN HAT (15).wav');
        sounds.perc = new Audio('sounds/Bounce/BWB [WAVE 2] PERC (15).wav');
    }
  
    // Remove active class from all buttons
    document.querySelectorAll('.genreBtn').forEach(button => {
      button.style.backgroundColor = '';  // Reset background
      button.style.color = '';  // Reset text color
      button.classList.remove('active'); // Remove active class
    });
  
    // Add active class and styles to the clicked button
    const activeButton = document.getElementById(genre);
    activeButton.style.backgroundColor = 'white';  // Set background to white
    activeButton.style.color = 'black';  // Set text color to black
    activeButton.classList.add('active');  // Add active class
  }
  
// Add event listeners for genre buttons
document.getElementById('boombap').addEventListener('click', () => {
changeGenre('boombap');
console.log('Boom Bap sounds loaded');
});
document.getElementById('trap').addEventListener('click', () => {
changeGenre('trap');
console.log('Trap sounds loaded');
});
document.getElementById('groovy').addEventListener('click', () => {
changeGenre('groovy');
console.log('Groovy Bap sounds loaded');
});
document.getElementById('dirty').addEventListener('click', () => {
changeGenre('dirty');
console.log('Dirty sounds loaded');
});
document.getElementById('bounce').addEventListener('click', () => {
changeGenre('bounce');
console.log('Bounce sounds loaded');
});
  
  

const soundKeyMapping = {
    'a': 'kick',   // A key for Kick
    's': 'snare',  // S key for Snare
    'd': 'clap',   // D key for Clap
    'f': 'hihat',  // F key for Hi-hat
    'g': 'ophat',  // G key for Open Hi-hat
    'h': 'perc'    // H key for Percussion
};
function playSound(key) {
    const soundKey = soundKeyMapping[key];
    if (soundKey && sounds[soundKey]) {
        sounds[soundKey].currentTime = 0; // Reset the sound to play from the beginning
        sounds[soundKey].play();           // Play the sound
    }
}
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase(); // Get the pressed key
    playSound(keyPressed); // Play the sound based on the key
});

let currentStep = 0;
let intervalId = null;
let bpm = 120;
let intervalTime = 60000 / bpm / 4; // Interval time in ms for 16th notes
// Initialize Audio Context for recording
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let mediaRecorder;
let recordedChunks = [];

// Create the grid for each track
Object.keys(tracks).forEach(trackName => {
    const trackElement = document.getElementById(trackName);
    tracks[trackName].forEach((_, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add('tracksA');
        square.dataset.trackName = trackName;
        square.dataset.index = i;

        // Add the 'green' class to the specified squares
        if ([0, 4, 8, 12, 16,20,24,28].includes(i)) {
            square.classList.add('col2');
        }

        // Add event listener for toggling the square
        square.addEventListener('click', () => {
            tracks[trackName][i] = !tracks[trackName][i]; // Toggle the square
            square.classList.toggle('active');
        });

        // Append the square to the track element
        trackElement.appendChild(square);

        // Set display to none for the last 16 squares
        if (i >= 16) {
            square.style.display = 'none'; // Hide squares 16 to 31
        }
    });
});



// Function to toggle between Pattern A and Pattern B
function togglePattern() {
    const pattern32utton = document.getElementById('pattern32') || document.getElementById('pattern16');
    const ispattern32 = pattern32utton.id === 'pattern32';

    // Toggle visibility of squares
    Object.keys(tracks).forEach(trackName => {
        const trackElement = document.getElementById(trackName);
        const trackASquares = trackElement.querySelectorAll('.tracksA');

        trackASquares.forEach((square, i) => {
            if (ispattern32) {
                // Switch to Pattern B
                if (i < 16) {
                    square.style.display = 'block'; // Hide first 16 squares
                } else {
                    square.style.display = 'block'; // Show last 16 squares
                }
            } else {
                // Switch to Pattern A
                if (i < 16) {
                    square.style.display = 'block'; // Show first 16 squares
                } else {
                    square.style.display = 'none'; // Hide last 16 squares
                }
            }
        });
    });

    // Update the button
    pattern32utton.id = ispattern32 ? 'pattern16' : 'pattern32'; // Change id to pattern16 or pattern32
    pattern32utton.innerHTML = ispattern32 ? '16' : '32'; // Change inner HTML to A or B
}


// Add onclick event listener to the button
const pattern32utton = document.getElementById('pattern32') || document.getElementById('pattern16');
pattern32utton.onclick = togglePattern;




