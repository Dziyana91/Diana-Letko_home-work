"use strict";

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

	// максимум 3 цвета
	let colors = [
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)',	// red
		'rgb(63, 187, 207)'	// blue
	];

	// добавляем кусочки пазла, номера указывают на положение на поле

	// статические - без ободка - их нужно добавлять первыми
	// кусочек 1 статический
	currentPosX = hexParameters.innerRadius;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex00 = addStaticPuzzleHex(hexParameters);

	// кусочек 5 статический
	currentPosX = hexParameters.innerRadius * 4;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[0];
	hexParameters.color2 = colors[1];
	hexParameters.color3 = colors[0];
	let hex11 = addStaticPuzzleHex(hexParameters);

	// кусочек 9 статический
	currentPosX = hexParameters.innerRadius * 7;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex22 = addStaticPuzzleHex(hexParameters);

	// вращаемые
	// кусочек 2 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[0];
	hexParameters.color2 = colors[1];
	hexParameters.color3 = colors[0];
	let hex01 = addRotatablePuzzleHex(hexParameters);

	// кусочек 3 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex02 = addRotatablePuzzleHex(hexParameters);

	// кусочек 7 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex20 = addRotatablePuzzleHex(hexParameters);

	// кусочек 8 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[0];
	hexParameters.color2 = colors[1];
	hexParameters.color3 = colors[0];
	let hex21 = addRotatablePuzzleHex(hexParameters);

	// передвигаемые
	// кусочек 4 передвигаемый
	currentPosX = hexParameters.innerRadius;
	currentPosY = hexParameters.areaHeight - hexParameters.height - hexParameters.areaHeight * 2.5 / 100;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex10 = addMovablePuzzleHex(hexParameters);

	// кусочек 6 передвигаемый
	currentPosX = hexParameters.innerRadius * 4;
	currentPosY = hexParameters.areaHeight - hexParameters.height - hexParameters.areaHeight * 2.5 / 100;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.color1 = colors[1];
	hexParameters.color2 = colors[0];
	hexParameters.color3 = colors[1];
	let hex12 = addMovablePuzzleHex(hexParameters);

	svgTag.appendChild(hex00); // статический
	svgTag.appendChild(hex11); // статический
	svgTag.appendChild(hex22); // статический
	svgTag.appendChild(hex01); // вращаемый
	svgTag.appendChild(hex02); // вращаемый
	svgTag.appendChild(hex20); // вращаемый
	svgTag.appendChild(hex21); // вращаемый
	svgTag.appendChild(hex10); // передвигаемый
	svgTag.appendChild(hex12);	// передвигаемый
	return svgTag;
}
