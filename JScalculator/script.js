function insert(num){
    document.getElementById('viewfinder').value = document.getElementById('viewfinder').value + num
}

function del(){
    str = document.getElementById('viewfinder').value
    document.getElementById('viewfinder').value = str.slice(0, str.length-1)

    document.getElementById('error').innerText = null
}

function calculate(){
    str = document.getElementById('viewfinder').value
    if(str !== ''){
        try{
            document.getElementById('viewfinder').value = eval(str)
            
        }catch(e){
           console.log(e)
           document.getElementById('error').innerText = 'Syntax Error'
        }
    }
}

