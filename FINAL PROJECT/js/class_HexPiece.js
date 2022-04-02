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
		this.rhombs.rhomb1.setAttribute('stroke', hexParameters.color1);
		this.rhombs.rhomb1.setAttribute('fill', hexParameters.color1);
		this.rhombs.rhomb2.setAttribute('stroke', hexParameters.color2);
		this.rhombs.rhomb2.setAttribute('fill', hexParameters.color2);
		this.rhombs.rhomb3.setAttribute('stroke', hexParameters.color3);
		this.rhombs.rhomb3.setAttribute('fill', hexParameters.color3);
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
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).addOutline(hexParameters).hex;

	let angle = 0;
	let posX = hexParameters.posX;
	let posY = hexParameters.posY;
	let centerX = hexParameters.innerRadius;
	let centerY = hexParameters.outerRadius;

	hex.addEventListener('click', rotateHex, false);
	hex.addEventListener('touchend', rotateHex, false);

	//* добавить обработчик событий on hover

	function rotateHex(eo) {
		eo = eo || window.event;
		let self = this;
		angle += 360 / 3;					// угол поворота пазла
		self.setAttribute('transform', `translate(${posX} ${posY}) rotate(${angle} ${centerX} ${centerY})`);
	}

	return hex;
}

function addMovablePuzzleHex(hexParameters) {

	let newHex = new HexPiece();
	let hex = newHex.draw(hexParameters).color(hexParameters).combine().setPosition(hexParameters).addOutline(hexParameters).hex;

	//* добавить обработчик событий on hover drag
	return hex;
}
