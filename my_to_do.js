let Todo_list = document.getElementById("ToDo");
let comp_list = document.getElementById("Comp");

/* Creating label for the checkboxes */
function create_label(name)
{
    let label = document.createElement("label");
    label.htmlFor = name;
    label.appendChild(document.createTextNode(name));
    return label;
}

/* creating line break */
function create_line_break()
{
    let line_break=document.createElement("br");
    return line_break;
}

/* creating input element */
function create_input(type, value, id, callback)
{   
    let input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.id = id + " ";
    input.onclick = callback;
    return input;
}

/* Adding a task into to_do list */
function AddToDo(name) {
    "use strict";
    
     if (document.getElementById("new").value !== "")
     {
        name = document.getElementById("new").value;
        document.getElementById("new").value = "";
     }
    else if (document.getElementById("edit ") !== null)
     { 
        name = document.getElementById("edit ").value;
        document.getElementById("edit ").value = "";
        document.getElementById("edit ").parentNode.parentNode.removeChild(document.getElementById("edit ").parentNode);
     }
    
    
    let new_task = document.createElement("div");
    
    /* creating all the elements for the particular task */
    let c_box = create_input("checkbox", null, null, Completed);
    let label = create_label(name);
    let delete_btn = create_input("button", "Delete", label.innerHTML, Delete);
    let edit_btn = create_input("button", "Edit", label.innerHTML, Edit);
       
    //adding all the elements to the task
    new_task.appendChild(c_box);
    new_task.appendChild(label);
    new_task.appendChild(delete_btn);
    new_task.appendChild(edit_btn);
    new_task.appendChild(create_line_break());
    
    /* appending the task in the to_do list */
    Todo_list.appendChild(new_task);
}

/* Marking a task as completed */
function Completed() 
{
    let to_do_task = Todo_list.getElementsByTagName("div");
    
    //Looping through all the tasks to find which one is selected
    for (let i=0; i < to_do_task.length; i++) 
    {
        let checkbox = to_do_task[i].getElementsByTagName("input");
        
        if(checkbox[0].checked) 
        {
            /* Getting the label of the task */
            let label = to_do_task[i].getElementsByTagName("label");
            let comp_task = label[0]; 
            
            /* Removing the task from to_do list */
            to_do_task[i].parentNode.removeChild(to_do_task[i]);
            
            /* Appending to the completed list*/
            append_completed_list(comp_task);            
        }
    }
}

/* To create completed list */
function append_completed_list(comp_task)
{
    let new_task = document.createElement("div");
    
    /* Creating a checked checkbox */
    let c_box = create_input("checkbox", null, null, null);
    c_box.checked = true;
    c_box.onclick = Undo;
        
    /* Creating text with strike-through */
    let strike = document.createElement("del");
    strike.innerHTML = comp_task.innerHTML + " ";
        
    /* creating a delete button */
    let delete_btn = create_input("button", "Remove", comp_task.innerHTML, Delete);
    
    /* Appending all the elements to the task */
    new_task.appendChild(c_box);
    new_task.appendChild(strike);
    new_task.appendChild(delete_btn);        
    new_task.appendChild(create_line_break());
    
    /* appending task to the list */
    comp_list.appendChild(new_task);
}

/* Editing the task */
function Edit(obj) 
{
    /* getting the parent of the object which triggered the event */
    let parentnode = obj.target.parentNode;
    
    /* The label of the task is the second element in the task div 
     and so removing the second child(index starts from 0) */
    let task = parentnode.removeChild(obj.target.parentNode.childNodes[1]);
    
    /* providing input box for hte user to edit */
    input_box = create_input("input", task.innerHTML, "edit", null);
    
    /* since the second child was deleted inserting before 
     the second child again */
    parentnode.insertBefore(input_box, parentnode.childNodes[1]);
    
    /* Deleting the edit and delete buttons */
    parentnode.removeChild(obj.target.previousElementSibling);
    parentnode.removeChild(obj.target);
    
    let add_btn = create_input("button", "Add", null, AddToDo);
    parentnode.insertBefore(add_btn, parentnode.lastChild);
    
}

/* Deleteing the task which triggered the event */
function Delete(object) 
{
    object.target.parentNode.parentNode.removeChild(object.target.parentNode);
}

/* Undo-ing a task */
function Undo(object)
{
    AddToDo(object.target.parentElement.childNodes[1].innerHTML);
    Delete(object);
}

//Assigning functions to event handler
document.getElementById("Add").onclick = AddToDo;
