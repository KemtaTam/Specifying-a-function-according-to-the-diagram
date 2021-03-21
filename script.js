// Ответ: (¬x0 ∧ x1) ∨ (¬x1 ∧ x0)
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

function retrieveFormValue(event) 
{
	event.preventDefault(); //отправлять на сервер не нужно
	valOfFunc = form.querySelector('[name="func"]');

	value = {
		func: valOfFunc.value,
	};

	console.log("v1", value);

	if (checkAnswer(valOfFunc.value)) {
		alert("Correct answer!");
	}
	else if (checkForm(form)) alert("Incorrect answer! Try again.");
}
form.addEventListener("submit", retrieveFormValue);

function checkAnswer(ans)
{
	for(var i=0; i<answer[1].length; i++){
		if(answer[1][i] == delSpace(ans)) break;
	}
	return i != answer[1].length;
}

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
