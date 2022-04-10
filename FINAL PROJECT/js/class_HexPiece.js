"use strict";

class HexPiece {

	constructor() {
		this.hex = null;

		this.rhombs = {
			rhomb1: document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
			rhomb2: document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
			rhomb3: document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
		}

		this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

		this.arrowPic = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	}

	combine() {
		this.hex = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.hex.appendChild(this.rhombs.rhomb1);
		this.hex.appendChild(this.rhombs.rhomb2);
		this.hex.appendChild(this.rhombs.rhomb3);
		return this;
	}

	draw(hexParameters) {
		this.rhombs.rhomb1.setAttribute('points', `${hexParameters.innerRadius},0 ${hexParameters.innerRadius},${hexParameters.outerRadius} 0,${hexParameters.hexSide / 2 + hexParameters.hexSide} 0,${hexParameters.hexSide / 2}`);
		this.rhombs.rhomb2.setAttribute('points', `${hexParameters.innerRadius},0 ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2} ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2 + hexParameters.hexSide} ${hexParameters.innerRadius},${hexParameters.outerRadius}`);
		this.rhombs.rhomb3.setAttribute('points', `${hexParameters.innerRadius},${hexParameters.outerRadius} ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2 + hexParameters.hexSide} ${hexParameters.innerRadius},${hexParameters.outerRadius * 2} 0,${hexParameters.hexSide / 2 + hexParameters.hexSide}`);
		return this;
	};

	color(hexParameters) {
		this.rhombs.rhomb1.setAttribute('stroke', hexParameters.colors[0]);
		this.rhombs.rhomb1.setAttribute('fill', hexParameters.colors[0]);
		this.rhombs.rhomb2.setAttribute('stroke', hexParameters.colors[1]);
		this.rhombs.rhomb2.setAttribute('fill', hexParameters.colors[1]);
		this.rhombs.rhomb3.setAttribute('stroke', hexParameters.colors[2]);
		this.rhombs.rhomb3.setAttribute('fill', hexParameters.colors[2]);
		return this;
	};

	addOutline(hexParameters) {
		this.outline.setAttribute('points', `${hexParameters.innerRadius},0 ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2} ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2 + hexParameters.hexSide} ${hexParameters.innerRadius},${hexParameters.outerRadius * 2} 0,${hexParameters.hexSide / 2 + hexParameters.hexSide} 0,${hexParameters.hexSide / 2}`);
		this.outline.setAttribute('stroke', 'white');
		this.outline.setAttribute('fill', 'none');
		this.outline.setAttribute('stroke-width', 2);
		this.hex.appendChild(this.outline);
		return this;
	}

	addImage(hexParameters) {
		this.arrowPic.setAttribute('width', `${hexParameters.innerRadius / 1.5}`);
		this.arrowPic.setAttribute('height', `${hexParameters.innerRadius / 1.5}`);
		this.arrowPic.setAttribute('x', `${hexParameters.innerRadius / 1.5}`);
		this.arrowPic.setAttribute('y', `${hexParameters.outerRadius - hexParameters.innerRadius + hexParameters.innerRadius / 1.5}`);
		this.arrowPic.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', 'media/arrow_rotate.png');
		this.hex.appendChild(this.arrowPic);
		return this;
	}

	setPosition(hexParameters) {
		this.hex.setAttribute('transform', `translate(${hexParameters.posX} ${hexParameters.posY})`);
		return this;
	};

}

function addStaticPuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).hex;

	return hex;
}

//* глобальная переменная - статус позиции каждой поворачиваемой детали
// ключ - имя детали
// значение: 1 - деталь стоит правильно, 0 - деталь стоит неправильно
let hexesStatusH = {};

function addRotatablePuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).addOutline(hexParameters).addImage(hexParameters).hex;

	let colorsA = hexParameters.colors;

	let hexIdS = hexParameters.hexId;				// строка с именем детали
	let winColorsA = hexParameters.winColors;		// правильные цвета детали

	function rotateHex() {
		// третий цвет переставляем на первое место, выглядит как поворот шестиугольника по часовой стрелке
		let colorToUpdate = colorsA[2];
		colorsA.pop();
		colorsA.unshift(colorToUpdate);
		hexParameters.colors = colorsA;
		newHex.color(hexParameters);
		updateHexesStatus();
		winCheck();
	}

	function updateHexesStatus() {
		console.log('hex id: ' + hexIdS);
		console.log('hex color: ' + colorsA);
		console.log('hex win color: ' + winColorsA)
		if (colorsA[0] === winColorsA[0] && colorsA[1] === winColorsA[1] && colorsA[2] === winColorsA[2]) {
			hexesStatusH[hexIdS] = 1;
		} else {
			hexesStatusH[hexIdS] = 0;
		}
	}

	function playHexSound() {
		// let sound = document.getElementById('hexRotateSound');
		let musicAndSoundsStatusH = JSON.parse(window.localStorage.getItem('musicAndSounds'));
		if (musicAndSoundsStatusH.sound) {
			hexRotateSound.play();
		}
	}

	hex.addEventListener('click', () => {
		gameStarted = true;
		playHexSound();
		// updateHexesStatus();
		rotateHex();
		// winCheck();
	}, false);
	hex.addEventListener('touchend', () => {
		gameStarted = true;
		playHexSound();
		// updateHexesStatus();
		rotateHex();
		// winCheck();
	}, false);
	hex.addEventListener('mouseover', () => hex.setAttribute('style', 'cursor: pointer'), false);
	updateHexesStatus(hexParameters);
	return hex;
}

//! не используется, упростила и использовала только вращаемые детали
function addMovablePuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).addOutline(hexParameters).hex;

	let posX = hexParameters.posX;
	let posY = hexParameters.posY;
	let shiftX = 0;
	let shiftY = 0;
	let index = 0;

	function grabHex(eo) {
		eo = eo || window.event;
		eo.preventDefault();
		let self = this;
	}

	hex.addEventListener('dragstart', grabHex, false);
	hex.addEventListener('touchend', grabHex, false);

	//* добавить обработчик событий on hover drag
	return hex;
}

function winCheck() {
	let multipl = 1;
	for (let key in hexesStatusH) {
		console.log(key + ': ' + hexesStatusH[key]);
		multipl *= hexesStatusH[key];
	}

	if (multipl > 0) {
		hexesStatusH = {};
		setTimeout(() => { alert('Уровень пройден!'); }, 60);
	}
}