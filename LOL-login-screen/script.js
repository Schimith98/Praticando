function changeLabel(i){
    let label = document.getElementsByClassName("label")

    label[i].style.color = "#000000"
    label[i].style.marginTop = "7%"
    label[i].style.fontSize = "10px"
    label[i].style.transition = "0.5s"
}
function isFilled(i){
    let label = document.getElementsByClassName("label")
    let input = document.getElementsByClassName("input")
    
    if(input[i].value == ""){
        label[i].style.color = "#959595"
        label[i].style.fontSize = "16px"
        label[i].style.marginTop = "10%"
        label[i].style.transition = "0.5s"
    }
}