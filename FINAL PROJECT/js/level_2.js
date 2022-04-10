"use strict";

function levelTwo(svgTag, hexParameters) {

	let currentPosX = null;
	let currentPosY = null;

	// добавляем кусочки пазла, номера указывают на положение на поле
	// статические - без ободка - их нужно добавлять первыми

	// кусочек 1 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(255,245,95)',	// yellow
		'rgb(158,158,152)',	// grey
		'rgb(255,245,95)'		// yellow
	];
	hexParameters.hexId = 'hex00';
	hexParameters.winColors = [
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)',	// yellow
		'rgb(158,158,152)'	// grey
	];
	let hex00 = addRotatablePuzzleHex(hexParameters);

	// кусочек 2 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(255,245,95)',	// yellow
		'rgb(63, 187, 207)',	// blue
		'rgb(255,245,95)'		// yellow
	];
	hexParameters.hexId = 'hex01';
	hexParameters.winColors = [
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)',	// yellow
		'rgb(63, 187, 207)'	// blue
	];
	let hex01 = addRotatablePuzzleHex(hexParameters);

	// кусочек 3 вращаемый
	currentPosX = hexParameters.innerRadius * 2;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 1.5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(158,158,152)',	// grey
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)'		// yellow
	];
	hexParameters.hexId = 'hex10';
	hexParameters.winColors = [
		'rgb(255,245,95)',	// yellow
		'rgb(158,158,152)',	// grey
		'rgb(255,245,95)'		// yellow
	];
	let hex10 = addRotatablePuzzleHex(hexParameters);

	// кусочек 4 вращаемый
	currentPosX = hexParameters.innerRadius * 4;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(118,214,107)',	// green
		'rgb(158,158,152)'	// grey
	];
	hexParameters.hexId = 'hex11';
	hexParameters.winColors = [
		'rgb(158,158,152)',	// grey
		'rgb(63, 187, 207)',	// blue
		'rgb(118,214,107)'	// green
	];
	let hex11 = addRotatablePuzzleHex(hexParameters);

	// кусочек 5 вращаемый
	currentPosX = hexParameters.innerRadius * 6;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)'		// yellow
	];
	hexParameters.hexId = 'hex12';
	hexParameters.winColors = [
		'rgb(63, 187, 207)',	// blue
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)'		// yellow
	];
	let hex12 = addRotatablePuzzleHex(hexParameters);

	// кусочек 6 вращаемый
	currentPosX = hexParameters.innerRadius * 3;
	currentPosY = hexParameters.innerRadius + hexParameters.outerRadius * 3;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)',	// yellow
		'rgb(118,214,107)'	// green
	];
	hexParameters.hexId = 'hex20';
	hexParameters.winColors = [
		'rgb(255,245,95)',	// yellow
		'rgb(118,214,107)',	// green
		'rgb(255,245,95)'		// yellow
	];
	let hex20 = addRotatablePuzzleHex(hexParameters);

	// кусочек 7 вращаемый
	currentPosX = hexParameters.innerRadius * 5;
	hexParameters.posX = currentPosX;
	hexParameters.posY = currentPosY;
	hexParameters.colors = [
		'rgb(118,214,107)',	// green
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)'		// yellow
	];
	hexParameters.hexId = 'hex21';
	hexParameters.winColors = [
		'rgb(118,214,107)',	// green
		'rgb(255,245,95)',	// yellow
		'rgb(255,245,95)'		// yellow
	];
	let hex21 = addRotatablePuzzleHex(hexParameters);

	svgTag.appendChild(hex00); // вращаемый
	svgTag.appendChild(hex01); // вращаемый
	svgTag.appendChild(hex10); // вращаемый
	svgTag.appendChild(hex11); // вращаемый
	svgTag.appendChild(hex12); // вращаемый
	svgTag.appendChild(hex20); // вращаемый
	svgTag.appendChild(hex21);	// вращаемый

	return svgTag;
}


