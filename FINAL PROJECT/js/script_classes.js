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