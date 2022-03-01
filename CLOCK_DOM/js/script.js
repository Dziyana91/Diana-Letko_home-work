"use strict";

let form = document.forms.clock;
let button = document.getElementById('button');
button.addEventListener('click', validateDiameter, false);
button.addEventListener('click', clock, false);

function validateDiameter(eo) {
	eo = eo || window.event;

	let input = document.getElementById('diameter');
	let inputValue = input.value;
	let errorMessage = document.getElementById('error');
	let valid = false;

	if (inputValue < 200 || inputValue > 800) {
		errorMessage.innerHTML = 'размер часов должен быть в диапазоне 200 - 800';
	} else {
		errorMessage.innerHTML = '';
		valid = true;
	}
	return valid;
}

function clock(eo) {
	eo = eo || window.event;

	let container = document.getElementById('wrapper');

	let clockDiameter = document.getElementById('diameter').value;
	let clockCircleLength = Math.PI * clockDiameter;
	const maxHours = 12;																// количество часов на циферблате
	const clearSpacePercent = 40;													// процент свободного места между цифрами от размера циферблата
	let numberCircleDiameter = Math.ceil((clockCircleLength - clockCircleLength / 100 * clearSpacePercent) / maxHours);

	let clockFace = document.createElement('div');
	clockFace.style.width = clockDiameter + 'px';
	clockFace.style.height = clockDiameter + 'px';
	clockFace.style.borderRadius = 50 + '%';
	clockFace.style.backgroundColor = 'rgb(82, 125, 182)';
	clockFace.style.position = 'relative';

	let numberCircleStartPosition = clockDiameter / 2 - numberCircleDiameter / 2;

	for (let i = maxHours; i >= 1; i--) {
		let numberCircle = document.createElement('div');
		numberCircle.style.width = numberCircleDiameter + 'px';
		numberCircle.style.height = numberCircleDiameter + 'px';
		numberCircle.style.borderRadius = 50 + '%';
		numberCircle.style.backgroundColor = 'rgb(197, 131, 217)';
		numberCircle.style.display = 'flex';
		numberCircle.style.justifyContent = 'center';
		numberCircle.style.alignItems = 'center';
		numberCircle.style.position = 'absolute';
		numberCircle.style.left = numberCircleStartPosition + 'px';

		let hourNumber = document.createElement('span');
		hourNumber.innerHTML = i;
		hourNumber.style.fontSize = numberCircleDiameter / 2 + 'px';
		numberCircle.appendChild(hourNumber);

		clockFace.appendChild(numberCircle);
	}

	for (let all of container.children) {
		all.style.display = 'none'
	}
	container.appendChild(clockFace);
}