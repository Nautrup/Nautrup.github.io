var addToDoButton = document.getElementById('addToDo');
var toDoContainer = document.getElementById('toDoContainer');
var inputField = document.getElementById('inputField');

addToDoButton.addEventListener('click', TestMethod)

function createElements(event) {
    // opretter paragraf element
    var paragraph = document.createElement('p');
    // sætter texten til at være det samme som i inputboxen
    paragraph.innerText = inputField.value;
    // Ny event listener der sætter en streng gennem ordet hvis man trykker
    paragraph.addEventListener('click', function(event) {
        paragraph.style.textDecoration = "line-through"
    })
    // tilføjer den til min toDoContainer
    toDoContainer.appendChild(paragraph);
}

// Et forsøg på at gøre den mere advanceret.
function TestMethod(event) {
    var div = document.createElement('div');
    // opretter paragraf element
    var paragraph = document.createElement('p');
    // sætter texten til at være det samme som i inputboxen
    paragraph.innerText = inputField.value;
    div.appendChild(paragraph);

    // oprette knap
    var button = document.createElement('button');
    button.innerText = "-";
    div.appendChild(button);
    // tilføjer den til min toDoContainer
    toDoContainer.appendChild(div);
}
