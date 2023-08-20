//-----------------------------------
let app = document.querySelector("quiz-app")
let countSpan = document.querySelector(".count span");
let mySpans = document.querySelector(".bullets .spans")
let quizAera = document.querySelector(".quiz-aera")
let answersArea = document.querySelector(".answers-area")
let submitButton = document.querySelector(".submit-button");
let resultsEnd = document.querySelector(".results")
let countdwonElement =  document.querySelector(".countdwon");
let reTest  = document.getElementById("ReTest")

//-----------------------------------
let currentIndex = 0;
let rightAnswers = 0 ;
let countdwonInterval;
//-----------------------------------
function getQuestions(){
   let myRequest = new XMLHttpRequest();
   let obj = []
   myRequest.onreadystatechange = ()=>{
      if(myRequest.readyState === 3 && myRequest.status === 200){
         let questionsObject = JSON.parse(myRequest.responseText)
         let qCount = questionsObject.length;
         // create bullets 
         createBullets(qCount);

         // Add questions 
         addData(questionsObject[currentIndex],qCount);

         // start Count Dwon
         countDwon(60,qCount)

         // Click Submit button
         
         submitButton.onclick = ()=>{
              
            // Get Right Answer 
            let theRightAnswer = questionsObject[currentIndex].right_answer;

            // Add index
            currentIndex += 1 ;
            
            // Checked Answer
            checkAnswer(theRightAnswer,qCount);

            // free data befoer add new 
            quizAera.innerHTML = '';
            answersArea.innerHTML = ''

            // add new Question 
            addData(questionsObject[currentIndex],qCount);
            
            //Handel Bullets
            handelBullets(qCount);

            //
            clearInterval(countdwonInterval);
            countDwon(60,qCount);
         }
        
         //-------------
         reTest.style.display = "none";
         reTest.onclick = ()=>{
            location.reload();
         }
         //-------------
        
      }
   }

   myRequest.open("GET","Questions.json",true);
   myRequest.send();
}

getQuestions();
//-----------------------------------
function createBullets(num){
   countSpan.innerText = num ;
   for(let i = 0 ;i<= num ; i++){
      if(i === num){
         let EndBullet = document.createElement("span");
         EndBullet.innerText = "End"
         EndBullet.className  = "endBullet"
         mySpans.appendChild(EndBullet);
      }else{
       let theBullet = document.createElement("span");
       theBullet.innerText = `${i+1}`
       if(i === 0){
         theBullet.className ="on"    // First span
        }
       mySpans.appendChild(theBullet);    
      }
       
   }
}
//-----------------------------------
function addData(obj,count){
   if(currentIndex < count ){
   //--------Add data in Quiz Aera
   // Create h2
   let qTitle = document.createElement("h2");
   // Question Text
   let qText  = document.createTextNode(obj.title) ; 
   qTitle.appendChild(qText) ;
   quizAera.appendChild(qTitle) ; 

   //--------Add data in Answers Area  (Create Answers)
   for(let i = 1 ; i <= 4 ;i++){
       // Create Main Div
       let mainDiv = document.createElement("div");
       mainDiv.className = "answer" ;   // add class atr
      
       // Create Iputn radio 
       let radioInput = document.createElement("input") ; 
       radioInput.type = "radio"
       radioInput.id = `answer_${i}`
       radioInput.name = "questions" ;
       radioInput.dataset.answer = obj[`answer_${i}`] ; 
       if(i === 1){
         radioInput.checked = true
      } 

       // Create Label 
       let label = document.createElement("label");
       label.htmlFor= `answer_${i}`
       let labelText  =  document.createTextNode(obj[`answer_${i}`])
       label.appendChild(labelText);

       // Append Input And Label in Main Div 
       mainDiv.appendChild(radioInput);
       mainDiv.appendChild(label);

       // Append in answers Area
       answersArea.appendChild(mainDiv)
   }
}else{ //*
   reTest.style.display = "block"
   submitButton.remove()
   answersArea.remove()
   countdwonElement.remove()
   //
   let qTitle = document.createElement("h2");
   qTitle.style.textAlign = "center"

   // finished Text
   let qText  = document.createTextNode("Quiz finished") ; 
   qTitle.appendChild(qText) ;
   quizAera.appendChild(qTitle) ;
   quizAera.style.backgroundColor = "rgb(0 0 139 / 36%)"
   quizAera.style.color = "black"

   // Results
   let results ;
   if(rightAnswers > count/2 && rightAnswers < count){
      results =   `<span class="gd">Good</span> , You Answered ${rightAnswers} From ${count}`
   }else if (rightAnswers === count){
      results =   `<span class="pr">Perfect</span> All Answers Is Good`
   }else{
      results =   `<span class="bd">Bad</span> , You Answered ${rightAnswers} From ${count}`
   }
   resultsEnd.innerHTML = results ; 
}
}

//-----------------------------------
function checkAnswer(rAnswer,count){
   let answers = document.getElementsByName("questions");
   let theChoosenAnswer ;

   for(let i=0;i< answers.length;i++){
      if(answers[i].checked){
         theChoosenAnswer = answers[i].dataset.answer ; 
      }
   }

   if(theChoosenAnswer === rAnswer){
      rightAnswers++;
   }
}
//-----------------------------------

function handelBullets(c){
   let bulletsSpans = document.querySelectorAll(".bullets .spans span");
   let arraySpans  = Array.from(bulletsSpans);
   arraySpans.forEach((span,index)=>{
         span.className = ""
         if(currentIndex === index){
            span.className = 'on'
         }
   })

}

//-----------------------------------
//<span class="minutes">02</span> : <span class="seconds">45</span>
function countDwon(time,count){
   if(currentIndex < count){
      let min,sec ;
      countdwonInterval = setInterval(()=>{
         min = parseInt(time / 60);
         sec = parseInt(time % 60);


         min = min < 10 ? `0${min}` : min
         sec = sec < 10 ? `0${sec}` : sec

         countdwonElement.innerHTML = `<span class="minutes">${min}</span> : <span class="seconds">${sec}</span>`

         if(--time < 0){
            clearInterval(countdwonInterval)
            submitButton.onclick();
         }
      },1000)
   }
}