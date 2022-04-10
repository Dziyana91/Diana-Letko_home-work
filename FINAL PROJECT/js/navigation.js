"use strict";

window.onload = function () {
	addHexBackground();
	trackEventsMainPage();
	checkMusicAndSoundsStatus();
};

// в закладке УРЛа будем хранить разделённые подчёркиваниями слова
// #Play - уровни
// #Settings - настройки
// #Champions - таблица рекордов
// #About - главная

// отслеживаем изменение закладки в УРЛе
// оно происходит при любом виде навигации
// в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
window.onhashchange = switchToStateFromURLHash;

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();

function trackEventsMainPage() {
	let playBtn = document.getElementById('play');
	let settingsBtn = document.getElementById('settings');
	let championsBtn = document.getElementById('champions');
	let aboutBtn = document.getElementById('about');

	playBtn.addEventListener('click', () => { playButtonSound(); switchToPlayPage() }, false);
	playBtn.addEventListener('touchend', () => { playButtonSound(); switchToPlayPage() }, false);

	settingsBtn.addEventListener('click', () => { playButtonSound(); switchToSettingsPage() }, false);
	settingsBtn.addEventListener('touchend', () => { playButtonSound(); switchToSettingsPage() }, false);

	championsBtn.addEventListener('click', () => { playButtonSound(); switchToChampionsPage() }, false);
	championsBtn.addEventListener('touchend', () => { playButtonSound(); switchToChampionsPage() }, false);

	aboutBtn.addEventListener('click', () => { playButtonSound(); switchToAboutPage() }, false);
	aboutBtn.addEventListener('touchend', () => { playButtonSound(); switchToAboutPage() }, false);

}


// вызывается при изменении закладки УРЛа
// а также при первом открытии страницы
// читает новое состояние приложения из закладки УРЛа
// и обновляет ВСЮ вариабельную часть веб-страницы
// соответственно этому состоянию
function switchToStateFromURLHash() {

	// текущее состояние приложения
	// это Model из MVC
	let SPAState = {};

	let URLHash = window.location.hash;

	// убираем из закладки УРЛа решётку
	let stateStr = URLHash.substr(1);

	if (stateStr != "") { // если закладка непустая, читаем из неё состояние и отображаем
		let parts = stateStr.split("_")
		SPAState = { pagename: parts[0] }; // первая часть закладки - номер страницы
		if (SPAState.pagename == 'Level')
			SPAState.levelid = parts[1]; // для уровня нужна ещё вторая часть закладки - номер уровня
	}
	else
		SPAState = { pagename: 'About' }; // иначе показываем страницу с информацией

	console.log('Новое состояние приложения:');
	console.log(SPAState);

	// обновляем вариабельную часть страницы под текущее состояние
	// это реализация View из MVC - отображение состояния модели в HTML-код
	let displayArea = document.getElementById('play-field');
	let pageHTML = "";
	switch (SPAState.pagename) {
		case 'About':
			pageHTML = aboutPage();
			break;
		case 'Play':
			pageHTML = playPage();
			break;
		case 'Settings':
			pageHTML = settingsPage();
			break;
		case 'Champions':
			pageHTML = championsPage();
			break;
		case 'Level':
			pageHTML = openLevel(SPAState.levelid);
			break;
	}
	let currentContent = displayArea.childNodes;
	for (let i = 0; i < currentContent.length; i++) {
		displayArea.removeChild(currentContent[i]);
	}
	displayArea.appendChild(pageHTML);

}

// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function switchToState(newState) {
	// устанавливаем закладку УРЛа
	// нужно для правильной работы кнопок навигации браузера
	// (т.к. записывается новый элемент истории просмотренных страниц)
	// и для возможности передачи УРЛа другим лицам
	let stateStr = newState.pagename;
	if (newState.pagename == 'Level')
		stateStr += "_" + newState.levelid;
	location.hash = stateStr;

	// АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
	// т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}


function switchToPlayPage() {
	switchToState({ pagename: 'Play' });
}

function switchToSettingsPage() {
	switchToState({ pagename: 'Settings' });
}

function switchToChampionsPage() {
	switchToState({ pagename: 'Champions' });
}

function switchToAboutPage() {
	switchToState({ pagename: 'About' });
}

function switchToLevelPage(levelId) {
	switchToState({ pagename: 'Level', levelid: levelId });
}

