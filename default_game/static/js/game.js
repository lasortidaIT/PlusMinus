let problem;
let userAnswer;
let rangeEasy;
let rangeNormal;
let rangeHard;
let signMinus;
let signMult;
let signDev;
let inf;
let ten;
let fiveteen;
let swit;
let result;
let resultPanel;

let content;
let index = 0;
let maxindex;
let incorrect;

window.onload = function() {
    problem = document.getElementById("problem");
    userAnswer = document.getElementById("problem-answer");
    result = document.getElementById("result");
    resultPanel = document.getElementById("resultPanel");

    rangeEasy = document.getElementById("range-easy");
    rangeNormal = document.getElementById("range-normal");
    rangeHard = document.getElementById("range-hard");
    signPlus = document.getElementById("sign+");
    signMinus = document.getElementById("sign-");
    signMult = document.getElementById("sign*");
    signDev = document.getElementById("sign/");
    inf = document.getElementById("inf");
    five = document.getElementById("five");
    ten = document.getElementById("ten");
    fiveteen = document.getElementById("fiveteen");
    swit =   document.getElementById("switch");

    resultPanel.style.visibility = 'hidden';
}

function settingLevel() {
    let level = "1000";
    if (rangeEasy.checked) {
        level = 10;
    }
    if (rangeNormal.checked) {
        level = 100;
    }
    if (rangeHard.checked) {
        level = 1000;
    }
    return level
}

function settingSign() {
    let sign = "random";
    if (signPlus.checked) {
        sign = "+";
    }
    if (signMinus.checked) {
        sign = "-";
    }
    if (signMult.checked) {
        sign = '*';
    }
    if (signDev.checked) {
        sign = '/';
    }
    return sign
}

function settingAmount() {
    let amount = 0;
    if (inf.checked) {
        amount = 0;
    }
    if (five.checked) {
        amount = 5;
    }
    if (ten.checked) {
        amount = 10;
    }
    if (fiveteen.checked) {
        amount = 15;
    }
    return amount;
}

function settingNegative() {
    let negative = false;
    if (swit.checked) {
        negative = true;
    }
    return negative;
}

function start() {
    let level = settingLevel();
    let negative = settingNegative();
    let sign = settingSign();
    let amount = settingAmount();
    let infinity = "";
    if (negative) {
        negative = "true";
    } else {
        negative = "";
    }
    if (amount === 0) {
        infinity = "true";
    }

    fetch('/main-game', {
        method: 'POST',
        body: new URLSearchParams({
            max_number: level,
            negative: negative,
            sign: sign,
            infinity:infinity,
            amount: amount
        })
    })
        .then(response => response.json())
        .then(data => {
            resultPanel.style.visibility = 'hidden';

            content = data.content;
            index = 0;
            maxindex = content.length - 1;
            incorrect = 0;
            reloadText();
        })
}

function reloadText() {
    let textNew = content[index][0];
    problem.innerText = textNew;
}
function reader() {
    console.log(content[index][1]);
    if (userAnswer.value !== '' && index <= maxindex){
        if (Number(userAnswer.value) !== Number(content[index][1])) {
            incorrect += 1;
        }
        results();
    }
}
function results(){
    if (index === maxindex) {
        let text;
        if (incorrect === 0){
            text = "you are alright";
        } else {
            text = `you made ${incorrect} mistakes, looser`;
        }
        problem.innerText = text;
        // resultPanel.style.visibility = 'visible';
        index += 1
    } else {
        index += 1;
        reloadText();
    }
}