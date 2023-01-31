const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

let correct = true

quoteInput.addEventListener("input" , () => {
    const arrayQuote = quoteDisplay.querySelectorAll("span");
    const arrayValue = quoteInput.value.split('');

    arrayQuote.forEach((characterSpan , index) => {
        const character = arrayValue[index];
        if(character === characterSpan.innerText) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            correct = true
        }else if(character === "") {
            characterSpan.classList.remove("incorrect");
            characterSpan.classList.remove("correct");
            correct = false
        }else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            correct = false

        }
})

    if(correct) renderNewQuote();
})

function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplay.innerText = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  })

  quoteInput.value = null;
  clear();
  startTime();
}

let startTimer = 0;
let interval;

function startTime () {
    timerElement.innerHTML = "1";
    startTimer = 1;
    interval = setInterval(() => {
        startTimer++
        timerElement.innerHTML = startTimer;
    },1000)
}

function clInterval() {
    clearInterval(interval);
}

renderNewQuote();