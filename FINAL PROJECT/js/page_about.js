"use strict";

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