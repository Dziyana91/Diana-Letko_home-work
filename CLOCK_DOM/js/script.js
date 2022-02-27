"use strict";

let form = document.forms.clock;
let button = document.getElementById('button');
button.addEventListener('click', validateDiameter, false);

function validateDiameter(eo) {
	eo = eo || window.event;

	let input = document.getElementById('diameter');
	let inputValue = input.value;
	let errorMessage = document.getElementById('error');

	if (inputValue < 200 || inputValue > 800) {
		errorMessage.innerHTML = 'размер часов должен быть в диапазоне 200 - 800';
	} else {
		errorMessage.innerHTML = '';
	}
}