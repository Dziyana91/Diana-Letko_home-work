"use strict";

function HEX() {

	let self = this;

	self.hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

	self.draw = function (hexSide, outerRadius, innerRadius) {
		self.hex.setAttribute('points', `${innerRadius},0 ${innerRadius * 2},${hexSide / 2} ${innerRadius * 2},${hexSide / 2 + hexSide} ${innerRadius},${outerRadius * 2} 0,${hexSide / 2 + hexSide} 0,${hexSide / 2}`);
		return self;
	};

	self.color = function (stroke, fill, opacity) {
		self.hex.setAttribute('stroke', stroke);
		self.hex.setAttribute('fill', fill);
		self.hex.setAttribute('fill-opacity', opacity);
		return self;
	}

	self.setPosition = function (hexParameters) {
		self.hex.setAttribute('transform', `translate(${hexParameters.posX} ${hexParameters.posY})`);
		return self;
	}

	self.move = function (updHexParameters) {
		updHexParameters.posX += updHexParameters.speedX;
		// вылетел ли объект правее стены
		if (updHexParameters.posX + updHexParameters.width > updHexParameters.fieldWidth) {
			updHexParameters.speedX = -updHexParameters.speedX;
			updHexParameters.posX = updHexParameters.fieldWidth - updHexParameters.width;
		}
		// вылетел ли объект левее стены
		if (updHexParameters.posX < 0) {
			updHexParameters.speedX = -updHexParameters.speedX;
			updHexParameters.posX = 0;
		}

		updHexParameters.posY += updHexParameters.speedY;
		// вылетел ли объект ниже пола
		if (updHexParameters.posY + updHexParameters.height > updHexParameters.fieldHeight) {
			updHexParameters.speedY = -updHexParameters.speedY;
			updHexParameters.posY = updHexParameters.fieldHeight - updHexParameters.height;
		}
		// вылетел ли объект выше потолка
		if (updHexParameters.posY < 0) {
			updHexParameters.speedY = -updHexParameters.speedY;
			updHexParameters.posY = 0;
		}
		// console.log(hexObject);
		self.setPosition(updHexParameters);
		requestAnimationFrame(function () { self.move(updHexParameters) });
		return self;
	}

}

function HexPiece() {

	let self = this;

	self.hex = null;

	self.rhombs = {
		rhomb1: document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
		rhomb2: document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
		rhomb3: document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
	}

	self.combine = function () {
		self.hex = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		self.hex.appendChild(self.rhombs.rhomb1);
		self.hex.appendChild(self.rhombs.rhomb2);
		self.hex.appendChild(self.rhombs.rhomb3);
		return self;
	}

	self.draw = function (hexSide, outerRadius, innerRadius) {
		self.rhombs.rhomb1.setAttribute('points', `${innerRadius},0 ${innerRadius},${outerRadius} 0,${hexSide / 2 + hexSide} 0,${hexSide / 2}`);
		self.rhombs.rhomb2.setAttribute('points', `${innerRadius},0 ${innerRadius * 2},${hexSide / 2} ${innerRadius * 2},${hexSide / 2 + hexSide} ${innerRadius},${outerRadius}`);
		self.rhombs.rhomb3.setAttribute('points', `${innerRadius},${outerRadius} ${innerRadius * 2},${hexSide / 2 + hexSide} ${innerRadius},${outerRadius * 2} 0,${hexSide / 2 + hexSide}`);
		return self;
	};

	self.color = function (stroke1, fill1, stroke2, fill2, stroke3, fill3) {
		self.rhombs.rhomb1.setAttribute('stroke', stroke1);
		self.rhombs.rhomb1.setAttribute('fill', fill1);
		self.rhombs.rhomb2.setAttribute('stroke', stroke2);
		self.rhombs.rhomb2.setAttribute('fill', fill2);
		self.rhombs.rhomb3.setAttribute('stroke', stroke3);
		self.rhombs.rhomb3.setAttribute('fill', fill3);
		return self;
	}

	self.setPosition = function (hexParameters) {
		self.hex.setAttribute('transform', `translate(${hexParameters.posX} ${hexParameters.posY})`);
		return self;
	}

}

function setSpeed(n, m) {
	let speed = 0;
	speed = mathRandomDiap(n, m);
	if (speed == 0) {
		speed = setSpeed(n, m);
	}
	return speed;
}

function mathRandomDiap(n, m) {
	return Math.floor(
		Math.random() * (m - n + 1)
	) + n;
}

function aboutPage() {
	let aboutDisplayField = document.createElement('div');
	aboutDisplayField.id = 'aboutDisplayField';

	let header = 'Игра Hex Puzzle';
	let aboutText = 'Собери пазл из шестиугольников. Расположенные на поле шестиугольники можно вращать, но нельзя двигать. Шестиугольники вне поля можно переместить на поле, но нельзя повернуть.';

	let headerTag = document.createElement('h3');
	headerTag.appendChild(document.createTextNode(header));
	let aboutTextTag = document.createElement('p');
	aboutTextTag.appendChild(document.createTextNode(aboutText));

	aboutDisplayField.appendChild(headerTag);
	aboutDisplayField.appendChild(aboutTextTag);
	console.log(`${aboutDisplayField}`);
	return aboutDisplayField;
}