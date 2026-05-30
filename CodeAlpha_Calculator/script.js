let display=document.getElementById("display");

let previousExpression=document.getElementById("previousExpression");

let historyList=document.getElementById("historyList");

const clickSound = new Audio("sounds/click.mp3");

clickSound.volume = 0.3;

/* APPEND VALUES */

function appendValue(value)
{
    display.value+=value;
}

/* CLEAR DISPLAY */

function clearDisplay()
{
    display.value="";
    previousExpression.innerText="";
}

/* DELETE LAST CHARACTER */

function deleteLast()
{
    display.value=display.value.slice(0,-1);
}

/* CALCULATE */

function calculate()
{
    try{

        let expression=display.value;
        /* SCIENTIFIC FUNCTION SUPPORT */
        expression=expression.replace(/sin\(/g,"Math.sin(");

        expression=expression.replace(/cos\(/g,"Math.cos(");

        expression=expression.replace(/tan\(/g,"Math.tan(");

        expression=expression.replace(/sqrt\(/g,"Math.sqrt(");

        expression=expression.replace(/log\(/g,"Math.log10(");

        let result=eval(expression);
         
/* CHECK INVALID RESULT */
       if(result === Infinity || result === -Infinity || isNaN(result))
       {
         display.value = "Invalid Expression";
         return;
        }
      previousExpression.innerText =
      display.value + " =";
       display.value = result;
       
        addToHistory(previousExpression.innerText,result);

    }
    catch(error)
    {
        display.value="Invalid Expression";
    }
}

/* ADD TO HISTORY */

function addToHistory(expression,result){

    let item=document.createElement("div");

    item.classList.add("history-item");

    item.innerHTML=`
        <p>${expression}</p>
        <h3>= ${result}</h3>
    `;

    historyList.prepend(item);

    saveHistory();
}

/* SAVE HISTORY */

function saveHistory(){

    localStorage.setItem(
        "calculatorHistory",
        historyList.innerHTML
    );
}

/* LOAD HISTORY */

window.onload=function()
{
    let savedHistory=localStorage.getItem("calculatorHistory");

    if(savedHistory){

        historyList.innerHTML=savedHistory;
    }
}

/* CLEAR HISTORY */

document.getElementById("clearHistory").addEventListener("click",function(){

    historyList.innerHTML="";

    localStorage.removeItem("calculatorHistory");
});


const historyPanel=document.querySelector(".history-panel");

/* CLOSE */

document
.getElementById("closeHistory")
.addEventListener("click",function(){

    historyPanel.classList.add("hide-history");
});

/* SHOW */

document
.getElementById("showHistory")
.addEventListener("click",function(){

    historyPanel.classList.remove("hide-history");
});
/* KEYBOARD SUPPORT */

document.addEventListener("keydown",function(event){

    let key=event.key;

    if(
        "0123456789+-*/.%()".includes(key)
    ){

        appendValue(key);
    }

    else if(key==="Enter"){

        calculate();
    }

    else if(key==="Backspace"){

        deleteLast();
    }

    else if(key==="Escape"){

        clearDisplay();
    }
});

/* THEME SWITCHER */

document
.getElementById("darkTheme")
.addEventListener("click",function(){

    document.body.classList.remove("light-theme");

    document.body.classList.remove("neon-theme");
});

document
.getElementById("lightTheme")
.addEventListener("click",function(){

    document.body.classList.add("light-theme");

    document.body.classList.remove("neon-theme");
});

document
.getElementById("neonTheme")
.addEventListener("click",function(){

    document.body.classList.add("neon-theme");

    document.body.classList.remove("light-theme");
});
/*button clicking sound effect*/

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        clickSound.currentTime = 0;
        clickSound.play();

    });

});
