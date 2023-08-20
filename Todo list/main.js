console.log("Hello in Js Todo List")
//-------------------------------------------
let myinput = document.querySelector(".input");
myinput.addEventListener("focus",()=>{
   myinput.value = ""
});
//-------------------------------------------
window.onload = ()=> {
  var existingData = JSON.parse(localStorage.getItem('task')) ;
  for(let i = 0 ; i< existingData.length;i++){
   if(existingData[i].id !== -1){
   let divTask = document.createElement("div");
   divTask.className = "Task" ; 
   // create p in div task
   let pTask   = document.createElement("p");
   // create Test in p 
   let test = document.createTextNode(existingData[i].title)
   // create btn dalete
   let btn  = document.createElement("button");
   btn.id = existingData[i].id
   btn.className="delete-button"
   // create Test in button 
   let testBtn = document.createTextNode("Delete")
   pTask.appendChild(test);
   divTask.appendChild(pTask);
   btn.appendChild(testBtn)
   divTask.appendChild(btn);
   //--------
   tasks.appendChild(divTask);
   document.body.appendChild(tasks);
   };
  };
};
//-------------------------------------------
var allEntries = [];
function add(title){
   let ent = {
      "id" : Math.floor(Math.random() * 1000000),
      "title" : `${title.value}`
   }
   var existingData = JSON.parse(localStorage.getItem('task')) || [];
   console.log(existingData)
   existingData.push(ent);
   var updatedDataString = JSON.stringify(existingData);
   localStorage.setItem('task', updatedDataString);
   return ent.id
}

//------------------Add Task------------------

let tasks  = document.querySelector(".tasks")
let  addTask = document.querySelector(".add")  ;

document.addEventListener("DOMContentLoaded", () => {
addTask.addEventListener("click", ()=>{
   if(myinput.value !== ""){
      // Create div task
      let divTask = document.createElement("div");
      divTask.className = "Task" ; 
      // create p in div task
      let pTask   = document.createElement("p");
      // create Test in p 
      let test = document.createTextNode(myinput.value)
      // create btn dalete
      let btn  = document.createElement("button");
      btn.className="delete-button"
      // create Test in button 
      let testBtn = document.createTextNode("Delete")
      //-----------------------------------------------
      //-----------------------------------------------
      btn.id = add(myinput)
      //-----------------------------------------------
      pTask.appendChild(test);
      divTask.appendChild(pTask);
      btn.appendChild(testBtn)
      divTask.appendChild(btn);
      //--------
      tasks.appendChild(divTask);
      document.body.appendChild(tasks);
      //-----------------------------------------------
      myinput.value=""
   }else{
      window.alert("Please add an assignment")
   }
});
});


//------------------dealet Task------------------

function historyInLocalStorage(idObj){
   var existingData = JSON.parse(localStorage.getItem('task')) ;
   for(let i = 0 ; i< existingData.length;i++){
        if(existingData[i].id === idObj){
         existingData[i].id = -1 ;
        }  
   };
   console.log(existingData)
   var updatedDataString = JSON.stringify(existingData);
   localStorage.setItem('task', updatedDataString);
};

document.addEventListener("click", (event) => {
   if (event.target.classList.contains("delete-button")) {
      let taskElement = event.target.closest(".Task");
      if (taskElement) {
         historyInLocalStorage(Number(event.target.id))
         taskElement.remove();
      }
   }
});




