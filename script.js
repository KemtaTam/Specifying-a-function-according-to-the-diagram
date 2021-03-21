const form = document.getElementById("form");


answer = {
	1: ["¬x0∧x1∨¬x1∧x0", "¬x1∧x0∨¬x0∧x1",
		"x1∧¬x0∨¬x1∧x0", "x0∧¬x1∨¬x0∧x1",
		"¬x0∧x1∨x0∧¬x1", "¬x1∧x0∨x1∧¬x0",
		"x1∧¬x0∨x0∧¬x1", "x0∧¬x1∨x1∧¬x0",

		/*"(¬x0∧x1)∨(¬x1∧x0)", "(¬x1∧x0)∨(¬x0∧x1)",
		"(x1∧¬x0)∨(¬x1∧x0)", "(x0∧¬x1)∨(¬x0∧x1)",
		"(¬x0∧x1)∨(x0∧¬x1)", "(¬x1∧x0)∨(x1∧¬x0)",
		"(x1∧¬x0)∨(x0∧¬x1)", "(x0∧¬x1)∨(x1∧¬x0)"*/
	]
};

let bInv = document.getElementById("bInv");
let bKon = document.getElementById("bKon");
let bDiz = document.getElementById("bDiz");
let bX0 = document.getElementById("bX0");
let bX1 = document.getElementById("bX1");
let valOfFunc = document.getElementsByClassName("valueOfFunc")[0];

bInv.addEventListener("click", () =>{
	valOfFunc.value += '¬';
	valOfFunc.focus();
})
bKon.addEventListener("click", () =>{
	valOfFunc.value += '∧';
	valOfFunc.focus();
})
bDiz.addEventListener("click", () =>{
	valOfFunc.value += '∨';
	valOfFunc.focus();
})
bX0.addEventListener("click", () =>{
	valOfFunc.value += 'x0';
	valOfFunc.focus();
})
bX1.addEventListener("click", () =>{
	valOfFunc.value += 'x1';
	valOfFunc.focus();
})

let popup1 = document.getElementsByClassName("pop-up1")[0];
let popup2 = document.getElementsByClassName("pop-up2")[0];
let end_button = document.getElementsByClassName("end_button")[0];
let bOk1 = document.getElementById("bOk1");
let bOk2 = document.getElementById("bOk2");

//при нажатии на кнопку Отправить ответ
function retrieveFormValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно
	valOfFunc = form.querySelector('[name="func"]');

	value = {
		func: valOfFunc.value,
	};

	console.log("v1", value);

	if (checkAnswer(valOfFunc.value)) 
	{
		popup1.style.display = "block";
	}
	else if (checkForm(form)) 
	{
		popup2.style.display = "block";
	}
}
form.addEventListener("submit", retrieveFormValue);
bOk1.onclick = function(){popup1.style.display = "none";}
bOk2.onclick = function(){popup2.style.display = "none";}

//проверяет возможные записи правильного ответа
function checkAnswer(ans)
{
	for(var i=0; i<answer[1].length; i++){
		if(answer[1][i] == delSpace(ans)) break;
	}
	return i != answer[1].length;
}
//удаляет пробелы и скобки в ответе пользователя
function delSpace(ans){
	let newAns = "";
	for(let i=0; i<ans.length; i++){
		if (ans[i] != ' ' && ans[i] != '(' && ans[i] != ')') newAns += ans[i];
	}
	console.log(newAns);
	return newAns;
}
//функция проверки формы на корректность 
function checkForm(form){
	let e = 0;
	
		if (!form[form.length-2].value.replace(/^\s+|\s+$/g, "")) 
		{
			form[form.length-2].style.border = "1px solid red";
			e = 1;
		}
	
	if (e) 
	{
		alert("Заполните все поля");
		return false;
	} else return true;
}





