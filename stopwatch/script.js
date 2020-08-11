
let hour = 0;
let minute = 0;
let second = 0;

let stopwatch;

document.getElementById('stop').setAttribute('disabled', true)
document.getElementById('pause').setAttribute('disabled', true)

function start(e){

    stopwatch = setInterval(() => { timer() }, 1000);
    
    document.getElementById('start').setAttribute('disabled', true)

    document.getElementById('stop').removeAttribute('disabled', true)
    document.getElementById('pause').removeAttribute('disabled', true)
    //e.target.setAttribute('disabled',true)
}

function pause(e){
    clearInterval(stopwatch)
    document.getElementById('start').innerText = 'RESUME'
    document.getElementById('start').removeAttribute('disabled', true)
}

function stop(){
    clearInterval(stopwatch)
    hour = 0
    minute = 0
    second = 0

    document.getElementById('counter').innerText = '00:00:00'

    
    document.getElementById('start').innerText = 'START'

    document.getElementById('start').removeAttribute('disabled', true)
    document.getElementById('stop').setAttribute('disabled', true)
    document.getElementById('pause').setAttribute('disabled', true)
}

function timer(){
    second++;
    
    if(second == 59){
        second = 0
        minute++
        if(minute == 59){
            minute = 0
            hour++
        }
    }

    let format = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)

    document.getElementById('counter').innerText = format

    return format
}