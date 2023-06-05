/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import * as main from './main.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;
const trackSlctr = document.querySelector("#trackSelect");
const BAR_WIDTH = 10;
const MAX_BAR_HEIGHT = 175;
const PADDING = 2;
let n = 0;
const divergence = 137.5;
const c = 4;


function setupCanvas(canvasElement, analyserNodeRef) {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.frequencyBinCount);

}

function draw(params = {}, playtime) {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    analyserNode.getByteFrequencyData(audioData);
    // OR
    //analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = .1;
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1;
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    if (params.showBGImage) {
        if (document.querySelector('#trackSelect').value == "media/Nameless King.mp3") {
            let bgImage = new Image();
            bgImage.src = 'img/Archdragon_Peak.jpg';
            ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
        }
        else if (document.querySelector('#trackSelect').value == "media/Gwyn.mp3") {
            let bgImage = new Image();
            bgImage.src = 'img/kiln.jpg';
            ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
        }
        else if (document.querySelector('#trackSelect').value == "media/Ludwig.mp3") {
            let bgImage = new Image();
            bgImage.src = 'img/hunters_nightmare.jpg';
            ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
        }
        else if (document.querySelector('#trackSelect').value == "media/melania.mp3") {
            let bgImage = new Image();
            bgImage.src = 'img/haligtree.jpg';
            ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
        }
        params.customBGColor = false
        document.querySelector('#customBGCB').checked=false
    }
    
    // 4 - draw bars
    if (params.showBars) {
        if(params.showBGImage == false){
            if (document.querySelector('#trackSelect').value == "media/Nameless King.mp3") {
                ctx.fillStyle = 'black';
            }
            else if (document.querySelector('#trackSelect').value == "media/Gwyn.mp3") {
                ctx.fillStyle = 'black';
            }
            else if (document.querySelector('#trackSelect').value == "media/Ludwig.mp3") {
                ctx.fillStyle = 'grey';
            }
            else if (document.querySelector('#trackSelect').value == "media/melania.mp3") {
                ctx.fillStyle = 'green';
            }
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
        if (params.customBGColor){
            ctx.fillStyle = main.bgColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            params.showBGImage = false
            document.querySelector('#backgroundCB').checked=false
        }
        ctx.save();
        if (document.querySelector('#trackSelect').value == "media/Nameless King.mp3") {
            ctx.fillStyle = "orange";
        }
        else if (document.querySelector('#trackSelect').value == "media/Gwyn.mp3") {
            ctx.fillStyle = 'blue';
        }
        else if (document.querySelector('#trackSelect').value == "media/Ludwig.mp3") {
            ctx.fillStyle = 'red';
        }
        else if (document.querySelector('#trackSelect').value == "media/melania.mp3") {
            ctx.fillStyle = 'yellow';
        }
        if (params.customBarColor){
            ctx.fillStyle = main.barColor;
        }
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 4);
        for (let b of audioData) {
            let percent = b / 255;
            percent = percent < 0.01 ? .01 : percent;
            ctx.translate(3, 0);
            ctx.rotate(.05);
            ctx.save();
            ctx.scale(.5, -.5);
            ctx.fillRect(0, 0, BAR_WIDTH, MAX_BAR_HEIGHT * percent);
            ctx.restore();
            ctx.translate(PADDING, 0);
        }
        ctx.restore();

        for (let i = 0; i < audioData.length; i++) {
            ctx.save();
            if (i / audioData.length < playtime) {
                if (params.showGradient) {
                    ctx.fillStyle = '#0D0D0D';
                } else {
                    ctx.fillStyle = '#90DDF0';
                }
            }

            //ctx.fillRect(margin + i*(barWidth + barSpacing), topSpacing + 256-audioData[i], barWidth, barHeight);
            //ctx.strokeRect(margin + i*(barWidth + barSpacing), topSpacing + 256-audioData[i], barWidth, barHeight);
            ctx.restore();
        }
        ctx.restore();
    }
    if (params.showImage) {
        if (document.querySelector('#trackSelect').value == "media/Nameless King.mp3") {
            let bossImage = new Image();
            bossImage.src = 'img/Nameless_King.png';
            ctx.drawImage(bossImage, canvasWidth / 3.6, canvasHeight / 4, 355.556, 200);
        }
        else if (document.querySelector('#trackSelect').value == "media/Gwyn.mp3") {
            let bossImage = new Image();
            bossImage.src = 'img/gwyn.png';
            ctx.drawImage(bossImage, canvasWidth / 3.55, canvasHeight / 4, 355.556, 200);
        }
        else if (document.querySelector('#trackSelect').value == "media/Ludwig.mp3") {
            let bossImage = new Image();
            bossImage.src = 'img/ludwig.png';
            ctx.drawImage(bossImage, canvasWidth / 3.6, canvasHeight / 4, 355.556, 200);
        }
        else if (document.querySelector('#trackSelect').value == "media/melania.mp3") {
            let bossImage = new Image();
            bossImage.src = 'img/melania.png';
            ctx.drawImage(bossImage, canvasWidth / 3.6, canvasHeight / 4, 355.556, 200);
        }
    }
    
    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++) {
            let percent = audioData[i] / 255;

            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    if(params.showWaveform)
    {

        ctx.save();
        ctx.lineWidth = 4;
        if (document.querySelector('#trackSelect').value == "media/Nameless King.mp3") {
            ctx.strokeStyle = "orange";
        }
        else if (document.querySelector('#trackSelect').value == "media/Gwyn.mp3") {
            ctx.strokeStyle = 'blue';
        }
        else if (document.querySelector('#trackSelect').value == "media/Ludwig.mp3") {
            ctx.strokeStyle = 'red';
        }
        else if (document.querySelector('#trackSelect').value == "media/melania.mp3") {
            ctx.strokeStyle = 'yellow';
        }
        if (params.customBarColor){
            ctx.strokeStyle = main.barColor;
        }
        ctx.beginPath();
        let sliceWidth = canvasWidth/(audioData.length/2);

        let x = 0;

        for(let i = 0; i<audioData.length; i++)
        {
            let v = audioData[i] / 128.0;
            let y = v * canvasHeight/2;

            if(i===0)
            {
                ctx.moveTo(x,y);
            }
            else
            {
                ctx.lineTo(x,y);
            }

            x+= sliceWidth;
        }

        ctx.lineTo(canvasWidth, canvasHeight/2);
        ctx.stroke();

        ctx.restore();
    }

    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .05) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 255; // zero out the red and green and blue channels
            //data[i] = 255;// make the red channel 100% red
        } // end if

        if (params.showInvert) {
            let red = data[i],
                green = data[i + 1],
                blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    }
    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }
    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}
export {
    setupCanvas,
    draw
};