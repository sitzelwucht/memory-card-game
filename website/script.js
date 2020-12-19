
const allPairs = [ '⁑', '᨞', '᪠', '᪣', '࿓', '๏', '๛', '᯼', '᰿', '᯽', '᯾', '◻', '⟠', '⟔', '⤌', '⤍', '⧊','⧆' ]

let openedCards = []
let moves = 0
let sec, min, interval 
let matches = []

const timeInfo = document.querySelector('#time-display')
const movesInfo = document.querySelector('#moves-display')



document.querySelector('#btn').addEventListener('click', () => {
   selectSize()

})

// set up DOM elements

function prepareGame() {
    clearInterval(interval)
    document.querySelector('#refresh').classList.remove('hidden')
    document.querySelector('.score-board').classList.remove('hidden')
    document.querySelector('.size-select').classList.add('hidden')
}


function selectSize() {
    if(document.querySelector('#size-4').checked) {
        document.querySelector('.card-grid-small').classList.remove('hidden')
        startGameSmall()
    }
    else if (document.querySelector('#size-6').checked) {
        document.querySelector('.card-grid-large').classList.remove('hidden')
        startGameLarge()
    }
    else {
        alert('please select board size')
    }
}


// start game with small board

function startGameSmall() {
    prepareGame()
    let arr = allPairs.slice(10)
    let arrCopy = [...arr]
    arr.forEach(item => arrCopy.push(item))
    let shuffledArray = shuffle(arrCopy)
    for (let i = 0; i < shuffledArray.length; i++) {
        const holder = document.createElement('div')
        holder.innerHTML = shuffledArray[i]
        holder.setAttribute('class', 'cards-small')
        document.querySelector('.card-grid-small').appendChild(holder)
        holder.addEventListener('click', displayCard)
        holder.addEventListener('click', openCard)
    }
}

// start game with large board

function startGameLarge() {
    prepareGame()
    let arrCopy = [...allPairs]
    allPairs.forEach(item => arrCopy.push(item))
    let shuffledArray = shuffle(arrCopy)
    for (let i = 0; i < shuffledArray.length; i++) {
        const holder = document.createElement('div')
        holder.innerHTML = shuffledArray[i]
        holder.setAttribute('class', 'cards-large')
        document.querySelector('.card-grid-large').appendChild(holder)
        holder.addEventListener('click', displayCard)
        holder.addEventListener('click', openCard)
    }
}


// MAIN GAME FUNCTIONS

function displayCard() {
    moveCounter()
    this.classList.add('visible')
    this.classList.toggle('disabled')
}

function openCard() {
    openedCards.push(this) 
    if(openedCards.length === 2) {
        if(openedCards[0].innerHTML === openedCards[1].innerHTML) {
            match()
        }
        else {
            noMatch()
        }
    }

}

function match() {              
    openedCards.forEach(item => {
        setTimeout(() => {
            item.classList.add('match', 'disabled', 'fade')
        }, 800);
       matches.push(item)

        finishCheck()
    })
    openedCards = []
}

function noMatch() {
    openedCards.forEach(item => {
        setTimeout(() => {
            item.classList.add('unmatch')
        }, 100);
        
    })
    deactivate()
    setTimeout(() => {
        openedCards.forEach(item => {
            item.classList.remove('visible', 'unmatch')
            reactivate()
            openedCards = []
        })
    }, 1500);

}

// check which board is being used, then disable/enable

function deactivate() {
    if (document.querySelector('.card-grid-small').children.length > 0) {
        let cards = document.querySelector('.card-grid-small').children
        Array.prototype.filter.call(cards, function(card){
            card.classList.add('disabled');
        })
    }
    else {
        let cards = document.querySelector('.card-grid-large').children
        Array.prototype.filter.call(cards, function(card){
            card.classList.add('disabled');
        })
    }
}

function reactivate() {
    if (document.querySelector('.card-grid-small').children.length > 0) {
        let cards = document.querySelector('.card-grid-small').children
        Array.prototype.filter.call(cards, function(card){
            card.classList.remove('disabled');
        })
    }
    else {
        let cards = document.querySelector('.card-grid-large').children
        Array.prototype.filter.call(cards, function(card){
            card.classList.remove('disabled');
        })
    }
}

// check if all cards have matched

function finishCheck() {
    if (document.querySelector('.card-grid-small').children.length > 0) {
        if(matches.length === document.querySelector('.card-grid-small').children.length) {
            gameEnd()
    } else {
        if(matches.length === document.querySelector('.card-grid-large').children.length) {
            gameEnd()
        }
    }
    

    function gameEnd() {
        clearInterval(interval)
        timeInfo.classList.add('highlighted')
        movesInfo.classList.add('highlighted')
        if(moves < 30) {
            document.querySelector('#place-one').classList.remove('hidden')
        }
        else if(moves < 32) {
            document.querySelector('#place-two').classList.remove('hidden')
        }
        else if(moves < 34) {
            document.querySelector('#place-three').classList.remove('hidden')
        }
        else if(moves < 36) {
            document.querySelector('#place-four').classList.remove('hidden')   
        }
        else if(moves >= 36) {
            document.querySelector('#place-five').classList.remove('hidden')
            
        }
    }
}
}


// AUXILIARY FUNCTIONS


function shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

function setTimer() {
     interval = setInterval(() => {
            timeInfo.innerHTML = `${min}min ${sec}s`
            sec++
            if(sec == 60) {
                min++
                sec = 0
                }
        }, 1000)
    
}

function moveCounter() {
    moves++
    movesInfo.innerHTML = moves
    if(moves === 1) {
        sec = 0
        min = 0
        setTimer()
    }
}
