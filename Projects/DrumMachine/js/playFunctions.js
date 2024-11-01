
// BPM Functions
const bpmInput = document.getElementById('bpm');
bpmInput.addEventListener('input', function () {
    bpm = parseInt(this.value);
    intervalTime = 60000 / bpm / 4;
    if (intervalId) {
        clearInterval(intervalId);
        playBeat(); // Restart the beat with the new interval
        playBpmButton.style.opacity = '1'
    }
});

// Function to handle spacebar key press
function handleSpacebarPress(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar behavior (like scrolling)
        
        if (isPlaying) {
            stopBeat(); // Stop the beat if it's currently playing
            console.log("beatplaying")
        } else {
            playBeat(); // Start the beat if it's not currently playing
            console.log("stopplaying")

        }
    }
}

// Add event listener for the keydown event on the window
window.addEventListener('keydown', handleSpacebarPress);

// Highlight active square function
function highlightActiveSquare() {
    Object.keys(tracks).forEach(trackName => {
        // Highlight the current square
        const square = document.querySelector(`.square[data-track-name="${trackName}"][data-index="${currentStep}"]`);
    
        if (square) { // Check if the square exists
            if (tracks[trackName][currentStep]) {
                square.classList.add('playing');
            } else {
                square.classList.remove('playing');
            }
        }
    });
    // Check if the loop has completed
    if (currentStep === 15) { // End of the 16-step loop
        // Reset all squares to white
        Object.keys(tracks).forEach(trackName => {
            tracks[trackName].forEach((_, i) => {
                const square = document.querySelector(`.square[data-track-name="${trackName}"][data-index="${i}"]`);
                if (square) { // Check if the square exists
                    square.classList.remove('playing'); // Remove highlight
                }
            });
        });
    }
}

let timerInterval;
let milliseconds = 0;
let seconds = 0;
let activeIntervals = [];

// Play beat function
function playBeat() {
    // Stop all currently playing sounds
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0; 
    });

    let ispattern32 = false;
    pattern32utton.addEventListener('click', () => {
        ispattern32 = !ispattern32; // Toggle the pattern state
        console.log("pattern32")
        togglePatterns();
    });
    
    currentStep = 0; // Reset current step
    clearInterval(intervalId); 

    // startTimer();

    // Start the interval for playback
    intervalId = setInterval(() => {
        Object.keys(tracks).forEach(trackName => {
            if (tracks[trackName][currentStep]) {
                sounds[trackName].currentTime = 0; // Reset the sound
                sounds[trackName].play();
            }
        });
        highlightActiveSquare(); // Highlight active square
        
        // Change the step loop length based on the pattern
        if (ispattern32) {
            currentStep = (currentStep + 1) % 32; // Loop over 32 steps
        } else {
            currentStep = (currentStep + 1) % 16; // Loop over 16 steps
        }
    }, intervalTime); // Use dynamic interval time based on BPM
    
    // Remove highlight from all squares
    Object.keys(tracks).forEach(trackName => {
        tracks[trackName].forEach((_, i) => {
            const square = document.querySelector(`.square[data-track-name="${trackName}"][data-index="${i}"]`);
            if (square) { // Check if the square exists
                square.classList.remove('playing'); // Remove highlight
            }
        });
    });

    const playBtn = document.getElementById("play")
    playBtn.style.color = 'green';

    isPlaying = !isPlaying;
}

// Stop playback
function stopBeat() {
    clearInterval(intervalId);
    currentStep = 0;
    
    Object.keys(tracks).forEach(trackName => {
        tracks[trackName].forEach((_, i) => {
            const square = document.querySelector(`.square[data-track-name="${trackName}"][data-index="${i}"]`);
            if (square) { // Check if the square exists
                square.classList.remove('playing'); // Remove highlight
            }
        });
    });
    console.log("stop")
    const playBtn = document.getElementById("play")
    playBtn.style.color = 'white';
    // stopTimer();
    playBpmButton.style.opacity = '1'

    isPlaying = !isPlaying;
}


// Record function
document.getElementById('record').addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') return; // Prevent starting a new recording if already recording
    
    recordedChunks = []; // Clear previous recordings
    const destination = audioContext.createMediaStreamDestination();
    const outputStream = destination.stream;
    
    mediaRecorder = new MediaRecorder(outputStream);
    mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
    recordedChunks.push(event.data);
    }
    };
    
    mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recording.wav';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    };
    
    // Connect sounds to the audio context
    Object.values(sounds).forEach(sound => {
    const source = audioContext.createMediaElementSource(sound);
    source.connect(destination);
    sound.play(); // Play sound
    });
    
    mediaRecorder.start();
    
    // Stop recording after 30 seconds
    setTimeout(() => {
    mediaRecorder.stop();
    stopBeat(); // Stop playback if it's running
    }, 30000); // 30 seconds
    });



// Event listeners for play and pause buttons
document.getElementById('play').addEventListener('click', playBeat);
document.getElementById('pause').addEventListener('click', stopBeat);