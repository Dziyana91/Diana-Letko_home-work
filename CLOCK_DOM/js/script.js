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

	let clockDiameter = document.getElementById('diameter').value;		// диаметр циферблата
	let clockRadius = clockDiameter / 2;										// половина ширины div с циферблатом
	let clockCircleLength = Math.PI * clockDiameter;						// длина окружности циферблата
	const maxHours = 12;																// количество часов на циферблате
	let numberContainerHeight = clockRadius;									// высота контейнера для кружка с цифрой
	let numberContainerWidth = clockCircleLength / maxHours;				// длина контейнера для кружка с цифрой - длина окружности разделенная по ровну на каждую цифру
	let outerGap = clockRadius * 0.05;											// отступ между краем цифеблата и кружком с цифрой - 5% от высоты контейнера для кружка с цифрой
	let numberCircleDiameter = numberContainerWidth * 0.6;				// диаметр кружка с цифрой - 60% от ширины контейнера для кружка с цифрой
	let numberRotationAngle = 360 / maxHours;									// градус смещения контейнера для кружка с цифрой - 360гр разделено поровну на количество контейнеров

	let clockFace = document.createElement('div');							// рисуем циферблат
	clockFace.style.width = clockDiameter + 'px';
	clockFace.style.height = clockDiameter + 'px';
	clockFace.style.borderRadius = 50 + '%';
	clockFace.style.backgroundColor = 'rgb(82, 125, 182)';
	clockFace.style.position = 'relative';

	let numberCircleStartPosition = clockRadius - numberContainerWidth / 2;		// стартовая позиция на 12 часах
	let numberPositionAngle = 0;													// стартовый угол поворота контейнера для кружка с цифрой

	for (let i = 1; i <= maxHours; i++) {
		let numberContainer = document.createElement('div');				// рисуем прямоугольный контейнер для кружка с цифрой
		numberContainer.style.width = numberContainerWidth + 'px';
		numberContainer.style.height = numberContainerHeight + 'px';
		numberContainer.style.paddingTop = outerGap + 'px';
		numberContainer.style.display = 'flex';
		numberContainer.style.justifyContent = 'center';
		numberContainer.style.alignItems = 'flex-start';
		numberContainer.style.position = 'absolute';
		numberContainer.style.left = numberCircleStartPosition + 'px';
		numberContainer.style.transformOrigin = 'bottom center';
		numberPositionAngle += numberRotationAngle;							// с каждой итерацией увеличиваем угол поворота на градус смещения
		numberContainer.style.transform = `rotate(${numberPositionAngle}deg)`;

		let numberCircle = document.createElement('div');					// рисуем кружок для цифры
		numberCircle.style.width = numberCircleDiameter + 'px';
		numberCircle.style.height = numberCircleDiameter + 'px';
		numberCircle.style.borderRadius = 50 + '%';
		numberCircle.style.backgroundColor = 'rgb(197, 131, 217)';
		numberCircle.style.display = 'flex';
		numberCircle.style.justifyContent = 'center';
		numberCircle.style.alignItems = 'center';
		numberCircle.style.position = 'absolute';
		numberCircle.style.transform = `rotate(-${numberPositionAngle}deg)`;		// кружок с цифрой поворачиваем в обратную сторону, чтобы был всегда горизонтально

		let hourNumber = document.createElement('span');					// рисуем цифру в кружке
		hourNumber.innerHTML = i;
		hourNumber.style.fontSize = numberCircleDiameter / 2 + 'px';

		numberCircle.appendChild(hourNumber);
		numberContainer.appendChild(numberCircle);
		clockFace.appendChild(numberContainer);
	}

	for (let all of container.children) {
		all.style.display = 'none'
	}
	container.appendChild(clockFace);
}