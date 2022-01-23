"use strict";

let fam = getFIO('введите вашу фамилию', 'введите вашу фамилию, запись должна содержать только буквы');
let name = getFIO('введите ваше имя', 'введите ваше имя, запись должна содержать только буквы');
let patr = getFIO('введите ваше отчество', 'введите ваше отчество, запись должна содержать только буквы');
let age = getAge('введите ваш возраст');
let isWoman = confirm(
	'нажмите ОК, если ваш пол - женский\nнажмите Cancel, если ваш пол - мужской.'
);

let age_days = age * 365;
let age_5 = age + 5;

let gender = (isWoman) ? 'женский' : 'мужской';

let senior = seniorCheck();

// * лучший вариант кода
// let limit = isWoman ? 60 : 65;							// лимит пенсионного возраста для женщин 60, для мужчин 65
// let senior = (age > limit) ? 'да' : 'нет';			// и функция не нужна

alert(
	`ваше ФИО: ${fam} ${name} ${patr}\nваш возраст в годах: ${age}\nваш возраст в днях: ${age_days}\nчерез 5 лет вам будет: ${age_5}\nваш пол: ${gender}\nвы на пенсии: ${senior}`
);

function getFIO(question) {
	let getAnswer = null;
	let answer = null;

	while (true) {
		getAnswer = prompt(question);
		if (isNaN(getAnswer)) {
			answer = getAnswer;
			break;
		}
	}

	return answer;
}

// * лучший вариант кода
// function getFIO(question, question2) {
// 	var answer = prompt(question);
// 		while (!answer) {										// answer приводится к boolean, null и пустая строка => false, а логич отрицание превращает его в true - пока true, цикл повторяется
// 			answer = prompt(question2);
// 		}				
// 	return answer;
// }

function getAge(question) {
	let getAnswer = null;
	let answer = null;

	do {
		getAnswer = parseInt(prompt(question));
		answer = getAnswer;
	} while (isNaN(answer) || answer <= 0 || answer > 100);

	return answer;
}

// * лучший вариант кода
// function getAge(question) {
// 	do {
// 		var answerS = prompt(question);													// todo можно еще добавить проверку на не null и обрезать пробельные символы, на случай если пользователь введет пробелы в начале строки
// 		var answer = parseInt(answerS);
// 	} while (!answerS || isNaN(answer) || answer < 0 || answer > 100);		// 2 проверки: !answerS (проверка пустая ли строка) и isNaN, чтобы предупредить возможное изменения кода, если parseInt заменят на Number, чтобы не было ошибки в коде
// 	return answer;
// }

function seniorCheck() {
	let answer = null;

	if (isWoman == true && age > 60) {
		answer = 'да'
	} else if (isWoman == false && age > 65) {
		answer = 'да'
	} else {
		answer = 'нет'
	};

	return answer;
}