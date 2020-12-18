
function GetWeatherData() {
	var url = "https://api.openweathermap.org/data/2.5/weather?q=Viborg&units=metric&appid=9e1fdd4200633c1c5db50bbab5e0a38a&lang=da"
	var promise = fetch(url)
	.then(res => res.json()
	.then(data => {
		console.log(data),
		document.getElementById('city').innerHTML = `${data.name}, ${data.sys.country}`
		document.getElementById('temperatur').innerHTML = `${data.main.temp} \xB0`
		document.getElementById('description').innerHTML = `${data.weather[0].description}`
		document.getElementById('icon').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
	}))
}

function GetWeatherDataSearchedCity() {
	var searchedCity = document.getElementById('input').value;
	
	if (searchedCity == "") {
		GetWeatherData();
	} else {
		// get the weather of searched city
		var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=9e1fdd4200633c1c5db50bbab5e0a38a&lang=da`
		var promise = fetch(url)
	.then(res => {
		if (!res.ok) {
		document.getElementById('city').innerHTML = `Not found`
		document.getElementById('temperatur').innerHTML = `####`
		document.getElementById('description').innerHTML = `####`
		document.getElementById('icon').alt = "Image";
		document.getElementById('deg').innerHTML = `####`
		} else{
			return res.json()
		}
	}).then(data => {
		
		document.getElementById('city').innerHTML = `${data.name}, ${data.sys.country}`
		document.getElementById('temperatur').innerHTML = `${data.main.temp} \xB0`
		document.getElementById('description').innerHTML = `${data.weather[0].description}`
		document.getElementById('icon').src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		document.getElementById('deg').innerHTML = `${data.wind.speed}m/s ${data.wind.deg}`
	})
	}
}

// TO DO LIST CODE
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var todoIdInput = document.getElementById("todoIdInput");

// MAGIC INPUT


// Click Events
todoButton.addEventListener('click', createElement);
todoList.addEventListener('click', todoCheck);
document.getElementById("myBtn").addEventListener("click", createElement);
$('#myBtn').on('click', createElement);




function createElement (event) {
    event.preventDefault();

    // Opretter et div element
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // opretter li element
    var todoLi = document.createElement('li');
    // indæstte data
    todoLi.innerText = todoIdInput.value; 
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

// NEWS CODE
function GetNewsFeed() {
    
}

// MAGIC EIGTH BALL

function magicBall() {
    var input = document.getElementById("magicInput");
    var response = document.getElementById("response");
    var answers = ["Yes", "No", "Maybe", "Cannot predict now"];
    
    var num = Math.floor(Math.random() * Math.floor(answers.length));
    response.innerHTML = answers[num];
}
