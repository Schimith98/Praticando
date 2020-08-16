
let marker = 'X'
let happening = true

function mark(e) {
    if (happening) {
        if (e.target.innerText == '-') {
            e.target.innerText = marker // mark the X or O
            checker() //who win?
            if(happening){
                if (marker == 'X') { //invert mark
                    marker = 'O'
                } else {
                    marker = 'X'
                }
                document.getElementById('message').innerText =  `Player's Turn ${marker}`
            }
        }
    }
}

function checker() {
    let squares = []

    for (let i = 0; i < 9; i++) {
        squares[i] = document.getElementsByClassName('grid-item')[i].innerText
    }

    //horizontal check
    for (let i = 0; i < 9; i = i + 3) {
        if (squares[i] == marker && squares[i + 1] == marker && squares[i + 2] == marker) {
            endGame(i, i + 1, i + 2)
        }
    }

    //vertical check
    for (let i = 0; i < 3; i++) {
        if (squares[i] == marker && squares[i + 3] == marker && squares[i + 6] == marker) {
            endGame(i, i + 3, i + 6)
        }
    }

    //diagonal check
    for (let i = 0; i < 3; i = i + 2) {
        if (squares[i] == marker && squares[4] == marker && squares[8 - i] == marker) {
            endGame(i, 4, 8 - i)
        }
    }
}

function endGame(x, y, z) {
    document.getElementsByClassName('grid-item')[x].style.color = 'red'
    document.getElementsByClassName('grid-item')[y].style.color = 'red'
    document.getElementsByClassName('grid-item')[z].style.color = 'red'
    document.getElementById('message').innerText =  `Player's ${marker} WIN`
    happening = false
}

function reset() {
    let squares = document.getElementsByClassName('grid-item')
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerText = '-'
        squares[i].style.color = 'black'
    }
    happening = true
    document.getElementById('message').innerText =  `Player's Turn ${marker}`
}




