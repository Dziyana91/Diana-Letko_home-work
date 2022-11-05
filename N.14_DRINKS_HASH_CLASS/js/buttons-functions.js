"use strict";

let drinkStorage = new HashStorageClass();


function getInfo(question) {
	let answer = prompt(question);
	while (!answer) {						// answer приводится к boolean, null и пустая строка => false, а логич отрицание превращает его в true - пока true, цикл повторяется
		answer = prompt(question);
	}
	return answer;
}

function infoDisplay(text) {
	let infoField = document.getElementById('info-field');
	infoField.innerHTML = text;
}

function add() {
	let drinkName = getInfo('введите название напитка');

	let isAlco = confirm('если напиток алкогольный, нажмите ОК\nесли безалкогольный - Cancel');
	let alco = (isAlco) ? 'да' : 'нет';

	let recipe = getInfo('введите ингредиенты напитка');

	drinkStorage.addVallue(drinkName,
		{ alco, recipe });

	let notification = `напиток <span>${drinkName}</span> добавлен в хранилище`;
	infoDisplay(notification);

	console.log(drinkStorage);
}

function info() {
	let drinkName = getInfo('введите название напитка');
	let drinkInfo = drinkStorage.getValue(drinkName);
	let notification = null;

	if (drinkInfo == undefined) {
		notification = `напиток <span>${drinkName}</span> отсутствует в хранилище`
	} else {
		notification = `напиток <span>${drinkName}</span><br>алкогольный: <span>${drinkInfo.alco}</span><br>состав: <span>${drinkInfo.recipe}</span>`;
	}

	infoDisplay(notification);
}

function del() {
	let drinkName = getInfo('введите название напитка');
	let drinkDelitionStatus = null;

	let deleteDrink = drinkStorage.deleteValue(drinkName);

	if (deleteDrink) {
		drinkDelitionStatus = `информация о напитке <span>${drinkName}</span> удалена`
	} else {
		drinkDelitionStatus = `напиток <span>${drinkName}</span> не найден в хранилище`
	}

	infoDisplay(drinkDelitionStatus);

	console.log(drinkStorage);
}

function list() {
	let drinksNameList = drinkStorage.getKeys().join('<br>');

	let notification = `<div>В хранилище имеются следующие напитки:</div> <span>${drinksNameList}</span>`;

	infoDisplay(notification);
}