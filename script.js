const add = (x, y) => x + y
const subtract = (x, y) => x - y
const multiply = (x, y) => x * y
const divide = (x, y) => y === 0 ? "DON'T YOU DARE" : x / y

const operate = (op, x, y) => {
    let outcome = ''
    switch (op) {
        case '+':
            outcome = add(x, y)
            break
        case '-':
            outcome = subtract(x, y)
            break
        case '*':
            outcome = multiply(x, y)
            break
        case '/':
            outcome = divide(x, y)
            break
    }
    return outcome
}