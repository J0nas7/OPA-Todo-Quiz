// APP SWITCHER
function activateApp(appActive) {
    let topbarBtns = document.querySelectorAll(".topbar .item");
    topbarBtns.forEach((btn) => {
        btn.classList.remove("active");
    });
    let apps = document.querySelectorAll(".appContainer");
    apps.forEach((app) => {
        app.classList.remove("active");
    });

    if (this.id) { appActive = this.id.slice(0, 4); }

    document.getElementById(appActive+"App").classList.add("active");
    document.getElementById(appActive+"Btn").classList.add("active");
}
activateApp("todo");
document.getElementById("todoBtn").addEventListener("click", activateApp, false);
document.getElementById("quizBtn").addEventListener("click", activateApp, false);



// TODO LIST DEFAULT
let todoList = [
    "buy bread", 
    "drive home after lecture",
    "change car to winter tire",
    "exercise", 
    "do homework"
];

// TODO LIST FUNCTIONALITIES
function updateTodoList() {
    document.getElementById("todoList").innerHTML = "";
    theTodos = todoList;

    var searchTerm = document.getElementById("todoSearch").value;
    if (searchTerm) {
        theTodos = theTodos.filter((note) => (note.includes(searchTerm)));
    }

    fltLftclrBth = "<span class='fltLft clrBth'></span>";

    if (theTodos.length) {
        for (let i = 0; i < theTodos.length; i++) {
            let moreHTML = "<span class='todoItem'>"+
                                theTodos[i]+
                                "<span class='deleteMe' id='"+i+"'>X</span>"+
                            "</span>";
            document.getElementById("todoList").innerHTML += moreHTML;
        }
        document.getElementById("todoList").innerHTML += fltLftclrBth;
        todoDeleteListener();
    }    
}
updateTodoList();

function deleteTodo() {
    let todoId = Number(this.id);
    let tempList = todoList.slice(0, todoId).concat(todoList.slice(todoId+1, todoList.length));
    todoList = tempList;
    updateTodoList();
}

function todoDeleteListener() {
    var elements = document.getElementsByClassName("deleteMe");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', deleteTodo, false);
    }
}

document.getElementById("todoSearch").addEventListener('keyup', () => { updateTodoList(); });

const createInput = document.getElementById("todoCreate");

createInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const todoTxt = createInput.value;
        if (todoTxt) {
            todoList.push(todoTxt);
            updateTodoList();
            createInput.value = "";
        } else {
            alert("Cannot create an empty todo item!");
        }
    }
});


// QUIZ FETCH
var questions = [];
fetch("ninjas.json")
.then((response) => response.json())
.then((data)=>{
    questions = data;
    printQuestions();
})
.catch((e)=>{
    console.log("ERR: "+e.message);
});

function printQuestions() {
    var questionsHTML = "";
    var questionNum = 1;
    questions.forEach((question) => {
        questionsHTML +=    "<div class='question'>"+
                                "<strong>"+question.question+"</strong><br>"+
                                "<input type='radio' name='test"+questionNum+"' value='no' /> "+question.wrong+"<br>"+
                                "<input type='radio' name='test"+questionNum+"' value='yes' /> "+question.right+
                            "</div>";
        questionNum++;
    });
    document.querySelector(".theQuestions").innerHTML = questionsHTML;
}

function ninjaLator() {
    var result = 0;
    var answers = [];
    for (var i = 1; i < 5; i++) {
        answers[i] = document.querySelector("[name=test"+i+"]:checked").value;
        if (answers[i] == "yes") result += 25;
    }
    document.querySelector("#quizResult").innerHTML = "0%";
    document.querySelector("#quizResult").setAttribute("countTo", result);
    document.querySelector(".quizResult").style.display = "block";
    ninjaCounter();
}
function ninjaCounter() {
    var theNumber = -1;
    document.querySelector("#quizResult").innerHTML = "0%";
    var countTo = Number(document.querySelector("#quizResult").getAttribute("countTo"));
    var myCounter = setInterval(() => {
        theNumber++;
        document.querySelector("#quizResult").innerHTML = theNumber+"%";
        if (theNumber == countTo) clearInterval(myCounter);
    }, 25);
}
document.querySelector("#quizSubmit").addEventListener("click", ninjaLator, false);