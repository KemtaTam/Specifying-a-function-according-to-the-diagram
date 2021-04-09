const form = document.getElementById("form");
let header = document.getElementsByTagName("header")[0];

let num = getRandomIntInclusive(1, 3);

let image = document.createElement("img");
image.setAttribute("src", "images/" + num + "scheme.jpg");
header.after(image);

let clarification = document.createElement("section");
clarification.style.width = "380px";
clarification.style.textAlign = "center";
clarification.style.fontSize = "13px";
clarification.setAttribute("id", "clar");
if(num == 1){
	clarification.textContent = "Запишите ответ в виде ДНФ (скобки не учитываются)";
} else if(num == 2){
	clarification.textContent = "По возможности сократите ответ (скобки не учитываются)";
} else if(num == 3){
	clarification.textContent = "Запишите в ответе переменные по возрастанию (x3∧x2∧x1 → x1∧x2∧x3), скобки не учитываются";
}
let symb = document.getElementsByClassName("symb")[0];
symb.after(clarification);

answer = {
	1: ["¬x0∧x1∨¬x1∧x0", "¬x1∧x0∨¬x0∧x1",
		"x1∧¬x0∨¬x1∧x0", "x0∧¬x1∨¬x0∧x1",
		"¬x0∧x1∨x0∧¬x1", "¬x1∧x0∨x1∧¬x0",
		"x1∧¬x0∨x0∧¬x1", "x0∧¬x1∨x1∧¬x0",
		/*"(¬x0∧x1)∨(¬x1∧x0)", "(¬x1∧x0)∨(¬x0∧x1)",
		"(x1∧¬x0)∨(¬x1∧x0)", "(x0∧¬x1)∨(¬x0∧x1)",
		"(¬x0∧x1)∨(x0∧¬x1)", "(¬x1∧x0)∨(x1∧¬x0)",
		"(x1∧¬x0)∨(x0∧¬x1)", "(x0∧¬x1)∨(x1∧¬x0)"*/
	],
	2: ["x0∧¬x1∧¬x2", "x0∧¬x2∧¬x1", 
		"¬x1∧x0∧¬x2", "¬x1∧¬x2∧x0",
		"¬x2∧x0∧¬x1", "¬x2∧¬x1∧x0"
	],
	3: ["x0∧x1∧¬x2∨x1∧x2", "x1∧x2∨x0∧x1∧¬x2"]
};

let bInv = document.getElementById("bInv");
let bKon = document.getElementById("bKon");
let bDiz = document.getElementById("bDiz");
let valOfFunc = document.getElementsByClassName("valueOfFunc")[0];

bInv.addEventListener("click", () => {
	insertSomething('¬', valOfFunc);
})
bKon.addEventListener("click", () => {
	insertSomething('∧', valOfFunc);
})
bDiz.addEventListener("click", () => {
	insertSomething('∨', valOfFunc);
})

let popup1 = document.getElementsByClassName("pop-up1")[0];
let popup2 = document.getElementsByClassName("pop-up2")[0];
let end_button = document.getElementsByClassName("end_button")[0];
let bOk1 = document.getElementById("bOk1");
let bOk2 = document.getElementById("bOk2");

//при нажатии на кнопку Отправить ответ
function retrieveFormValue(event) {
	event.preventDefault(); //отправлять на сервер не нужно
	valOfFunc = form.querySelector('[name="func"]');

	value = {
		func: valOfFunc.value,
	};

	console.log("v1", value);

	if (checkAnswer(valOfFunc.value)) {
		popup1.style.display = "block";
	}
	else if (checkForm(form)) {
		popup2.style.display = "block";
	}
}
form.addEventListener("submit", retrieveFormValue);
bOk1.onclick = function () { popup1.style.display = "none"; }
bOk2.onclick = function () { popup2.style.display = "none"; }

//проверяет возможные записи правильного ответа
function checkAnswer(ans) {
	for (var i = 0; i < answer[num].length; i++) {
		if (answer[num][i] == delSpace(ans)) break;
	}
	return i != answer[num].length;
}
//удаляет пробелы и скобки в ответе пользователя
//где скобки будут нужны
function delSpace(ans) {
	let newAns = "";
	for (let i = 0; i < ans.length; i++) {
		if (ans[i] != ' ' && ans[i] != '(' && ans[i] != ')') newAns += ans[i];
	}
	console.log(newAns);
	return newAns;
}
//функция проверки формы на корректность 
function checkForm(form) {
	let e = 0;

	if (!form[form.length - 2].value.replace(/^\s+|\s+$/g, "")) {
		form[form.length - 2].style.border = "1px solid red";
		e = 1;
	}

	if (e) {
		alert("Заполните все поля");
		return false;
	} else return true;
}
//Функция вставки чего-то в поле ввода туда, где находится курсор
function insertSomething(insert, textArea) 
{
	// get cursor's position:
	var startPos = textArea.selectionStart,
		endPos = textArea.selectionEnd,
		cursorPos = startPos,
		tmpStr = textArea.value;

	// insert:
	textArea.value = tmpStr.substring(0, startPos) + insert + tmpStr.substring(endPos, tmpStr.length);

	// move cursor:
	setTimeout(() => {
		cursorPos += insert.length;
		textArea.selectionStart = textArea.selectionEnd = cursorPos;
	}, 10);

	textArea.focus();
}
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }




