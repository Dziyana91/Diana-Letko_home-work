"use strict";

function playPage() {
	let levelsField = document.createElement('div');
	levelsField.id = 'levelsField';

	let header = 'Выберите уровень';
	let headerTag = document.createElement('h3');
	headerTag.appendChild(document.createTextNode(header));
	levelsField.appendChild(headerTag);

	let levelsList = document.createElement('div');
	levelsList.id = 'levelsList'
	let levels = [1, 2, 3];
	let levelBtn = null;

	for (let levelNumber of levels) {
		levelBtn = document.createElement('div');
		levelBtn.className = 'lvlBtn';
		levelBtn.appendChild(document.createTextNode(levelNumber));

		levelBtn.addEventListener('click', function () { playButtonSound(); switchToLevelPage(levelNumber) }, false);
		levelBtn.addEventListener('touchend', function () { playButtonSound(); switchToLevelPage(levelNumber) }, false);
		levelsList.appendChild(levelBtn);
	}
	levelsField.appendChild(levelsList);
	return levelsField;
}

function openLevel(levelNumber) {

	// let displayArea = document.getElementById('play-field');
	// let currentContent = displayArea.childNodes;
	// for (let i = 0; i < currentContent.length; i++) {
	// 	displayArea.removeChild(currentContent[i]);
	// }

	let playArea = document.createElement('div');
	playArea.id = 'playArea';

	let puzzleField = document.createElement('div');
	puzzleField.id = 'puzzleField';

	let piecesField = document.createElement('div');
	piecesField.id = 'piecesField';

	let restartButton = document.createElement('div');
	restartButton.id = 'restartButton';
	restartButton.className = 'small-buttons';
	let restartButtonIcon = '<i class="fas fa-undo-alt"></i>';		// fontawesome icon
	restartButton.innerHTML = restartButtonIcon;
	restartButton.addEventListener('click', function () { playButtonSound(); openLevel(parseInt(levelNumber)) }, false);
	restartButton.addEventListener('touchend', function () { playButtonSound(); openLevel(parseInt(levelNumber)) }, false);
	piecesField.appendChild(restartButton);

	let nextLevelButton = document.createElement('div');
	nextLevelButton.id = 'nextLevelButton';
	nextLevelButton.className = 'small-buttons';
	let nextLevelButtonIcon = '<i class="far fa-arrow-alt-circle-right"></i>';		// fontawesome icon
	nextLevelButton.innerHTML = nextLevelButtonIcon;
	piecesField.appendChild(nextLevelButton);


	// SVG с пазлом
	let levelPuzzle = createLevel(parseInt(levelNumber));

	playArea.appendChild(puzzleField);

	playArea.appendChild(levelPuzzle);
	playArea.appendChild(piecesField);
	// displayArea.appendChild(playArea);
	return playArea
}

function createLevel(levelNumber) {
	// ищем игровое поле и рассчитываем размеры для SVG
	let playArea = document.getElementById('play-field');
	// размер SVG для пазла 80% от ширины всего поля
	let areaWidth = playArea.offsetWidth * 80 / 100;
	let areaHeight = playArea.offsetHeight * 70 / 100;
	// let areaHeight = areaWidth;

	if (areaWidth > areaHeight) {
		areaWidth = areaHeight;
	};

	const n = 6;																	// !не менять - количество сторон многоугольника
	let innerRadius = areaWidth * 10 / 100; 								// радиусу внутренней окружности многоугольника - высота треугольника
	let outerRadius = innerRadius / n / Math.cos(180 / n);			// радиусу внешней окружности многоугольника
	let hexSide = outerRadius;													// длина стороны многоугольника, длина стороны равностороннего треугольника
	let hexWidth = innerRadius * 2;
	let hexHeight = outerRadius * 2;

	let hexParameters = {
		hexSide: hexSide,
		outerRadius: outerRadius,
		innerRadius: innerRadius,
		width: hexWidth,
		height: hexHeight,
		areaWidth: areaWidth,
		areaHeight: areaHeight
	};

	// добавляем тег SVG
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', areaWidth);
	svg.setAttribute('height', areaHeight);
	svg.style.position = 'absolute';
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

	let levelContent = null;

	// создаем пазл выбранного уровня
	switch (levelNumber) {
		case 1:
			levelContent = levelOne(svg, hexParameters);
			break;
		case 2:
			levelContent = levelTwo(svg, hexParameters);
			break;
		case 3:
			levelContent = levelThree(svg, hexParameters)
			break;
	}

	return levelContent;
}
