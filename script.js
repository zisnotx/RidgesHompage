// Multi-Calculator Suite JavaScript

// ==================== Basic Calculator ====================
let basicCurrentOperand = '';
let basicPreviousOperand = '';
let basicOperation = undefined;

function basicUpdateDisplay() {
    document.getElementById('basic-current').innerText = basicCurrentOperand || '0';
    document.getElementById('basic-prev').innerText = basicPreviousOperand + (basicOperation ? ' ' + basicOperation : '');
}

function basicAppendNumber(number) {
    if (number === '.' && basicCurrentOperand.includes('.')) return;
    basicCurrentOperand = basicCurrentOperand.toString() + number.toString();
    basicUpdateDisplay();
}

function basicChooseOperation(operation) {
    if (basicCurrentOperand === '') return;
    if (basicPreviousOperand !== '') {
        basicCompute();
    }
    basicOperation = operation;
    basicPreviousOperand = basicCurrentOperand;
    basicCurrentOperand = '';
    basicUpdateDisplay();
}

function basicCompute() {
    let computation;
    const prev = parseFloat(basicPreviousOperand);
    const current = parseFloat(basicCurrentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (basicOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    basicCurrentOperand = computation.toString();
    basicOperation = undefined;
    basicPreviousOperand = '';
    basicUpdateDisplay();
}

function basicClear() {
    basicCurrentOperand = '';
    basicPreviousOperand = '';
    basicOperation = undefined;
    basicUpdateDisplay();
}

function basicDelete() {
    basicCurrentOperand = basicCurrentOperand.toString().slice(0, -1);
    basicUpdateDisplay();
}

// ==================== Logarithmic Calculator ====================
function calculateLog() {
    const input = document.getElementById('log-input');
    const baseSelect = document.getElementById('log-base');
    const resultDisplay = document.getElementById('log-result');
    const infoDisplay = document.getElementById('log-info');
    
    const value = parseFloat(input.value);
    const base = parseFloat(baseSelect.value);
    
    if (isNaN(value) || value <= 0) {
        resultDisplay.innerText = 'Error';
        infoDisplay.innerText = 'Please enter a positive number';
        return;
    }
    
    let result;
    let baseName;
    
    if (base === 10) {
        result = Math.log10(value);
        baseName = 'log₁₀';
    } else if (base === 2.718281828459045) {
        result = Math.log(value);
        baseName = 'ln';
    } else if (base === 2) {
        result = Math.log2(value);
        baseName = 'log₂';
    } else {
        result = Math.log(value) / Math.log(base);
        baseName = `log${base}`;
    }
    
    resultDisplay.innerText = result.toFixed(6).replace(/\.?0+$/, '');
    infoDisplay.innerHTML = `<strong>${baseName}(${value})</strong> = ${result}<br>Base: ${baseSelect.options[baseSelect.selectedIndex].text}`;
}

// ==================== Factorization Calculator ====================
function primeFactorization(n) {
    const factors = [];
    
    // Handle 2 separately
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }
    
    // Check odd numbers up to sqrt(n)
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
    }
    
    // If n is a prime > 2
    if (n > 2) {
        factors.push(n);
    }
    
    return factors;
}

function calculateFactors() {
    const input = document.getElementById('factor-input');
    const resultDisplay = document.getElementById('factor-result');
    const display = document.getElementById('factor-display');
    
    const value = parseInt(input.value);
    
    if (isNaN(value) || value < 2) {
        resultDisplay.innerText = 'Error';
        display.innerText = 'Please enter an integer ≥ 2';
        return;
    }
    
    const factors = primeFactorization(value);
    
    if (factors.length === 1) {
        resultDisplay.innerText = 'Prime Number';
        display.innerHTML = `<strong>${value}</strong> is prime!<br>Factors: ${value}`;
    } else {
        // Format as powers
        const factorCounts = {};
        factors.forEach(f => {
            factorCounts[f] = (factorCounts[f] || 0) + 1;
        });
        
        let formattedFactors = [];
        for (const [factor, count] of Object.entries(factorCounts)) {
            if (count === 1) {
                formattedFactors.push(factor);
            } else {
                formattedFactors.push(`${factor}^${count}`);
            }
        }
        
        resultDisplay.innerText = `${factors.length} prime factors`;
        display.innerHTML = `<strong>${value}</strong> = ${formattedFactors.join(' × ')}<br>Prime factors: ${factors.join(', ')}`;
    }
}

// ==================== Trigonometric Calculator ====================
function calculateTrig(func) {
    const input = document.getElementById('trig-input');
    const unitSelect = document.getElementById('trig-unit');
    const resultDisplay = document.getElementById('trig-result');
    
    const angle = parseFloat(input.value);
    const unit = unitSelect.value;
    
    if (isNaN(angle)) {
        resultDisplay.innerText = 'Error';
        return;
    }
    
    // Convert to radians if input is in degrees
    let angleInRadians = angle;
    if (unit === 'deg') {
        angleInRadians = angle * Math.PI / 180;
    }
    
    let result;
    let funcSymbol;
    
    switch (func) {
        case 'sin':
            result = Math.sin(angleInRadians);
            funcSymbol = 'sin';
            break;
        case 'cos':
            result = Math.cos(angleInRadians);
            funcSymbol = 'cos';
            break;
        case 'tan':
            // Check for asymptotes
            const cosValue = Math.cos(angleInRadians);
            if (Math.abs(cosValue) < 1e-10) {
                resultDisplay.innerText = 'Undefined';
                return;
            }
            result = Math.tan(angleInRadians);
            funcSymbol = 'tan';
            break;
        default:
            return;
    }
    
    resultDisplay.innerText = result.toFixed(10).replace(/\.?0+$/, '');
}

// ==================== Section Selection ====================
function selectCalculator(section) {
    // Update tab buttons
    document.querySelectorAll('.selector-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.target === section) {
        btn.classList.add('active');
        }
    });
    
    // Hide all calculator sections with fade out
    document.querySelectorAll('.calculator-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section with fade in
    const selectedSection = document.getElementById(section + '-section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger calculations for input-based calculators
    document.getElementById('log-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateLog();
    });
    
    document.getElementById('factor-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateFactors();
    });
    
    document.getElementById('trig-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            // Default to sin if Enter is pressed
            calculateTrig('sin');
        }
    });
    
    // Select first calculator by default
    selectCalculator('basic');
    
    // Prevent section click from interfering with calculator buttons
    document.querySelectorAll('.calculator-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});