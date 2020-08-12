function showTime(){
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let session = "AM"

    if (hour == 0){
        hour = 12;
    }
    if (hour > 12){
        hour = hour - 12
        session = "PM"
    }

    hour = lessThenTen(hour)
    minute = lessThenTen(minute)
    second = lessThenTen(second)

    let time = hour + ":" + minute + ":" + second + session

    document.getElementById("MyClockDisplay").innerText = time

    setTimeout(showTime, 1000)
}

function lessThenTen(num){
    num = (num < 10) ? "0" + num : num
    return num
}

showTime()