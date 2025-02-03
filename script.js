

document.addEventListener('DOMContentLoaded', () => {
    const toDoInput = document.getElementById('todo-item');
    const toDoSearch = document.getElementById('todo-search');
    const toDoList = document.getElementById('todo-list');

    // Without Local storage
   let todos = []; // stores all data in memory

    //Rendering the List to To-Do(DOM)
    function renderTodo() {
        toDoList.innerHTML = '';
        todos.forEach((item, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const button = document.createElement('button');

            span.contentEditable = "true";
            span.textContent = item;
            button.innerHTML ="&nbsp; &#10005;";
            
            li.appendChild(span);
            li.appendChild(button);
            toDoList.appendChild(li);

            button.addEventListener('click' ,() => {
                deleteToDo(item);
            })
        });

    }


    toDoInput.addEventListener('blur', (index) => {
        addToDo();
        updateToDo(index, toDoInput.textContent)
    });
    
    // Add the Todo list
    function addToDo() {
        const newToDo = toDoInput.value.trim();
        if(newToDo) {
            todos.push(newToDo);
            renderTodo();
            toDoInput.value ='';
        }
    }

    //Delete the Todo list
    function deleteToDo(index) {
        todos.splice(index,1);
        renderTodo();
    }



    //Update the Todo list
    function updateToDo(index, updatedTxt) {
        if(updatedTxt.trim()) {
            todos[index] = updatedTxt.trim();
        }
    }

    //Search Operations
    toDoSearch.addEventListener('input', function(e) {
        const searchtxt = e.target.value.toLowerCase();
        const filteredToDo = todos.filter(item => item.toLowerCase().includes(searchtxt));
        toDoList.innerHTML= '';
        filteredToDo.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span contenteditable="true" onblur="updateToDo(${index}, this.textContent)">${item}</span><button onclick="deleteToDo(${index})">&#10005;</button>`;
            toDoList.appendChild(li);
        })

    });

    //Enter key 
    toDoInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addToDo();
        }
    });

});