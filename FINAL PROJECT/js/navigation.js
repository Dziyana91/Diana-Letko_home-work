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
// window.onload = trackEventsMainPage;

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();

function trackEventsMainPage() {
	let playBtn = document.getElementById('play');
	let settingsBtn = document.getElementById('settings');
	let championsBtn = document.getElementById('champions');
	let aboutBtn = document.getElementById('about');

	playBtn.addEventListener('click', switchToPlayPage, false);
	playBtn.addEventListener('touchend', switchToPlayPage, false);

	settingsBtn.addEventListener('click', switchToSettingsPage, false);
	settingsBtn.addEventListener('touchend', switchToSettingsPage, false);

	championsBtn.addEventListener('click', switchToChampionsPage, false);
	championsBtn.addEventListener('touchend', switchToChampionsPage, false);

	aboutBtn.addEventListener('click', switchToAboutPage, false);
	aboutBtn.addEventListener('touchend', switchToAboutPage, false);

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
		// if (SPAState.pagename == 'Photo')
		// 	SPAState.photoid = parts[1]; // для фото нужна ещё вторая часть закладки - номер фото
	}
	else
		SPAState = { pagename: 'About' }; // иначе показываем главную страницу

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
	// if (newState.pagename == 'Photo')
	// 	stateStr += "_" + newState.photoid;
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


