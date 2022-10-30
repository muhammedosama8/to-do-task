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

// Defining async function
async function getapi(url) {
  fetch(url).then(response => response.json()).then(data => {
    if(data){
      hideloader();
    }
    tasks = data
    setTaskDiv(tasks)
  }).catch(err => {
    console.log(err);
    alert("Can't Load Data, Page will Refresh");
    document.location.reload()
  })
}
// Calling that async function
getapi(url);

function setTaskDiv(data){
    let nodes = data.map(res => {
        completed = data.completed;
        let number = document.createElement('p');
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
