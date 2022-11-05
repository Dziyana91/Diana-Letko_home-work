"use strict";

let form = document.forms.clock;
let button = document.getElementById('button');
button.addEventListener('click', validateDiameter, false);
// button.addEventListener('click', drawClock, false);
form.addEventListener('submit', clickButton, false);

function clickButton(eo) {
	eo = eo || window.event;
	eo.preventDefault();
	button.dispatchEvent(new MouseEvent('click'));
}

function validateDiameter(eo) {
	eo = eo || window.event;

	let input = document.getElementById('diameter');
	let inputValue = input.value;
	let errorMessage = document.getElementById('error');

	if (inputValue == '') {
		errorMessage.innerHTML = 'введите размер часов';
	} else if (inputValue < 200 || inputValue > 800) {
		errorMessage.innerHTML = 'размер часов должен быть в диапазоне 200 - 800';
	} else {
		errorMessage.innerHTML = '';
		drawClock();
	}
}

function drawClock() {

	let container = document.getElementById('wrapper');

	const maxHours = 12;																// количество часов на циферблате
	let clockDiameter = document.getElementById('diameter').value;		// диаметр циферблата
	let clockRadius = clockDiameter / 2;										// половина ширины div с циферблатом
	let clockCircleLength = Math.PI * clockDiameter;						// длина окружности циферблата
	let outerGap = clockRadius * 0.05;											// отступ между краем цифеблата и кружком с цифрой - 5% от высоты контейнера для кружка с цифрой
	let numberCircleDiameter = clockCircleLength / maxHours * 0.6;		// диаметр кружка с цифрой - 60% от расстояния для каждой цифры (длина окружности разделенная на количество часов)
	let numberCircleRadius = numberCircleDiameter / 2;
	let numberRotationAngle = 360 / maxHours * Math.PI / 180;			// градус (в радианах) смещения кружка с цифрой - 360гр разделено поровну на количество контейнеров
	// стрелки часов
	let hourHandHeight = clockRadius * 0.6;									// длина стрелок
	let hourHandWidth = clockCircleLength / maxHours * 0.2;				// ширина стрелок
	let hourHandRotationAngle = 360 / maxHours; 								// градус смещения часовой стрелки - 360гр разделено на количество часов
	let minuteHandHeight = clockRadius * 0.8;
	let minuteHandWidth = hourHandWidth / 2;
	let secondHandHeight = clockRadius * 0.9;
	let secondHandWidth = minuteHandWidth / 3;
	const offset = 10;																// процент сдвига стрелок вниз от длины стрелки, чтобы они пересекались у основания И transform origin Y
	let minSecHandRotationAngle = 360 / maxHours / (60 / maxHours); 	// градус смещения минутной/секундной стрелки - 360гр разделено на количество часов и на количество отделений на циферблате
	let fontSize = 0;

	// добавляем тег SVG
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', clockDiameter);
	svg.setAttribute('height', clockDiameter);
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	// рисуем циферблат
	let clockFace = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	clockFace.setAttribute('cx', clockRadius);
	clockFace.setAttribute('cy', clockRadius);
	clockFace.setAttribute('r', clockRadius);
	clockFace.setAttribute('fill', 'rgb(82, 125, 182)');
	svg.appendChild(clockFace);

	// рисуем кружки с цифрами на циферблате
	let numberPositionAngle = 0;													// стартовый угол поворота контейнера для кружка с цифрой
	let numberCircleLeft = 0;
	let numberCircleTop = 0;
	fontSize = numberCircleRadius;

	for (let i = 1; i <= maxHours; i++) {
		// рисуем кружок для цифры
		let numberCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		numberPositionAngle += numberRotationAngle;
		numberCircleLeft = clockRadius + (clockRadius - numberCircleRadius - outerGap) * Math.sin(numberPositionAngle);
		numberCircleTop = clockRadius - (clockRadius - numberCircleRadius - outerGap) * Math.cos(numberPositionAngle);
		numberCircle.setAttribute('cx', numberCircleLeft);
		numberCircle.setAttribute('cy', numberCircleTop);
		numberCircle.setAttribute('r', numberCircleRadius);
		numberCircle.setAttribute('fill', 'rgb(197, 131, 217)');
		svg.appendChild(numberCircle);
		// рисуем цифру в кружке
		let hourNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		hourNumber.setAttribute('x', numberCircleLeft);
		hourNumber.setAttribute('y', numberCircleTop + fontSize / 3);		//! не понимаю почему делим на 3, пришлось подбирать
		hourNumber.setAttribute('text-anchor', 'middle');
		hourNumber.setAttribute('fill', 'rgb(66, 66, 66)');
		hourNumber.style.fontSize = fontSize + 'px';
		hourNumber.style.fontFamily = 'sans-serif';
		hourNumber.innerHTML = i;
		svg.appendChild(hourNumber);
	}

	// рисуем стрелки часов
	let hourHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	hourHand.setAttribute('x1', clockRadius);
	hourHand.setAttribute('y1', clockRadius + hourHandHeight * offset / 100);
	hourHand.setAttribute('x2', clockRadius);
	hourHand.setAttribute('y2', clockRadius + hourHandHeight * offset / 100 - hourHandHeight);
	hourHand.setAttribute('stroke-width', hourHandWidth);
	hourHand.setAttribute('stroke-linecap', 'round');
	hourHand.setAttribute('stroke', 'rgb(66, 66, 66)');
	hourHand.style.transformOrigin = `${clockRadius}px ${clockRadius}px`;
	svg.appendChild(hourHand);
	let minuteHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	minuteHand.setAttribute('x1', clockRadius);
	minuteHand.setAttribute('y1', clockRadius + minuteHandHeight * offset / 100);
	minuteHand.setAttribute('x2', clockRadius);
	minuteHand.setAttribute('y2', clockRadius + minuteHandHeight * offset / 100 - minuteHandHeight);
	minuteHand.setAttribute('stroke-width', minuteHandWidth);
	minuteHand.setAttribute('stroke-linecap', 'round');
	minuteHand.setAttribute('stroke', 'rgb(66, 66, 66)');
	minuteHand.style.transformOrigin = `${clockRadius}px ${clockRadius}px`;
	svg.appendChild(minuteHand);
	let secondHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	secondHand.setAttribute('x1', clockRadius);
	secondHand.setAttribute('y1', clockRadius + secondHandHeight * offset / 100);
	secondHand.setAttribute('x2', clockRadius);
	secondHand.setAttribute('y2', clockRadius + secondHandHeight * offset / 100 - secondHandHeight);
	secondHand.setAttribute('stroke-width', secondHandWidth);
	secondHand.setAttribute('stroke-linecap', 'round');
	secondHand.setAttribute('stroke', 'rgb(66, 66, 66)');
	secondHand.style.transformOrigin = `${clockRadius}px ${clockRadius}px`;
	svg.appendChild(secondHand);

	// рисуем поле для электронных часов
	fontSize = clockRadius / 6
	let timeField = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	timeField.setAttribute('x', clockRadius);
	timeField.setAttribute('y', clockRadius / 2 + fontSize);
	timeField.setAttribute('text-anchor', 'middle');
	timeField.setAttribute('fill', 'rgb(255, 255, 255)');
	timeField.style.fontSize = fontSize + 'px';
	timeField.style.fontStyle = 'italic';
	timeField.style.fontFamily = 'sans-serif';
	svg.appendChild(timeField);

	// скрываем начальное содержание страницы и отображаем часы
	for (let all of container.children) {
		all.style.display = 'none'
	}

	container.appendChild(svg);

	let currentSecondAngle = 0;
	let currentMinuteAngle = 0;
	let currentHourAngle = 0;

	let currentDate = null;
	let mSeccond = 0;
	let currentSecond = 0;
	let currentMinute = 0;
	let currentHour = 0;
	let currentTime = null;

	startClock();

	function startClock() {

		currentDate = new Date();
		currentSecond = currentDate.getSeconds();
		currentMinute = currentDate.getMinutes();
		currentHour = currentDate.getHours();
		mSeccond = currentDate.getMilliseconds();

		currentSecondAngle = currentSecond * minSecHandRotationAngle;
		secondHand.setAttribute('transform', `rotate(${currentSecondAngle})`);
		currentMinuteAngle = currentMinute * minSecHandRotationAngle;
		minuteHand.setAttribute('transform', `rotate(${currentMinuteAngle})`);
		currentHourAngle = currentHour * hourHandRotationAngle + 360 / maxHours * currentMinute / 60;
		hourHand.setAttribute('transform', `rotate(${currentHourAngle})`);

		currentTime = `${currentHour > 9 ? currentHour : '0' + currentHour}:${currentMinute > 9 ? currentMinute : '0' + currentMinute}:${currentSecond > 9 ? currentSecond : '0' + currentSecond}`;
		timeField.innerHTML = currentTime;
		console.log(currentTime);

		setTimeout(startClock, 1020 - mSeccond);
	}
}



