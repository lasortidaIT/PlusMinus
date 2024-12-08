class NumberArea {
    constructor(input1, input2, input3) {
        this.ui = [input1, input2, input3];
        this.status = [false, false, false];
        this.values = [10, 100, 1000];
        this.choosed = 0;
    }

    updateStatus(active) {
        let fill = false;
        if (active) {
            for (let i = 2; i >= 0; i--) {
                    if (fill) {
                        this.status[i] = true;
                    }
                    if (this.status[i]) {
                        fill = true;
                    }
            }
        } else {
            for (let i = 0; i <= 2; i++) {
                if (!this.status[i]) {
                    fill = true;
                }
                if (fill) {
                    this.status[i] = false;
                }
            }
        }
    }

    updateUI() {
        for (let i = 0; i <= 2; i++) {
            this.ui[i].checked = this.status[i];
        }
    }

    clickUI(index) {
        this.status[index] = this.ui[index].checked;
        this.updateStatus(this.ui[index].checked);
        this.updateUI();
    }

    setDefault() {
        this.status = [true, false, false];
        this.updateUI();
    }

    value() {
        this.choosed = 0;
        for (let i = 2; i >= 0; i--) {
            if (this.status[i]) {
                this.choosed = i;
                break;
            }
        }
        if (this.choosed === 0) {
            this.setDefault();
        }
        return this.values[this.choosed];
    }
}

class SignArea {

    constructor(plus, minus, mult, divide) {
        this.ui = [plus, minus, mult, divide];
        this.values = ['+', '-', '*', '/'];
    }

    setDefault() {
        for (let i = 0; i <= 3; i++) {
            this.ui[i].checked = true;
        }
    }

    value() {
        let choosed = [];
        for (let i = 0; i <= 3; i++) {
            if (this.ui[i].checked) {
                choosed.push(this.values[i]);
            }
        }
        if (choosed.length === 0) {
            choosed = this.values;
            this.setDefault();
        }
        return choosed
    }

}

class AmountArea {

    constructor(input1, input2, input3, input4) {
        this.ui = [input1, input2, input3, input4];
        this.values = [1, 5, 10, 15];
        this.choosed = 0;
    }

    updateUI(index) {
        this.ui[this.choosed].checked = false;
        this.ui[index].checked = true;
        this.choosed = index;
    }

    setDefault() {
        this.updateUI(0);
    }

    click(index) {
        this.updateUI(index);
    }

    value() {
        if (this.choosed === 0) {
            this.setDefault();
        }
        return this.values[this.choosed];
    }
}

class SettingGame {
    constructor(numberArea, negativeSwitch, signArea, amountArea) {
        this.numberArea = numberArea;
        this.negativeSwitch = negativeSwitch;
        this.signArea = signArea;
        this.amountArea = amountArea;
    }

    getSetting() {
        let number = this.numberArea.value();
        let signs = this.signArea.value().join('');
        let amount = this.amountArea.value();
        let negative = "";
        if (this.negativeSwitch.checked) {
            negative = "true";
        }
        return [number, negative, signs, "", amount]
    }
}

class ProblemUI {
    constructor(windowProblem, input, resultText, resultPanel, content) {
        this.windowProblem = windowProblem;
        this.input = input;
        this.resultText = resultText;
        this.resultPanel = resultPanel;
        this.content = content;
        this.index = 0;
        this.incorrect = []
    }

    checkAnswer(text) {
        if (Number(text) !== Number(this.content[this.index][1])) {
            this.incorrect.push(`${this.content[this.index][0]} = ${text} -> ${this.content[this.index][1]} \n`)
        }
        this.input.value = "";
    }

    loadTask() {
        console.log(this.content);
        this.windowProblem.innerText = this.content[this.index][0];
    }

    getInputText() {
        return this.input.value;
    }

    getResults() {
        let mistakes = this.incorrect.length;
        if (mistakes > 0) {
            this.resultPanel.style = 'visible';
            this.windowProblem.innerText = `you made ${mistakes} mistakes, looser`;
            this.resultText.innerText = this.incorrect.join('');
        } else {
            this.windowProblem.innerText = `you are the best`;
        }
    }
}

let numberArea;
let amountArea;
let negativeSwitch;
let signArea;
let settings;
let hint;
let problem;
let userAnswer;
let result;
let resultPanel;
let problemUI;

window.onload = function() {
    rangeEasy = document.getElementById("range-easy");
    rangeNormal = document.getElementById("range-normal");
    rangeHard = document.getElementById("range-hard");

    negativeSwitch = document.getElementById("switch");

    signPlus = document.getElementById("sign+");
    signMinus = document.getElementById("sign-");
    signMult = document.getElementById("sign*");
    signDev = document.getElementById("sign/");

    inf = document.getElementById("inf");
    five = document.getElementById("five");
    ten = document.getElementById("ten");
    fiveteen = document.getElementById("fiveteen");

    problem = document.getElementById("problem");
    userAnswer = document.getElementById("problem-answer");
    result = document.getElementById("result");
    resultPanel = document.getElementById("resultPanel");
    hint = document.getElementById("hint");

    userAnswer.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            go();
        }
    })

    numberArea = new NumberArea(rangeEasy, rangeNormal, rangeHard);
    signArea = new SignArea(signPlus, signMinus, signMult, signDev);
    amountArea = new AmountArea(inf, five, ten, fiveteen);

    settings = new SettingGame(numberArea, negativeSwitch, signArea, amountArea);

    resultPanel.style.visibility = 'hidden';
    hint.style.visibility = 'hidden';
}

function numberClick(index) {
    numberArea.clickUI(index);
}

function amountClick(index) {
    amountArea.click(index);
}

function startGame() {
    let dataSetting = settings.getSetting();

    fetch('/main-game', {
        method: 'POST',
        body: new URLSearchParams({
            max_number: dataSetting[0],
            negative: dataSetting[1],
            sign: dataSetting[2],
            infinity: dataSetting[3],
            amount: dataSetting[4],
        })
    })
        .then(response => response.json())
        .then(data => {
            problemUI = new ProblemUI(problem, userAnswer, result, resultPanel, data.content);
            problemUI.loadTask();
            if (data.content.length !== 1) {
                resultPanel.style.visibility = 'hidden';
                hint.style.visibility = 'hidden';
            }
        })
}

function go() {
    if (problemUI.content.length === 1) {
        let text = problemUI.getInputText();
        problemUI.checkAnswer(text);
        if (problemUI.incorrect.length === 0) {
            hint.style.background = '#6bdb6b';
            hint.innerText = 'correct';
            problemUI.resultPanel.style.visibility = 'hidden';
        } else {
            hint.style.background = '#ff6666';
            hint.innerText = 'incorrect';
            problemUI.resultText.innerText = problemUI.incorrect.join('');
            problemUI.resultPanel.style.visibility = 'visible';
        }
        hint.style.visibility = 'visible';
        startGame();
    } else {
        if (problemUI.index !== problemUI.content.length) {
            let text = problemUI.getInputText();
            if (text !== '') {
                problemUI.checkAnswer(text);
                problemUI.index += 1
                if (problemUI.index === problemUI.content.length) {
                    problemUI.getResults();
                } else {
                    problemUI.loadTask();
                }
            }
        }
    }
}