sliderIndex = 0

function showDivs(n) {
    sliderIndex = n
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("slideDot")
    
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].children[0].className = "far fa-circle";
    }
    dots[n].children[0].className = "fas fa-circle";
    x[n].style.display = "block";  
}
function showDivsAuto(){
    if(sliderIndex >  2){
        sliderIndex = 0
    }
    showDivs(sliderIndex)
    sliderIndex++
}

setInterval(() => { showDivsAuto(sliderIndex) }, 5000);
