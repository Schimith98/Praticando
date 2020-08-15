
document.addEventListener('keydown', getKey)

function playSound(key) {
    const audio = document.getElementById(key)
    audio.currentTime = 0
    audio.play()
}

function getKey() {
    const key = event.keyCode;
    if (key == 74 || key == 66 || key == 86 || key == 72 || key == 71 || 
        key == 70 || key == 69 || key == 82 || key == 73 || key == 75) {
            playSound(key)
    }
}