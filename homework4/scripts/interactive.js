// start or stop the graph animation

const start_pause_btn = document.getElementById('button-start-stop');

start_pause_btn.addEventListener('click', () => {
    if (!window.isRunning) {
        start_pause_btn.textContent = 'Pause Animation';
        window.startAnimation();
    }
    else{
        start_pause_btn.textContent = 'Start Animation';
        window.stopAnimation();
    }
});

// adjust speed with slider
const speedSlider = document.getElementById('speedSlider');
const BASE_DELAY = 2000;
const MIN_DELAY = 100;

// convert slider value to delay time
function getDelayFromSlider(value){
    const normalized = value / 10;
    return BASE_DELAY - normalized * (BASE_DELAY - MIN_DELAY);
}

speedSlider.addEventListener('input', () => {
    if (!window.isRunning) {
        return;
    }
    clearInterval(window.intervalId);

    const delay = getDelayFromSlider(speedSlider.value);

    window.intervalId = setInterval(() => {
        generateNewValue();
        draw();
    }, delay);
});

// hide/show horizontal lines
const hide_horizontal_lines = document.getElementById('hide-horizontal');

hide_horizontal_lines.addEventListener('click', () => {
    window.showHorizontalLines = !window.showHorizontalLines;

    hide_horizontal_lines.textContent = window.showHorizontalLines ? 'Hide Horizontal' : 'Show Horizontal';
    draw();
});

// hide/show vertical lines
const hide_vertical_lines = document.getElementById('hide-vertical');
hide_vertical_lines.addEventListener('click', () => {
    window.showVerticalLines = !window.showVerticalLines;
    
    hide_vertical_lines.textContent = window.showVerticalLines ? 'Hide Vertical' : 'Show Vertical';
    draw();
});

// export chart as image
const export_chart = document.getElementById('export');
export_chart.addEventListener('click', () => {
    const canvas = document.getElementById('chartCanvas');
    const dataURL = canvas.toDataURL('image/png');

    // create fake link to trigger download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'chart.png';

    link.click();
});

// toggle themes
const themeSelector = document.getElementById('theme-selector');

themeSelector.addEventListener('change', () => {
    document.body.classList.remove('light', 'dark', 'contrast');
    document.body.classList.add(themeSelector.value);

    draw();
});

// toggle between line and bar chart
const toggleBarChartBtn = document.getElementById('toggle-chart');

toggleBarChartBtn.addEventListener('click', () => {
    if (window.chartType === 'line') {
        window.chartType = 'bar';
        toggleBarChartBtn.textContent = 'Line Chart';
    }
    else {
        window.chartType = 'line';
        toggleBarChartBtn.textContent = 'Bar Chart';
    }
    draw();
})

