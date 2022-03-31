// Control appheight to keep 100vh in browser correctly on most browsers
const getAppHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
getAppHeight()
window.addEventListener('resize', () => getAppHeight());

// Calculation functions and operator
const add = (x, y) => x + y
const subtract = (x, y) => x - y
const multiply = (x, y) => x * y
const divide = (x, y) => y === 0 ? 'zero' : x / y
const operate = (op, x, y) => {
    let outcome = ''
    x = parseFloat(x)
    y = parseFloat(y)
    switch (op) {
        case 'add':
            outcome = add(x, y)
            break
        case 'subtract':
            outcome = subtract(x, y)
            break
        case 'multiply':
            outcome = multiply(x, y)
            break
        case 'divide':
            outcome = divide(x, y)
            break
    }
    return outcome === 'zero' ? "DON'T YOU DARE" : Math.round(outcome * 10000000000) / 10000000000
}

// Initialisation of general variables
const display = document.querySelector('#displayText') // Get display to be updated
let currentNumber = '' // Memory storage for the number currently being entered
let prevNumber = '' // Memory storage for the previous number when second number in equation is entered
let operator = '' // Stores which operator was last clicked
let isSeparated = false // Stores whether the current number is separated already
let isOperated = false // Check whether current number comes from after an equation
display.innerText = 0 // Set display text to 0 initially


// Handler functions 
// As usually an updated currentNumber means the display.innerText is updated the same, a function to do both.
const updateCurrent = (input) => {
    currentNumber = input
    display.innerText = input
}

// If the number entered is too large to fit on the display, the calculator is reset.
const checkLargeNumber = () => {
    if (display.clientHeight > display.parentNode.clientHeight) {
        handleClear()
        display.innerText = 'Too many digits. Cannot compute.'
    }
    return
}

// Handles when a number key is pushed, either on the calculator or by keys.
// The first If statement leads to a reset of the number if it's the solution of a previous equation.
// The second If statement ensures correct handling of the . separator.
const handleNumber = num => {
    if (isOperated) {
        handleClear()
        isOperated = false
    }
    if (isSeparated && !currentNumber.includes('.')) {
        updateCurrent(currentNumber + '.' + num)
    } else {
        updateCurrent(currentNumber + num)
    }
    checkLargeNumber()
}

// Handles when an operator key is pushed, either on the calculator or by keys.
// First If statement ensures the previous inputs are calculated provided they are all there.
// The operator is set to the key pressed.
// The prevNumber is populated so currentNumber can be emptied and readied for the next inputs.
const handleOperator = op => {
    isSeparated = false
    isOperated = false
    if (operator && currentNumber && prevNumber) {
        updateCurrent(operate(operator, prevNumber, currentNumber))
    }
    if (currentNumber) operator = op
    prevNumber = currentNumber
    currentNumber = ''
}

// Operates the calculation *only* if all required inputs are provided.
const handleEquals = () => {
    if (operator && currentNumber && prevNumber) {
        updateCurrent(operate(operator, prevNumber, currentNumber))
        operator = ''
        prevNumber = ''
        isOperated = true
    }
}

// Resets all variables.
const handleClear = () => {
    currentNumber = ''
    operator = ''
    prevNumber = ''
    display.innerText = 0
    isSeparated = false
    isOperated = false
}

// Removes last digit on the currentNumber.
const handleDelete = () => updateCurrent(currentNumber.slice(0, -1))

// Turns a positive currentNumber into a negative one and vice versa.
const handleNegative = () => updateCurrent(currentNumber * -1)

// Sets the currentNumber up to include a . separator after the next number is entered.
const handleSeparator = () => isSeparated = true

// Button event listener linking inputs to handler functions.
const buttons = document.querySelectorAll('.btn')
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('number')) handleNumber(this.innerText)
        if (this.classList.contains('operator')) handleOperator(this.id)
        if (button.id === 'clear') handleClear()
        if (button.id === 'equals') handleEquals()
        if (button.id === 'negative') handleNegative()
        if (button.id === 'separator') handleSeparator()
        if (button.id === 'delete') handleDelete()
    })
})

// Key event listener linking inputs to handler functions.
document.addEventListener('keydown', (e) => {
    const key = e.key
    if (Number.isInteger(+key) && key !== ' ') handleNumber(key)
    if (key === '*') handleOperator('multiply')
    if (key === '-') handleOperator('subtract')
    if (key === '+') handleOperator('add')
    if (key === '/') handleOperator('divide')
    if (key === ' ' || key === 'Enter' || key === '=') handleEquals()
    if (key === 'Escape') handleClear()
    if (key === '.') handleSeparator()
    if (key === 'Backspace' || key === 'Delete') handleDelete()
})