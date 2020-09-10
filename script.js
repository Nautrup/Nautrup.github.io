var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");

todoButton.addEventListener('click', createElement);
todoList.addEventListener('click', todoCheck);

function createElement (event) {
    event.preventDefault();

    // Opretter et div element
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // opretter li element
    var todoLi = document.createElement('li');
    // indæstte data
    todoLi.innerText = todoInput.value;
    // Giver det element en class
    todoLi.classList.add('todo-item');
    // smider todoLi ind i todoDiv'en
    todoDiv.appendChild(todoLi);

    // Complete knap
    var complteButton = document.createElement('button');
    complteButton.innerHTML = '<i class="fas fa-check"></i>';
    complteButton.classList.add('btn-complete');
    complteButton.addEventListener('click', function(){
        //todoLi.style.textDecoration = "line-through";
    })
    todoDiv.appendChild(complteButton);
    
    // Slet knap
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('btn-delete');
    deleteButton.addEventListener('click', function(e){
        // delete code here
        // var list = document.querySelector(".todo-list");
        
        // list.removeChild(list.childNodes[0]);  
    })
    todoDiv.appendChild(deleteButton);

    // Smider alt det overstående ind i vores todoList, som allerede er i vores index.html
    todoList.appendChild(todoDiv);
}

function todoCheck(e) {
    // Finder det item vi klikker på
    var item = e.target;
    console.log(e.target);
    // Laver et check på hvad den skal gøre, med det item.
    if (item.classList[0] === 'btn-delete') {
        var parentElement = item.parentElement;
        parentElement.remove();
    } else if (item.classList[0] === 'btn-complete'){
        var parentElement = item.parentElement;
        parentElement.classList.toggle('completed');
        console.log(parentElement);
    }
}