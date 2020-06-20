

function addNewTask() {
    
    const lista = document.getElementById('list')
    
    //criando elementos html
    const newLi = document.createElement('li')

    //Criando label
    const newLabel = document.createElement('label')
    newLabel.setAttribute('class', 'container') // atribuindo a classe container ao label
    newLi.append(newLabel) // adicionando o label ao li

    //criando checkbox
    const newCheckbox = document.createElement('input')
    newCheckbox.setAttribute('type','checkbox')
    newLabel.append(newCheckbox) //adicionando o checkbox dentro do label

    //Criando o span
    const newSpan = document.createElement('span')
    newSpan.setAttribute('class', 'checkmark') // atribuindo a classe checkmark ao span
    newLabel.append(newSpan)

    // adicionando o label na li
    newLi.append(newLabel)

    //Criando text input
    const newTextInput = document.createElement('textarea')
    newTextInput.setAttribute('rows', '1')
    newTextInput.setAttribute('onkeypress', 'expandTextarea(event)')
    newLi.append(newTextInput)

    //Criando trash icon
    const newTrashIcon = document.createElement('i') 
    newTrashIcon.setAttribute('class', 'far fa-trash-alt')
    newTrashIcon.setAttribute('onclick', 'removeTask(event)')
    newLi.append(newTrashIcon)


    //adicionando a li na ul
    lista.appendChild(newLi)
}

function removeTask(e){
    const list = document.getElementById("list");
    list.removeChild(e.target.parentElement); 
    //console.log(e.target.parentElement)
}



function expandTextarea(e){
    let col = 0
    let rows = 1
    
    for(let i = 0; i < e.target.value.length; i++){
        if(col === 21){
            rows++;
            col = 0
        }
        if(e.target.value[i] === '\n'){
            rows++
            col = 0
        }
        col++;
    }
    e.target.setAttribute('rows',rows)
    //console.log(rows)
}



