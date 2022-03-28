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

		levelBtn.addEventListener('click', function () { openLevel(levelNumber) }, false);
		levelBtn.addEventListener('touchend', function () { openLevel(levelNumber) }, false);
		levelsList.appendChild(levelBtn);
	}
	levelsField.appendChild(levelsList);
	return levelsField;
}

function openLevel(levelNumber) {

	let displayArea = document.getElementById('play-field');
	let currentContent = displayArea.childNodes;
	for (let i = 0; i < currentContent.length; i++) {
		displayArea.removeChild(currentContent[i]);
	}

	let playArea = document.createElement('div');
	playArea.id = 'playArea';

	let puzzleField = document.createElement('div');
	puzzleField.id = 'puzzleField';

	let peacesField = document.createElement('div');
	peacesField.id = 'peacesField';

	let levelPuzzle = createLevel(levelNumber);

	playArea.appendChild(puzzleField);

	playArea.appendChild(levelPuzzle);
	playArea.appendChild(peacesField);
	displayArea.appendChild(playArea);
}

function createLevel(levelNumber) {
	// ищем игровое поле и рассчитываем размеры для SVG
	let playArea = document.getElementById('play-field');
	// размер SVG для пазла 80% от ширины всего поля
	let areaWidth = playArea.offsetWidth * 80 / 100;
	let areaHeight = playArea.offsetHeight * 90 / 100;

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
		areaHeight: areaHeight,
		posX: 0,
		posY: 0
	};

	// добавляем тег SVG
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', areaWidth);
	svg.setAttribute('height', areaHeight);
	svg.style.position = 'absolute';
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

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

function levelOne(svgTag, hexParameters) {

	// рисуем поле пазла
	let fieldHex = null;
	// поле пазла
	// количество шестиугольников
	let hexField = [
		'hex00',
		'hex01',
		'hex02',
		'hex10',
		'hex11',
		'hex12',
		'hex20',
		'hex21',
		'hex22'
	];

	let currentPosX = hexParameters.innerRadius;
	let currentPosY = hexParameters.innerRadius;

	for (let i = 0; i < hexField.length; i++) {

		hexParameters.posX = currentPosX;
		hexParameters.posY = currentPosY;

		if (i == 2) {
			currentPosX = hexParameters.innerRadius * 2;
			currentPosY += hexParameters.outerRadius * 1.5;
		} else if (i == 5) {
			currentPosX = hexParameters.innerRadius * 3;
			currentPosY += hexParameters.outerRadius * 1.5;
		} else {
			currentPosX += hexParameters.innerRadius * 2;
		}

		fieldHex = addFieldHex(hexParameters);

		fieldHex.setAttribute('class', hexField[i]);

		//* добавить обработчики событий
		svgTag.appendChild(fieldHex);
	}

	// рисуем кусочки пазла
	let puzzleHex = null;

	let hexVer1 = [
		'hex00',
		'hex02',
		'hex10',
		'hex12',
		'hex20',
		'hex22'
	];

	let hexVer2 = [
		'hex01',
		'hex11',
		'hex21'
	];

	// максимум 3 цвета
	let colors = [
		'rgb(84,63,207)',
		'rgb(207,63,112)',
		'rgb(63,187,207)'
	];

	hexParameters.posX = hexParameters.innerRadius;
	hexParameters.posY = hexParameters.areaHeight - hexParameters.height - hexParameters.areaHeight * 2.5 / 100;

	for (let i = 0; i < hexVer1.length; i++) {

		puzzleHex = addPuzzleHex(hexParameters, colors);
		puzzleHex.setAttribute('class', hexVer1[i]);

		hexParameters.posX += hexParameters.innerRadius * 3;

		//* добавить обработчики событий
		svgTag.appendChild(puzzleHex);
	}

	return svgTag;
}

function addFieldHex(hexParameters) {
	let newHex = null;
	let hex = null;

	newHex = new HEX();
	hex = newHex.draw(hexParameters.hexSide, hexParameters.outerRadius, hexParameters.innerRadius).color('rgba(82, 125, 182)', 'white', 0.5).setPosition(hexParameters).hex;
	return hex;
}

function addPuzzleHex(hexParameters, colors) {
	let newHex = null;
	let hex = null;
	newHex = new HexPiece();
	hex = newHex.draw(hexParameters.hexSide, hexParameters.outerRadius, hexParameters.innerRadius).color(colors[0], colors[0], colors[1], colors[1], colors[0], colors[0]).combine().setPosition(hexParameters).hex;
	return hex;
}