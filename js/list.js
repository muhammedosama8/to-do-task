const list = document.getElementById('list');
const url = 'https://jsonplaceholder.typicode.com/todos';
const form = {
    task: document.getElementById("task"),
    submit: document.getElementById("submit"),
  };
let tasks = [];
let isEdit = false;
let taskedit;
let completed 
for(let i =0; i<50; i++){
  let div = document.createElement('div');
  div.setAttribute('class', 'card description card-loading')
  document.getElementById('loading').append(div)
}
// Defining async function
async function getapi(url) {
  fetch(url).then(response => response.json()).then(data => {
    if(data){
      hideloader();
    }
    tasks = data
    setTaskDiv(tasks)
  }).catch(err => {
    alert("Can't Load Data, Page will Refresh");
    document.location.reload()
  })
}
// Calling that async function
getapi(url);

function setTaskDiv(data){
    let nodes = data.map(res => {
        completed = data.completed;
        let number = document.createElement('span');
        let div = document.createElement('div');
        let p = document.createElement('p');
        let edit= document.createElement('button');
        let del= document.createElement('button');
        const editIcon = document.createElement('i')
        const delIcon = document.createElement('i')

        number.textContent = res.id + ')';
        p.textContent = res.title;
        p.setAttribute('id',`${res.id}`)
        p.setAttribute('onclick',`endTask(${res.id})`)
        
        edit.setAttribute('onclick', `edit(${res.id})`)
        editIcon.setAttribute('class', 'bi bi-pencil-square')
        edit.append(editIcon)

        del.setAttribute('onclick', `deleteTask(${res.id})`)
        delIcon.setAttribute('class', 'bi bi-trash')
        del.append(delIcon);

        div.setAttribute('class', 'task col-sm-12 col-md-6 col-lg-6')
        div.appendChild(number)
        div.appendChild(p)
        div.appendChild(edit)
        div.appendChild(del)
        
        return div;
    });
    list.append(...nodes);
}

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
} 

/* -------- Add Task ----------*/
form.submit.addEventListener('click', (e)=> {
    e.preventDefault();
    if(isEdit){
        console.log(taskedit);
        fetch(`https://jsonplaceholder.typicode.com/todos/${taskedit[0].id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: taskedit[0].id,
                title: form.task.value,
                completed: false
            }),
            headers: {
                Accept: "application/json",
              'Content-type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
                isEdit = false;
                document.getElementById(`${data.id}`).textContent = data.title;
            });
    } else{
        fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: form.task.value,
              completed:false
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            tasks.push(data)
            console.log(tasks);
            setTaskDiv(Array.of(data))
          })
          .catch((err) => {
            console.log('error');
            console.log(err);
          });
    }
    form.task.value =' '
})

/* -------- Edit Task ----------*/
function edit(id){
    form.task.value= ' ';
    taskedit = tasks.filter(res=> res.id == id);
    form.task.value=taskedit[0].title;
    isEdit = true;
}

/* -------- Delete Task ----------*/
function deleteTask(id){
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      }).then(res=> {
        if(res.status == 200){
            tasks = tasks.filter(data=> data.id !== id)
            document.getElementById(id).parentElement.remove();
        }
      });
}

/* -------- End Task ----------*/
function endTask(id){
    completed=!completed
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                completed: completed
            }),
            headers: {
                Accept: "application/json",
              'Content-type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
                if(completed){
                    document.getElementById(data.id).style.textDecoration = 'line-through';
                    document.getElementById(data.id).nextSibling.style.display = 'none'
                } else{
                    document.getElementById(data.id).style.textDecoration = 'none';
                    document.getElementById(data.id).nextSibling.style.display = 'block'
                }
            });
}

/* --------  Log Out ----------*/
function logout(){
  window.location.href = '../index.html';
}
