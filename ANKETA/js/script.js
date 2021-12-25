let fam = prompt('введите вашу фамилию');
let name = prompt('введите ваше имя');
let patr = prompt('введите ваше отчество');
let age = parseInt(prompt('введите ваш возраст'));
let isWoman = confirm('ваш пол - женский?');

let age_days = age * 365;
let age_5 = age + 5;

let gender = (isWoman == true) ? 'женский' : 'мужской';

let senior = (age > 65) ? 'да' : 'нет';

alert(
	`ваше ФИО: ${fam} ${name} ${patr}\nваш возраст в годах: ${age}\nваш возраст в днях: ${age_days}\nчерез 5 лет вам будет: ${age_5}\nваш пол: ${gender}\nвы на пенсии: ${senior}`
);