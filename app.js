const RANDOM_QUOTE_API_ULR = "http://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

let correct = true

quoteInput.addEventListener("input" , () => {
   const arrayQuote =  quoteDisplay.querySelectorAll("span");
   const arrayValue = quoteInput.value.split('');
   
   arrayQuote.forEach((characterSpan , index) => {
    const character = arrayValue[index];
    if(character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
        correct = true
    } else if (character === "") {
        characterSpan.classList.remove("incorrect");
        correct = false
        characterSpan.classList.remove("correct");
    } else {
        characterSpan.classList.add("incorrect");
        characterSpan.classList.remove("correct");
        correct = false
    }
   })

   if(correct) renderNewQuote();
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_ULR)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNewQuote () {
    const quote = await getRandomQuote();
    quoteDisplay.innerText = "";
    quote.split('').forEach(character => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    })
    quoteInput.value = null;
    startTimer();
}

let startTime
function startTimer () {
    timerElement.innerText = 0
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    },1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();
