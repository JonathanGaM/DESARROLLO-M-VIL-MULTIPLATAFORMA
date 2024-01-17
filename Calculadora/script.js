
let displayValue = ""; 

function clearAll() {
    displayValue = "";
    updateDisplay();
}

function clearLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function appendCharacter(character) {
    displayValue += character;
    updateDisplay();
}

function calculateResult() {
    try {
        const result = eval(displayValue); 
        displayValue = result;
        updateDisplay();
    } catch (error) {
        displayValue = "Error";
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById("display").value = displayValue;
}
