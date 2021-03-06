"use strict";

function levelOne(svgTag, hexParameters) {

	let currentPosX = null;
	let currentPosY = null;

	// максимум 3 цвета
	let colorsV1 = [
		'rgb(207,63,112)',	// red
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)'		// red
	];
	let colorsV2 = [
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)',	// red
		'rgb(84,63,207)'		// purple
	];

	// добавляем кусочки пазла, номера указывают на положение на поле
	// статические - без ободка - их нужно добавлять первыми

	// кусочек 1 статический
	currentPosX = hexParameters.innerRadius;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = colorsV1;
	hexParameters.hexId = 'hex00';
	let hex00 = addStaticPuzzleHex(hexParameters);

	// кусочек 2 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(84,63,207)',		// purple
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex01';
	hexParameters.winColors = colorsV2;
	let hex01 = addRotatablePuzzleHex(hexParameters);

	// кусочек 3 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = colorsV1;
	hexParameters.hexId = 'hex02';
	hexParameters.winColors = colorsV1;
	let hex02 = addRotatablePuzzleHex(hexParameters);

	// кусочек 4 вращаемый
	currentPosX = hexParameters.innerRadius * 2;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)',	// red
		'rgb(84,63,207)'		// purple
	];
	hexParameters.hexId = 'hex10';
	hexParameters.winColors = colorsV1;
	let hex10 = addRotatablePuzzleHex(hexParameters);

	// кусочек 5 статический
	currentPosX = hexParameters.innerRadius * 4;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = colorsV2;
	hexParameters.hexId = 'hex11';
	let hex11 = addStaticPuzzleHex(hexParameters);

	// кусочек 6 вращаемый
	currentPosX = hexParameters.innerRadius * 6;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex12';
	hexParameters.winColors = colorsV1;
	let hex12 = addRotatablePuzzleHex(hexParameters);

	// кусочек 7 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(84,63,207)',		// purple
		'rgb(207,63,112)',	// red
		'rgb(207,63,112)'		// red
	];
	hexParameters.hexId = 'hex20';
	hexParameters.winColors = colorsV1;
	let hex20 = addRotatablePuzzleHex(hexParameters);

	// кусочек 8 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(207,63,112)',	// red
		'rgb(84,63,207)',		// purple
		'rgb(84,63,207)'		// purple
	];
	hexParameters.hexId = 'hex21';
	hexParameters.winColors = colorsV2;
	let hex21 = addRotatablePuzzleHex(hexParameters);

	// кусочек 9 статический
	currentPosX = hexParameters.innerRadius * 7;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = colorsV1;
	hexParameters.hexId = 'hex22';
	let hex22 = addStaticPuzzleHex(hexParameters);

	svgTag.appendChild(hex00); // статический
	svgTag.appendChild(hex11); // статический
	svgTag.appendChild(hex22); // статический
	svgTag.appendChild(hex01); // вращаемый
	svgTag.appendChild(hex02); // вращаемый
	svgTag.appendChild(hex10); // вращаемый
	svgTag.appendChild(hex12);	// вращаемый
	svgTag.appendChild(hex20); // вращаемый
	svgTag.appendChild(hex21); // вращаемый

	return svgTag;
}