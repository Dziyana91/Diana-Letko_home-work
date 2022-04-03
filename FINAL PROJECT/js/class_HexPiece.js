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
		// this.hex.setAttribute('style', 'position: relative');
		this.arrowPic.setAttribute('width', `${hexParameters.innerRadius}`);
		this.arrowPic.setAttribute('height', `${hexParameters.innerRadius}`);
		this.arrowPic.setAttribute('x', `${hexParameters.innerRadius / 2}`);
		this.arrowPic.setAttribute('y', `${hexParameters.outerRadius - hexParameters.innerRadius + hexParameters.innerRadius / 2}`);
		// this.arrowPic.setAttribute('style', 'position: absolute');
		this.arrowPic.setAttribute('style', 'z-index: 1');
		this.arrowPic.setAttribute('xlink:href', `../images/arrow_rotate.png`);
		this.hex.appendChild(this.arrowPic);
		return this;
	}

	setPosition(hexParameters) {
		this.hex.setAttribute('transform', `translate(${hexParameters.posX} ${hexParameters.posY})`);
		return this;
	};

}

// class StaticHex extends HexPiece {
// 	constructor() {
// 		super();
// 	}
// }

function addStaticPuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).hex;

	return hex;
}

function addRotatablePuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).addOutline(hexParameters).addImage(hexParameters).hex;


	let colorsA = hexParameters.colors;

	function rotateHex(eo) {
		eo = eo || window.event;
		eo.preventDefault();
		// третий цвет переставляем на первое место, выглядит как поворот шестиугольника по часовой стрелке
		let colorToUpdate = colorsA[2];
		colorsA.pop();
		colorsA.unshift(colorToUpdate);
		hexParameters.colors = colorsA;
		newHex.color(hexParameters);
	}

	hex.addEventListener('click', rotateHex, false);
	hex.addEventListener('touchend', rotateHex, false);
	hex.addEventListener('mouseover', () => hex.setAttribute('style', 'cursor: pointer'), false);
	return hex;
}

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
