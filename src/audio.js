import * as main from './main.js';

// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode, resetPoint, source;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 256
});
let highPass = Object.seal({
    freq: 12000,
    q: 0.5,
});

let lowPass = Object.seal({
    freq: 100,
    q: 0.5,
});

let highShelf = Object.seal({
    freq: 5000.0,
    gain: 15,
});

let lowShelf = Object.seal({
    freq: 100.0,
    gain: 15,
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);
let highPassFilter;
let lowPassFilter;
let highBiquadFilter;
let lowBiquadFilter

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
function setupWebAudio(filePath) {
    // 1 - The || is because WebAudio has not been standardized across browsers yet
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    // 2 - this creates an <audio> element
    element = new Audio();

    // 3 - have it point at a sound file
    loadSoundFile(filePath);

    // 4 - create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // 5 - create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode = audioCtx.createAnalyser();
    /*
    // 6
    We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
    across the sound spectrum.

    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
    the amplitude of that frequency.
    */
    analyserNode.fftSize = DEFAULTS.numSamples;
    // fft stands for Fast Fourier Transform

    // 7 - create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    highPassFilter = audioCtx.createBiquadFilter();
    highPassFilter.type = "highpass";
    highPassFilter.frequency.setValueAtTime(0, audioCtx.currentTime);
    highPassFilter.Q.setValueAtTime(highPass.q, audioCtx.currentTime);

    highBiquadFilter = audioCtx.createBiquadFilter();
	highBiquadFilter.type = "highshelf";
	highBiquadFilter.frequency.setValueAtTime(22000.0, audioCtx.currentTime);
	highBiquadFilter.gain.setValueAtTime(highShelf.gain, audioCtx.currentTime);

    lowPassFilter = audioCtx.createBiquadFilter();
    lowPassFilter.type = "lowpass";
    lowPassFilter.frequency.setValueAtTime(22000, audioCtx.currentTime);
    lowPassFilter.Q.setValueAtTime(lowPass.q, audioCtx.currentTime);

    lowBiquadFilter = audioCtx.createBiquadFilter();
    lowBiquadFilter.type = "lowshelf";
    lowBiquadFilter.frequency.setValueAtTime(0.0, audioCtx.currentTime);
	lowBiquadFilter.gain.setValueAtTime(lowShelf.gain, audioCtx.currentTime);

    // 8 - connect the nodes - we now have an audio graph
    sourceNode.connect(highBiquadFilter);
    highBiquadFilter.connect(lowBiquadFilter);
    lowBiquadFilter.connect(highPassFilter);
    highPassFilter.connect(lowPassFilter);
    lowPassFilter.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

}

function loadSoundFile(filePath) {
    element.src = filePath;
}

function getSoundFilePath(filePath) {
    console.log(filePath);
    return filePath;
}

function playCurrentSound() {
    element.play();
}

function pauseCurrentSound() {
    element.pause();
}

function currentDuration() {
    return element.duration;
}

function currentPlayTime() {
    return element.currentTime;
}

function setCurrentPlayTime(newPlayTime) {
    element.currentTime = newPlayTime;
}

function resetPlayTime() {
    element.currentTime = 0;
}

function getPlayPercent() {
    let playPercent = element.currentTime / element.duration;
    return playPercent;
}

function setVolume(value) {
    value = Number(value);
    gainNode.gain.value = value;
}

function setResetPoint() {
    resetPoint = element.currentTime;
}

function gotoResetPoint() {
    if (resetPoint) {
        element.currentTime = resetPoint;
    } else {
        element.currentTime = 0;
    }
}

function toggleHighShelf(highShelfToggle) {
    if (highShelfToggle) {
        highBiquadFilter.frequency.setValueAtTime(5000.0, audioCtx.currentTime);
        highBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
    } else {
        highBiquadFilter.frequency.setValueAtTime(1, audioCtx.currentTime);
        highBiquadFilter.gain.setValueAtTime(.5, audioCtx.currentTime);
    }
}

function toggleLowShelf(lowShelfToggle) {
    if (lowShelfToggle) {
        lowBiquadFilter.frequency.setValueAtTime(100.0, audioCtx.currentTime);
        lowBiquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    } else {
        lowBiquadFilter.frequency.setValueAtTime(1, audioCtx.currentTime);
        lowBiquadFilter.gain.setValueAtTime(.5, audioCtx.currentTime);
    }
}

function toggleHighPass(highPassToggle){
    if(highPassToggle){
        highPassFilter.frequency.setValueAtTime(highPass.freq, audioCtx.currentTime);
        highPassFilter.Q.setValueAtTime(highPass.q, audioCtx.currentTime);
    }else{
        highPassFilter.frequency.setValueAtTime(0, audioCtx.currentTime);
        highPassFilter.Q.setValueAtTime(0, audioCtx.currentTime);
    }
}

function toggleLowPass(lowPassToggle){
    if(lowPassToggle){
        lowPassFilter.frequency.setValueAtTime(lowPass.freq, audioCtx.currentTime);
        lowPassFilter.Q.setValueAtTime(lowPass.q, audioCtx.currentTime);
    }else{
        lowPassFilter.frequency.setValueAtTime(22000, audioCtx.currentTime);
        lowPassFilter.Q.setValueAtTime(0, audioCtx.currentTime);
    }
}
function play(params = {}){
    if(params.highShelf){
        toggleHighShelf(true)
    }
    else{
        toggleHighShelf(false)
    }
    if(params.lowShelf){
        toggleLowShelf(true)
    }
    else{
        toggleLowShelf(false)
    }
    if(params.highPass){
        toggleHighPass(true)
    }
    else{
        toggleHighPass(false)
    }
    if(params.lowPass){
        toggleLowPass(true)
    }
    else{
        toggleLowPass(false)
    }
}
// make sure that it's a Number rather than a String

export {
    audioCtx,
    setupWebAudio,
    playCurrentSound,
    pauseCurrentSound,
    loadSoundFile,
    setVolume,
    analyserNode,
    currentPlayTime,
    currentDuration,
    getSoundFilePath,
    setCurrentPlayTime,
    resetPlayTime,
    setResetPoint,
    gotoResetPoint,
    getPlayPercent,
    play
};