"use strict";

let drinkStorage = new LocStorageClass('drinks');
let dishStorage = new LocStorageClass('dishes');

let addDrinkBtn = document.getElementById('add-drink');
addDrinkBtn.addEventListener('click', function () { add('drinks') }, false);
let addDishBtn = document.getElementById('add-dish');
addDishBtn.addEventListener('click', function () { add('dishes') }, false);
let infoDrinkBtn = document.getElementById('info-drink');
infoDrinkBtn.addEventListener('click', function () { info('drinks') }, false);
let infoDishBtn = document.getElementById('info-dish');
infoDishBtn.addEventListener('click', function () { info('dishes') }, false);
let delDrinkBtn = document.getElementById('del-drink');
delDrinkBtn.addEventListener('click', function () { del('drinks') }, false);
let delDishBtn = document.getElementById('del-dish');
delDishBtn.addEventListener('click', function () { del('dishes') }, false);
let listDrinkBtn = document.getElementById('list-drink');
listDrinkBtn.addEventListener('click', function () { list('drinks') }, false);
let listDishBtn = document.getElementById('list-dish');
listDishBtn.addEventListener('click', function () { list('dishes') }, false);


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

function add(storageType) {

	let name = null;
	let askType = null;
	let type = null;
	let recipe = null;
	let notification = null;

	if (storageType === 'drinks') {
		name = getInfo('введите название напитка');
		askType = confirm('если напиток алкогольный, нажмите ОК\nесли безалкогольный - Cancel');
		type = (askType) ? 'да' : 'нет';
		recipe = getInfo('введите ингредиенты напитка');
		drinkStorage.addVallue(name,
			{ type, recipe });
		notification = `напиток <span>${name}</span> добавлен в хранилище`;
	};

	if (storageType === 'dishes') {
		name = getInfo('введите название блюда');
		askType = confirm('если блюдо вегетарианское, нажмите ОК\nесли нет - Cancel');
		type = (askType) ? 'да' : 'нет';
		recipe = getInfo('введите ингредиенты блюда');
		dishStorage.addVallue(name,
			{ type, recipe });
		notification = `блюдо <span>${name}</span> добавлено в хранилище`;
	};

	infoDisplay(notification);
}

function info(storageType) {
	let name = null;
	let info = null;
	let notification = null;

	if (storageType === 'drinks') {
		name = getInfo('введите название напитка');
		info = drinkStorage.getValue(name);

		if (info == undefined) {
			notification = `напиток <span>${name}</span> отсутствует в хранилище`
		} else {
			notification = `напиток <span>${name}</span><br>алкогольный: <span>${info.type}</span><br>состав: <span>${info.recipe}</span>`;
		};
	};

	if (storageType === 'dishes') {
		name = getInfo('введите название блюда');
		info = dishStorage.getValue(name);

		if (info == undefined) {
			notification = `блюдо <span>${name}</span> отсутствует в хранилище`
		} else {
			notification = `блюдо <span>${name}</span><br>вегетарианское: <span>${info.type}</span><br>состав: <span>${info.recipe}</span>`;
		};
	};

	infoDisplay(notification);
}

function del(storageType) {
	let name = null;
	let deletePosition = null;
	let notification = null;

	if (storageType === 'drinks') {
		name = getInfo('введите название напитка');
		deletePosition = drinkStorage.deleteValue(name);

		if (deletePosition) {
			notification = `информация о напитке <span>${name}</span> удалена`
		} else {
			notification = `напиток <span>${name}</span> не найден в хранилище`
		};
	};

	if (storageType === 'dishes') {
		name = getInfo('введите название блюда');
		deletePosition = dishStorage.deleteValue(name);

		if (deletePosition) {
			notification = `информация о блюде <span>${name}</span> удалена`
		} else {
			notification = `блюдо <span>${name}</span> не найденр в хранилище`
		};
	};

	infoDisplay(notification);
}

function list(storageType) {
	let list = null;
	let notification = null;

	if (storageType === 'drinks') {
		list = drinkStorage.getKeys().join('<br>');
		notification = `<div>В хранилище имеются следующие напитки:</div> <span>${list}</span>`;
	};

	if (storageType === 'dishes') {
		list = dishStorage.getKeys().join('<br>');
		notification = `<div>В хранилище имеются следующие блюда:</div> <span>${list}</span>`;
	};

	infoDisplay(notification);
}