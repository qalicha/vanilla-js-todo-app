
const inputField=document.querySelector('.input-field')
const addBtn=document.querySelector('.add-btn')
const deleteBtn=document.querySelector('.delete-btn')
const updateBtn=document.querySelector('.update-btn')
const listContainer=document.querySelector('.list-container')

window.addEventListener('load', ()=>{
    getDatafromlocalstorage(todoItems)

    deleteTodos()
    updateTodos()
    inputField.focus()
})

let todoItems=[]

function addTodos(text){
    const todo={
        text,
        isChecked:false,
        id:Date.now()
    }
    todoItems.push(todo)
    
    persistData(todoItems)
    
    renderTodos(todoItems)
   deleteTodos()
   updateTodos()
   inputField.focus()
}

addBtn.addEventListener('click',()=>{
    addTodos(inputField.value)
   markTodos()
})


function renderTodos(todoItems){
    let index=todoItems.length-1

    let html=`<div class="todo-list " id="${todoItems[index].id}"><input  class='checkbox'   type="checkbox" id="${todoItems[index].id}" /><li>${todoItems[index].text}</li><span><button class="update-btn">Update</button><button class="delete-btn">Delete</button></span></div>`
            listContainer.insertAdjacentHTML('beforeend',html)
            
            inputField.value=''     
            
}



function deleteTodos(){
    
    listContainer.addEventListener('click',(e)=>{
    const target=e.target.classList.contains('delete-btn')
    if(target){
        let list=e.target.closest('div')
        list.remove()
        let currentTodos=JSON.parse(localStorage.getItem('todo'))
                currentTodos=currentTodos.filter(function(el){
                    return el.id!==Number(list.id)
 })
        localStorage.setItem('todo',JSON.stringify(currentTodos))
        
    }
    })
}

function updateTodos(){
    listContainer.addEventListener('click',(e)=>{
        const target=e.target.classList.contains('update-btn')
        if(target){
            let list=e.target.closest('div')
            
            inputField.value=e.target.parentElement.parentElement.children[1].textContent
            
            list.remove()
            let currentTodos=JSON.parse(localStorage.getItem('todo'))
      
        
                currentTodos=currentTodos.filter(function(el){
                    return el.id!==Number(list.id)
                })
             

        localStorage.setItem('todo',JSON.stringify(currentTodos))
            }
        })
       
}


function persistData(todo){
    let data=localStorage.getItem('todo')
    if(data===null){
        localStorage.setItem('todo',JSON.stringify(todo))
    }
    else{
        let prevData=JSON.parse(localStorage.getItem('todo'))
        prevData=prevData.filter(el=>el.id!==el.id)
        localStorage.setItem('todo',JSON.stringify(prevData.concat(todo)))
        
    }
}

function getDatafromlocalstorage(task){
     task=JSON.parse(localStorage.getItem('todo')||[])
    let index=task.length-1
    
    if(task.length===1){
    let html=`<div class="todo-list  ${task[index].isChecked? "cross-todo":''}" id="${task[index].id}"><input  class='checkbox'   type="checkbox" id="${task[index].id}"  ${task[index].isChecked? "checked":''}/><li>${task[index].text}</li><span><button class="update-btn">Update</button><button class="delete-btn">Delete</button></span></div>`
   
    
          listContainer.insertAdjacentHTML('beforeend',html)
           
            inputField.value='' 

    }
    else{
        task.forEach(task=>{

            let html=`<div class="todo-list ${task.isChecked? "cross-todo":''}"  id="${task.id}"><input class='checkbox'  type="checkbox" id="${task.id}" ${task.isChecked? "checked":''}/><li>${task.text}</li><span><button class="update-btn">Update</button><button class="delete-btn">Delete</button></span></div>`
            listContainer.insertAdjacentHTML('beforeend',html)
            inputField.value='' 
        })
    }
    markTodos()
}

function markTodos(){
    
    listContainer.addEventListener('click',(e)=>{
        inputField.focus()
        const target=e.target.classList.contains('checkbox')
        if(target){
            
            let checkTodo=e.target.closest('div').children[0]
            let lists=e.target.closest('div')
            if(checkTodo.checked){
                let  currentTodos=JSON.parse(localStorage.getItem('todo'))
                for(let i=0;i<currentTodos.length;i++){
                     if(Number(currentTodos[i].id)===Number(e.target.id)){
                        
                        currentTodos[i].isChecked=true
                        
                     }
                     
                }
                
                localStorage.setItem('todo',JSON.stringify(currentTodos))
                e.target.setAttribute('checked','')
                lists.classList.add('cross-todo')
                
            }
            else{
               
                let  currentTodos=JSON.parse(localStorage.getItem('todo'))
                
                for(let i=0;i<currentTodos.length;i++){
                     if(Number(currentTodos[i].id)===Number(e.target.id)){
                        
                        currentTodos[i].isChecked=false
                        
                     }
                     
                }
                
                localStorage.setItem('todo',JSON.stringify(currentTodos))
                
                lists.classList.remove('cross-todo')
            }
            
            }
        })
        
}

// localStorage.clear()
