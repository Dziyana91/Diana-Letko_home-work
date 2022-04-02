"use strict";

function addHexBackground() {
	let bg = document.getElementById('wrapper');												// фон

	let bgWidth = bg.offsetWidth;
	let bgHeight = bg.offsetHeight;

	const n = 6;																						// !не менять - количество сторон многоугольника
	let hexSide = bgWidth * 3 / 100;																// длина стороны многоугольника, длина стороны равностороннего треугольника
	// let hexSideWidth = hexSide * 20 / 100;														// толщина стенки многоугольника
	let outerRadius = hexSide;																		// радиусу внешней окружности многоугольника
	let innerRadius = outerRadius * n * Math.cos(180 / n);								// радиусу внутренней окружности многоугольника - высота треугольника
	let hexWidth = innerRadius * 2;
	let hexHeight = outerRadius * 2;

	// добавляем тег SVG
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', bgWidth);
	svg.setAttribute('height', bgHeight);
	svg.style.position = 'absolute';
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	// количество шестиугольников разного размера
	let normalHexCount = 10;
	let bigHexCount = 7;
	let smallHexCount = 15;

	let bigScaleCoef = 1.5;
	let smallScaleCoef = 0.5;

	let currentHexParameters = null;
	let newHex = null;
	let normalHex = null;
	let bigHex = null;
	let smallHex = null;

	// добавляем шестиугольники на фон
	for (let i = 0; i < normalHexCount; i++) {

		currentHexParameters = {
			hexSide: hexSide,
			outerRadius: outerRadius,
			innerRadius: innerRadius,
			width: hexWidth,
			height: hexHeight,
			fieldWidth: bgWidth,
			fieldHeight: bgHeight,
			posX: (function () { return mathRandomDiap(0, bgWidth - hexWidth) }()),
			posY: (function () { return mathRandomDiap(0, bgHeight - hexHeight) }()),
			speedX: setSpeed(-2, 2),
			speedY: setSpeed(-1, 1)
		}

		newHex = new HEX();
		normalHex = newHex.draw(currentHexParameters).color('none', 'white', 0.5).setPosition(currentHexParameters).hex;
		newHex.move(currentHexParameters);
		svg.appendChild(normalHex);
	}

	for (let i = 0; i < bigHexCount; i++) {

		currentHexParameters = {
			hexSide: hexSide * bigScaleCoef,
			outerRadius: outerRadius * bigScaleCoef,
			innerRadius: innerRadius * bigScaleCoef,
			width: hexWidth * bigScaleCoef,
			height: hexHeight * bigScaleCoef,
			fieldWidth: bgWidth,
			fieldHeight: bgHeight,
			posX: (function () { return mathRandomDiap(0, bgWidth - hexWidth * bigScaleCoef) }()),
			posY: (function () { return mathRandomDiap(0, bgHeight - hexHeight * bigScaleCoef) }()),
			speedX: setSpeed(-2, 2),
			speedY: setSpeed(-1, 1)
		}

		newHex = new HEX();
		bigHex = newHex.draw(currentHexParameters).color('none', 'white', 0.5).setPosition(currentHexParameters).hex;
		newHex.move(currentHexParameters);
		svg.appendChild(bigHex)
	}

	for (let i = 0; i < smallHexCount; i++) {

		currentHexParameters = {
			hexSide: hexSide * smallScaleCoef,
			outerRadius: outerRadius * smallScaleCoef,
			innerRadius: innerRadius * smallScaleCoef,
			width: hexWidth * smallScaleCoef,
			height: hexHeight * smallScaleCoef,
			fieldWidth: bgWidth,
			fieldHeight: bgHeight,
			posX: (function () { return mathRandomDiap(0, bgWidth - hexWidth * smallScaleCoef) }()),
			posY: (function () { return mathRandomDiap(0, bgHeight - hexHeight * smallScaleCoef) }()),
			speedX: setSpeed(-2, 2),
			speedY: setSpeed(-1, 1)
		}

		newHex = new HEX();
		smallHex = newHex.draw(currentHexParameters).color('none', 'white', 0.5).setPosition(currentHexParameters).hex;
		newHex.move(currentHexParameters);
		svg.appendChild(smallHex);
	}
	bg.appendChild(svg);
}

