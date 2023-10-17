
const displayAlphabet = async (word) => {
    alphabetList.textContent=""
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i=0;i<alphabet.length;i++){
        const letter = alphabet[i]
        const letterButton = document.createElement('BUTTON')
        letterButton.textContent = letter
        alphabetList.appendChild(letterButton)
        letterButton.addEventListener("click", () => {
            let correct = checkLetter(letter,word)
            if (correct==true){
                letterButton.disabled = true
                letterButton.className = "correct"
            } else {
                letterButton.disabled = true
                letterButton.className = "incorrect"
            }
        })
    }
}

const checkLetter = (letter,word) => {
    let correct=false
    word = word.toLowerCase()
    letter = letter.toLowerCase()
    for (let i=0;i<word.length;i++){
        if (word[i]==letter){
            hiddenWord.childNodes[i].textContent=letter
            correct=true
        } 
    }

    if (correct==false){
        getHangmanImage() 
    }

    if (hiddenWord.textContent==word){
        showResults(true)
    }

    return correct
}

const getHangmanImage = () => {
    hangManImage.textContent=""
    let img = document.createElement('img')
    if (chances>0){
        chances-=1
        img.src=`./assets/hangmans/hangman-${chances}.png`
        img.alt="hangman stick man image"
        hangManImage.appendChild(img)
    } else {
        showResults(false)
        //show full word - definition from dictionary api?
        //display text
    }
}

const showResults = (win) => {
    if (win==true){
        alert('Correct')
    } else {
        alert ('Game Over')
    }
}

const displayWord = (word) => {
    for (let i=0;i<word.length;i++){
        const letter = word[i]
        const blankWord = document.createElement('p')
        if (i!==word.length){
            blankWord.textContent += "_ "
        } else {
            blankWord.textContent += "_"
        }
        hiddenWord.appendChild(blankWord)
    }
}

const getRandomWord = async () => {
    chances=10
    hiddenWord.textContent=""
    hangManImage.textContent=""
    try{
        const resp = await fetch("https://random-word-api.herokuapp.com/word")
        if (resp.ok) {
            const word = await resp.json()
            console.log(word[0])
            displayWord(word[0])
            displayAlphabet(word[0])
            return word[0]
        } else {
            throw "Error: http status code = " + resp.status
        }
    } catch (err){
        console.log(err)
        alert("Unable to generate random word")
    }
}

const randomWordButton = document.querySelector("#randomWord")

const hiddenWord = document.querySelector(".hiddenWord")

const alphabetSection = document.querySelector(".alphabet")
const alphabetList = document.querySelector(".alphabet ul")

const hangManImage =  document.querySelector(".hangman a")

let chances = 10

randomWordButton.addEventListener("click", getRandomWord)

