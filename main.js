let appActive = "todo";
document.getElementById(appActive+"App").classList.add("active");
document.getElementById(appActive+"Btn").classList.add("active");




// TODO LIST DEFAULT
let todoList = [
    "buy bread", 
    "drive home after lecture",
    "change car to winter tire",
    "exercise", 
    "do homework"
];

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