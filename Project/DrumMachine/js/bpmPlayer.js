const playBpmButton = document.getElementById('playBpm');

let isPlaying = false;

// Function to play the metronome sound
function playMetronome(bpm) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency for metronome sound
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Sound duration
}

// Function to start/stop the metronome
function toggleMetronome() {
    if (isPlaying) {
        clearInterval(intervalId);
        isPlaying = false;
        playBpmButton.style.opacity = '1'; // Reset opacity to 100%
    } else {
        const bpm = parseInt(bpmInput.value, 10);
        const interval = 60000 / bpm; // Calculate interval in milliseconds

        intervalId = setInterval(() => {
            playMetronome(bpm);
        }, interval);

        isPlaying = true;
        playBpmButton.style.opacity = '0.5'; // Set opacity to 50%
    }
}

// Event listener for the play button
playBpmButton.addEventListener('click', toggleMetronome);
