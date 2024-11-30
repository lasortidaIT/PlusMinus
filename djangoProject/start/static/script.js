let input;
let button;
let problem;
let result;

window.onload = function() {
    input = document.getElementById("box");
    button = document.getElementById("button");
    problem = document.getElementById("problem");
    result = document.getElementById("result");
}

function onClick() {
    let text = problem.textContent;
    let res = eval(text);
    let answer = Number(input.value);
    if (res === answer){
        result.innerText = "Your answer is right!"
        result.style.visibility = 'visible';
        result.style.color = "#71B378";
    }
     else if(res !== answer){
        result.innerText = `Incorrect answer. Right: ${res}!`
        result.style.visibility = 'visible';
        result.style.color = "#EF0037";
    }
}

