"use strict";

function levelThree(svgTag, hexParameters) {

	let currentPosX = null;
	let currentPosY = null;

	// максимум 3 цвета
	let colorsV1 = [
		'rgb(244,213,125)',	// beige
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)'		// red
	];

	let colorsV2 = [
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)'	// beige
	];

	// добавляем кусочки пазла, номера указывают на положение на поле
	// статические - без ободка - их нужно добавлять первыми

	// кусочек 1 вращаемый
	currentPosX = hexParameters.innerRadius * 4;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)',	// beige
		'rgb(244,213,125)'	// beige
	];
	hexParameters.hexId = 'hex00';
	hexParameters.winColors = colorsV1;
	let hex00 = addRotatablePuzzleHex(hexParameters);

	// кусочек 2 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex10';
	hexParameters.winColors = colorsV2;
	let hex10 = addRotatablePuzzleHex(hexParameters);

	// кусочек 3 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	// currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex11';
	hexParameters.winColors = colorsV2;
	let hex11 = addRotatablePuzzleHex(hexParameters);

	// кусочек 4 вращаемый
	currentPosX = hexParameters.innerRadius * 2;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)'	// beige
	];
	hexParameters.hexId = 'hex20';
	hexParameters.winColors = colorsV1;
	let hex20 = addRotatablePuzzleHex(hexParameters);

	// кусочек 5 вращаемый
	currentPosX = hexParameters.innerRadius * 4;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(244,213,125)',	// beige
		'rgb(244,213,125)'	// beige
	];
	hexParameters.hexId = 'hex21';
	hexParameters.winColors = [
		'rgb(244,213,125)',	// beige
		'rgb(244,213,125)',	// beige
		'rgb(63, 187, 207)'	// blue
	];
	let hex21 = addRotatablePuzzleHex(hexParameters);

	// кусочек 6 вращаемый
	currentPosX = hexParameters.innerRadius * 6;
	// currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)',	// beige
		'rgb(244,213,125)'	// beige
	];
	hexParameters.hexId = 'hex22';
	hexParameters.winColors = colorsV1;
	let hex22 = addRotatablePuzzleHex(hexParameters);

	// кусочек 7 вращаемый
	currentPosX = hexParameters.innerRadius * 1;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 4.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex30';
	hexParameters.winColors = colorsV2;
	let hex30 = addRotatablePuzzleHex(hexParameters);

	// кусочек 8 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)'		// red

	];
	hexParameters.hexId = 'hex31';
	hexParameters.winColors = [
		'rgb(207,63,112)',	// red
		'rgb(63, 187, 207)',	// blue
		'rgb(244,213,125)'	// beige
	];
	let hex31 = addRotatablePuzzleHex(hexParameters);

	// кусочек 9 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(244,213,125)',	// beige
		'rgb(63, 187, 207)',	// blue
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex32';
	hexParameters.winColors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(207,63,112)',	// red
		'rgb(244,213,125)'	// beige
	];
	let hex32 = addRotatablePuzzleHex(hexParameters);

	// кусочек 10 вращаемый
	currentPosX = hexParameters.innerRadius * 7;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(244,213,125)',	// beige
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex33';
	hexParameters.winColors = colorsV2;
	let hex33 = addRotatablePuzzleHex(hexParameters);

	svgTag.appendChild(hex00); // вращаемый
	svgTag.appendChild(hex10); // вращаемый
	svgTag.appendChild(hex11); // вращаемый
	svgTag.appendChild(hex20); // вращаемый
	svgTag.appendChild(hex21);	// вращаемый
	svgTag.appendChild(hex22);	// вращаемый
	svgTag.appendChild(hex30);	// вращаемый
	svgTag.appendChild(hex31);	// вращаемый
	svgTag.appendChild(hex32);	// вращаемый
	svgTag.appendChild(hex33);	// вращаемый

	return svgTag;
}


