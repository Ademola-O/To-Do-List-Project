// ---- Getting the chart area ---------------------------------------
// stores '<canvas id="portfolioChart"></canvas>' in 'ctx'
// const meaning it cannot be changed
const ctx = document.getElementById('portfolioChart');

// --- Creating a new chart object -------------------------
// 'ctx' tells the system where to put the chart
// 'type: line' tells the system to make a line graph
// 'data: {' section contains all the information to be shown on the graph 
// 'labels' has all the labels shown on the bottom of the chart.
// So x-Axis shows 'Mon, Tue, wed, Thur, Fri, Sat, Sun. 
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],

        // 'datasets: [{' is where you put the actual informtion you wish to be plotted on the graph
        datasets: [{

            // 'label: 'Portfolio Growth', is the name shown in the chart legend so users know what 
            // line represents. 
            label: 'Portfolio Growth',

            // 'data: [120000, 122000...]', are the values plotted on the chart.
            data: [120000,122000,121500,124000,126500,127000,128430],

            // 'borderWidth: 3' controls line thickness
            borderWidth: 3,

            // 'tension: 0.4' controls curvature of line
            tension: 0.4,

            // Fills the area underneath the line, without this only line displays 
            fill: true
        }]
    },

    // 'options: {' controls the appearence and behavior of chart
    // 'responsive: true' makes the chart resize automatically on different screen sizes.
    // 'maintainAspectRatio: false' allows chart to stretch to fit container.
    // 'plugin: {' this is where extra chart features are controlled.
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#9ca3af'
                }
            }
        },
        
        // 'scales: {' controls the chart axes to change the color or make other desired changes.
        scales: {
            y: {
                ticks: {
                    color: '#9ca3af'
                }
            },
            x: {
                ticks: {
                    color: '#9ca3af'
                }
            }
        }
    }
});


// ---- buyStock() Function -------------------------------------------
function buyStock(){

    // Getting the selected stock from the '<select id="stockSelect"' dropdown menu
    // '.value' gets the currently selected value.
    const stock = document.getElementById('stockSelect').value;
    const quantity = document.getElementById('quantity').value;

    // -- Validation ---------------------
    // Checks if input box is empty or if user enters invalid data, then shows 
    // an alert and then stops the function.
    if(quantity === '' || quantity <= 0){
        alert('Please enter a valid quantity');
        return;
    }

    // If conditions arent met a success alert is shown, created using template literals
    // to insert variable values into the sentence.
    alert(`Successfully purchased ${quantity} shares of ${stock}`);
}


// ---- sellStock() -----------------------------------------------------------
// Sell stock. function is almost identical to buyStock(). Only difference is the 
// final message.
function sellStock(){
    const stock = document.getElementById('stockSelect').value;
    const quantity = document.getElementById('quantity').value;

    if(quantity === '' || quantity <= 0){
        alert('Please enter a valid quantity');
        return;
    }
    alert(`Successfully sold ${quantity} shares of ${stock}`);
}

// ---- Theme Button -------------------------------------------
// Gets the dark/light mode button from the webpage
const themeBtn = document.getElementById('themeBtn');

// Stores whether dark mode is currently active
// let instead of const because this value changes later
let darkMode = true;

// listens for a event (in this case the event is a mouse click)
// arrow function '()=>{' is just a shorter way to write a function.
themeBtn.addEventListener('click',()=>{

    // 'document.body.classList.toggle('light');' adds or removes the CSS class from the webpage 
    body
    document.body.classList.toggle('light');

    // logical ! NOT operator flips the darkMode variable from true to false
    darkMode = !darkMode;

    // Ternary Operator (shortend if statment) 
    // if darkMode is ON - show '☀' else show '🌙'.
    themeBtn.innerHTML = darkMode ? '☀' : '🌙';

});
