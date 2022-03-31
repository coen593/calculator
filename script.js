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
const updateCurrent = (input) => {
    currentNumber = input
    display.innerText = input
}

const checkLargeNumber = () => {
    if (display.clientHeight > display.parentNode.clientHeight) {
        handleClear()
        display.innerText = 'Too many digits. Cannot compute.'
    }
    return
}

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

const handleEquals = () => {
    if (operator && currentNumber && prevNumber) {
        updateCurrent(operate(operator, prevNumber, currentNumber))
        operator = ''
        prevNumber = ''
        isOperated = true
    }
}

const handleClear = () => {
    currentNumber = ''
    operator = ''
    prevNumber = ''
    display.innerText = 0
    isSeparated = false
    isOperated = false
}

const handleDelete = () => updateCurrent(currentNumber.slice(0, -1))

const handleNegative = () => updateCurrent(currentNumber * -1)

const handleSeparator = () => isSeparated = true

// Button event listeners linking to handler functions
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

document.addEventListener('keydown', (e) => {
    const key = e.key
    console.log(key)
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