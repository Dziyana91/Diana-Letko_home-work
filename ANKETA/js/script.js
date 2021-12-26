"use strict";

let fam = getFIO('введите вашу фамилию');
let name = getFIO('введите ваше имя');
let patr = getFIO('введите ваше отчество');
let age = getAge('введите ваш возраст');
let isWoman = confirm(
	'нажмите ОК, если ваш пол - женский\nнажмите Cancel, если ваш пол - мужской.'
);

let age_days = age * 365;
let age_5 = age + 5;

let gender = (isWoman == true) ? 'женский' : 'мужской';

let senior = (age > 65) ? 'да' : 'нет';

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

function getAge(question) {
	let getAnswer = null;
	let answer = null;

	do {
		getAnswer = parseInt(prompt(question));
		answer = getAnswer;
	} while (isNaN(answer) || answer <= 0 || answer > 100);

	return answer;
}