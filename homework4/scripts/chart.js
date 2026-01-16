window.onload = function() {
    // canvas setup
    let canvas = document.getElementById('chartCanvas');
    let context = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    // grid and spacing settings
    let xIncrement = 150;
    let yIncrement = 100;
    let valueIncrement = 20;
    let textOffset = 5;

    // these need to be global so interactive.js can use them
    window.intervalId = null;
    window.isRunning = false;
    window.showHorizontalLines = true;
    window.showVerticalLines = true;

    window.chartType = 'line';
    

    let data = [];

    // start the animation
    function startAnimation() {
    if (window.isRunning) { 
        return;
    }
    window.isRunning = true;
    const delay = getDelayFromSlider(speedSlider.value);
    window.intervalId = setInterval(() => {
        generateNewValue();
        draw();
        }, delay);
    }

    // get css variables for themes
    function getCssVar(name){
        return getComputedStyle(document.body)
        .getPropertyValue(name)
        .trim();
    }

    function stopAnimation() {
        window.isRunning = false;
        clearInterval(window.intervalId);
        window.intervalId = null;
    }

    window.startAnimation = startAnimation;
    window.stopAnimation = stopAnimation;

    // draw vertical grid lines
    function drawVerticalLines()
    {
        context.strokeStyle = getCssVar('--grid-color');
        context.lineWidth = 1;
        
        for(let i = 0; i< width; i += xIncrement)
        {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, height);
            context.stroke();
        }
    }

    // draw horizontal grid lines
    function drawHorizontalLines()
    {
        context.strokeStyle = getCssVar('--grid-color');
        context.lineWidth = 1;

        for (let i = 0; i < height; i += yIncrement)
        {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(width, i);
            context.stroke();
        }
    }

    // this draws the main line chart
    function drawChart()
    {
        context.strokeStyle = getCssVar('--chart-main');
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(0, height - data[0]);

        for (let i = 1; i < data.length; i++)
        {
            context.lineTo(i * valueIncrement, height - data[i]);
        }

        context.stroke();
    }

    // bar chart version
    function drawBarChart(){
        const barWidth = valueIncrement * 0.5;
        const gap = valueIncrement * 0.3;

        context.fillStyle = getCssVar('--chart-main');

        for(let i = 0; i < data.length; i++){
            const x = i * valueIncrement + gap /2;
            const y = height - data[i];
            const barHeight = data[i];

            context.fillRect(x,y,barWidth,barHeight);
        }
    }

    // draws curve lines with randomVal step
    function drawRandom(randomVal, color){
        context.strokeStyle = color;
        context.lineWidth = 5;

        context.lineJoin = 'round';
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(0, height - data[0]);

        for(let i = randomVal; i < data.length - randomVal; i += randomVal){
            const x1 = i * valueIncrement;
            const y1 = height - data[i];

            const x2 = (i + randomVal) * valueIncrement;
            const y2 = height - data[i + randomVal];

            const xc = (x1 + x2) / 2;
            const yc = (y1 + y2) / 2;

            context.quadraticCurveTo(x1,y1,xc,yc);
        }
        context.lineTo(
            (data.length - 1) * valueIncrement,
            height - data[data.length - 1]
        );
        context.stroke();
    }

    // labels on the left side
    function drawVerticalLabels()
    {
        for (let i = 0; i < height; i += yIncrement)
        {
            context.strokeText(height - i, textOffset, i + 2 * textOffset);
        }
    }

    // labels on the bottom
    function drawHorizontalLabels()
    {
        for (let i = 0; i < width; i+=xIncrement)
        {
            context.strokeText(i, i + textOffset, height - textOffset);
        }
    }

    function generateRandomNumber()
    {
        return Math.floor(Math.random() * height); // random height value
    }

    // fill array with random data
    function generateData()
    {
        for (let i = 0; i <= width; i+= valueIncrement)
        {
            data[i/valueIncrement] = generateRandomNumber();
        }
    }

    // main draw function - redraws everything
    function draw()
    {
        context.clearRect(0, 0, width, height);

        if (window.showVerticalLines) {
            drawVerticalLines();
        }
        
        if(window.chartType === 'line'){
            drawRandom(5, getCssVar("--chart-1"));
            drawRandom(7, getCssVar("--chart-2"));
            drawRandom(6, getCssVar("--chart-3"));
        }
        if (window.showHorizontalLines) {
            drawHorizontalLines();
        }

        drawVerticalLabels();
        drawHorizontalLabels();
        
        if (window.chartType === 'line') {
            drawChart();
        }
        else {
            drawBarChart();
        }
        
    }

    // add new value and remove oldest
    function generateNewValue()
    {
        let newValue = generateRandomNumber();
        data.push(newValue);
        data.shift();
    }

    window.generateNewValue = generateNewValue;
    window.draw = draw;
    generateData();
    draw(); // initial draw
}