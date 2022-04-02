"use strict";

function HEX() {

	let self = this;

	self.hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

	self.draw = function (hexParameters) {
		self.hex.setAttribute('points', `${hexParameters.innerRadius},0 ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2} ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2 + hexParameters.hexSide} ${hexParameters.innerRadius},${hexParameters.outerRadius * 2} 0,${hexParameters.hexSide / 2 + hexParameters.hexSide} 0,${hexParameters.hexSide / 2}`);
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

// class HEX {

// 	constructor() {
// 		this.hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
// 	}


// 	draw(hexParameters) {
// 		this.hex.setAttribute('points', `${hexParameters.innerRadius},0 ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2} ${hexParameters.innerRadius * 2},${hexParameters.hexSide / 2 + hexParameters.hexSide} ${hexParameters.innerRadius},${hexParameters.outerRadius * 2} 0,${hexParameters.hexSide / 2 + hexParameters.hexSide} 0,${hexParameters.hexSide / 2}`);
// 		return this;
// 	};

// 	color(stroke, fill, opacity) {
// 		this.hex.setAttribute('stroke', stroke);
// 		this.hex.setAttribute('fill', fill);
// 		this.hex.setAttribute('fill-opacity', opacity);
// 		return this;
// 	}

// 	setPosition(hexParameters) {
// 		this.hex.setAttribute('transform', `translate(${hexParameters.posX} ${hexParameters.posY})`);
// 		return this;
// 	}

// 	move(updHexParameters) {
// 		updHexParameters.posX += updHexParameters.speedX;
// 		// вылетел ли объект правее стены
// 		if (updHexParameters.posX + updHexParameters.width > updHexParameters.fieldWidth) {
// 			updHexParameters.speedX = -updHexParameters.speedX;
// 			updHexParameters.posX = updHexParameters.fieldWidth - updHexParameters.width;
// 		}
// 		// вылетел ли объект левее стены
// 		if (updHexParameters.posX < 0) {
// 			updHexParameters.speedX = -updHexParameters.speedX;
// 			updHexParameters.posX = 0;
// 		}

// 		updHexParameters.posY += updHexParameters.speedY;
// 		// вылетел ли объект ниже пола
// 		if (updHexParameters.posY + updHexParameters.height > updHexParameters.fieldHeight) {
// 			updHexParameters.speedY = -updHexParameters.speedY;
// 			updHexParameters.posY = updHexParameters.fieldHeight - updHexParameters.height;
// 		}
// 		// вылетел ли объект выше потолка
// 		if (updHexParameters.posY < 0) {
// 			updHexParameters.speedY = -updHexParameters.speedY;
// 			updHexParameters.posY = 0;
// 		}
// 		// console.log(hexObject);
// 		this.setPosition(updHexParameters);
// 		requestAnimationFrame(function () { this.move(updHexParameters) });
// 		return this;
// 	}
// }

function addFieldHex(hexParameters) {
	let newHex = new HEX();
	let hex = newHex.draw(hexParameters).color('rgba(82, 125, 182)', 'white', 0.5).setPosition(hexParameters).hex;
	return hex;
}