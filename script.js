const form = document.getElementById("form");
let header = document.getElementsByTagName("header")[0];
let canvas = document.getElementsByTagName('canvas')[0];
let ctx = canvas.getContext('2d');

let num = getRandomIntInclusive(1, 3);
canvas.style.backgroundImage = 'url(images/' + num + 'schema.svg)';
if(num==3){
	canvas.setAttribute('width', '590px');
	canvas.setAttribute('height', '260px');
}

let draw = document.getElementsByClassName('draw-img')[0];
let clear = document.getElementsByClassName('clear-img')[0];
let clearAll = document.getElementsByClassName('clearAll-btn')[0];
//функция рисования
function drawing(){
	canvas.onmousedown = (event) => {
		let x = event.offsetX;
		let y = event.offsetY;

		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.moveTo (x,y);
		ctx.lineTo (x,y);
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'red';
		ctx.stroke();

		canvas.onmousemove = (event) => {
			let x = event.offsetX;
			let y = event.offsetY;
			ctx.lineTo (x,y);
			ctx.stroke();
		}
		canvas.onmouseup = () =>{
			canvas.onmousemove = null;
		}
		canvas.onmouseout = function(){
			canvas.onmousemove = null;
		}
	}
}
//функция стирания
function clearing(){
	canvas.onmousedown = (event) => {
		let x = event.offsetX;
		let y = event.offsetY;

		ctx.beginPath();
		ctx.clearRect(x-3,y-3,6,6)
		ctx.stroke();

		canvas.onmousemove = (event) => {
			let x = event.offsetX;
			let y = event.offsetY;
			ctx.clearRect(x-3,y-3,6,6)
		}
		canvas.onmouseup = () =>{
			canvas.onmousemove = null;
		}
		canvas.onmouseout = function(){
			canvas.onmousemove = null;
		}
	}
}
draw.onclick = function(){
	canvas.style.cursor = 'crosshair';
	drawing();
}
clear.onclick = function(){
	canvas.style.cursor = 'not-allowed';
	clearing();
}
clearAll.onclick = function(){
	ctx.clearRect(0,0, 1000,1000);
}

let clarification = document.createElement("section");
clarification.setAttribute("id", "clar");

if (num == 1) {
	clarification.insertAdjacentHTML('beforeend', `<b id="imp">Важно: </b> \
	${ 'Переменные в конъюнкциях следует указывать в порядке возрастания индексов (x3∧x2∨x2∧x1 → x2∧x3∨x1∧x2) + запишите ответ БЕЗ скобок.' }`)
} else if (num == 2) {
	clarification.insertAdjacentHTML('beforeend', `<b id="imp">Важно: </b> \
	${ 'Переменные в конъюнкциях следует указывать в порядке возрастания индексов (x3∧x2∨x2∧x1 → x2∧x3∨x1∧x2) + запишите ответ БЕЗ скобок.' }`)
} else if (num == 3) {
	clarification.insertAdjacentHTML('beforeend', `<b id="imp">Важно: </b> \
	${ 'Переменные в конъюнкциях следует указывать в порядке возрастания индексов (x3∧x2∨x2∧x1 → x2∧x3∨x1∧x2) + запишите ответ БЕЗ скобок.' }`)
}

let symb = document.getElementsByClassName("symb")[0];
symb.after(clarification);

if(num == 1){
	let f = document.getElementById("f");
	let bFunc = document.getElementsByClassName("body_func")[0];
	f.textContent = "f(x0, x1) = ";
	bFunc.style.width = "355px";
}

answer = { 
	1: [ "x0∧¬x1∨¬x0∧x1", "¬x0∧x1∨x0∧¬x1",],
	2: ["x0∧¬x1∧¬x2", "x0∧¬x1∧¬x1∧¬x2"],
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

/* 	value = {
		func: valOfFunc.value,
	};
 */

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
function delSpace(ans) {
	let newAns = "";
	for (let i = 0; i < ans.length; i++) {
		if (ans[i] != ' ' && ans[i] != '(' && ans[i] != ')') newAns += ans[i];
	}
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
	// получить позицию курсора
	var startPos = textArea.selectionStart,
		endPos = textArea.selectionEnd,
		cursorPos = startPos,
		tmpStr = textArea.value;

	// вставить
	textArea.value = tmpStr.substring(0, startPos) + insert + tmpStr.substring(endPos, tmpStr.length);

	// сдвинуть курсор
	setTimeout(() => {
		cursorPos += insert.length;
		textArea.selectionStart = textArea.selectionEnd = cursorPos;
	}, 1);

	textArea.focus();
}
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

