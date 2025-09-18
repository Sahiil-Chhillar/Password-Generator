const pwdDisplay = document.querySelector('#display-pwd');
const inputSlider = document.querySelector('#pwd-slider');
const lengthDisplay = document.querySelector('#display-value');
const copyBtn = document.querySelector('#copy-btn');
const displayCopied = document.querySelector("#copy-msg");
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('#pwd-strength-circle');
const generateBtn = document.querySelector('#generate-btn');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

const symbols = '`~!@#$%^&*()_{}[];:|\\<>,./'; 
let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
function handleSlider() { 
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// function to take random integer from a range 
function getRndmInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// function to take random uppercase
function generateRndmUppercase() {
    return String.fromCharCode(getRndmInteger(65, 91));
}

// function to take random lowercase
function generateRndmLowercase() {
    return String.fromCharCode(getRndmInteger(97, 123));
}

// function to take random number
function generateRndmNumber() {
    return getRndmInteger(0, 10).toString();
}

// function to take a random symbol
function generateRndmSymbol() {
    const rndmNum = getRndmInteger(0, symbols.length);
    return symbols.charAt(rndmNum);
}

function calStrength() {
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasNumber = numbersCheck.checked;
    let hasSymbol = symbolsCheck.checked;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function setCopyMsg() {
    try {
        await navigator.clipboard.writeText(pwdDisplay.value);
        displayCopied.textContent = "Copied";  
    } catch (e) {
        displayCopied.textContent = "Try Later !!";  
    }

    displayCopied.classList.add("active");
    setTimeout(() => {
        displayCopied.classList.remove("active");
    }, 2000);
}

function handleCheckboxChange() {
    checkCount = 0;
    allCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (pwdDisplay.value) setCopyMsg();
});

function shufflePassword(array) {
    // Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array.join('');
}

generateBtn.addEventListener('click', () => {
    // None Box is selected 
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(generateRndmUppercase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateRndmLowercase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRndmNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateRndmSymbol);
    }

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let rndmIndex = getRndmInteger(0, funcArr.length);
        password += funcArr[rndmIndex]();
    }

    password = shufflePassword(Array.from(password));

    // Debug log
    console.log("Generated password:", password);

    pwdDisplay.value = password;

    calStrength();
});


function hello(){
    for(int i = 0; i < 100;i++){} 
};

hello();
