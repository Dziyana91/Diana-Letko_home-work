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

	// добавляем тег CANVAS для циферблата
	let clockFace = document.createElement('canvas');
	clockFace.setAttribute('width', clockDiameter);
	clockFace.setAttribute('height', clockDiameter);
	clockFace.setAttribute('id', 'cvs-clock');
	clockFace.innerHTML = 'Update browser'
	let clockFaceContext = clockFace.getContext('2d');

	// рисуем циферблат
	clockFaceContext.fillStyle = 'rgb(82, 125, 182)';
	clockFaceContext.beginPath();
	clockFaceContext.arc(clockRadius, clockRadius, clockRadius, 0, Math.PI * 2, false);
	clockFaceContext.fill();

	// рисуем кружки с цифрами на циферблате
	let numberPositionAngle = 0;													// стартовый угол поворота контейнера для кружка с цифрой
	let numberCircleLeft = 0;
	let numberCircleTop = 0;
	fontSize = numberCircleRadius;

	for (let i = 1; i <= maxHours; i++) {
		// рисуем кружок для цифры
		clockFaceContext.fillStyle = 'rgb(197, 131, 217)';
		numberPositionAngle += numberRotationAngle;
		numberCircleLeft = clockRadius + (clockRadius - numberCircleRadius - outerGap) * Math.sin(numberPositionAngle);
		numberCircleTop = clockRadius - (clockRadius - numberCircleRadius - outerGap) * Math.cos(numberPositionAngle);
		clockFaceContext.beginPath();
		clockFaceContext.arc(numberCircleLeft, numberCircleTop, numberCircleRadius, 0, Math.PI * 2, false);
		clockFaceContext.fill();
		// рисуем цифру в кружке
		clockFaceContext.fillStyle = 'rgb(66, 66, 66)';
		clockFaceContext.font = `normal ${fontSize}px sans-serif`;
		clockFaceContext.textAlign = 'center';
		clockFaceContext.textBaseline = 'alphabetic'
		clockFaceContext.fillText(i, numberCircleLeft, numberCircleTop + fontSize / 3);	//! не понимаю почему делим на 3, пришлось подбирать
	}

	// добавляем теги CANVAS для стрелок часов
	let hourHand = document.createElement('canvas');
	hourHand.style.position = 'absolute';
	hourHand.setAttribute('width', clockDiameter);
	hourHand.setAttribute('height', clockDiameter);
	hourHand.setAttribute('id', 'cvs-hour');
	hourHand.innerHTML = 'Update browser'
	let hourHandContext = hourHand.getContext('2d');

	hourHandContext.strokeStyle = 'rgb(66, 66, 66)';
	hourHandContext.lineWidth = hourHandWidth;
	hourHandContext.lineCap = 'round';

	let minuteHand = document.createElement('canvas');
	minuteHand.style.position = 'absolute';
	minuteHand.setAttribute('width', clockDiameter);
	minuteHand.setAttribute('height', clockDiameter);
	minuteHand.setAttribute('id', 'cvs-minute');
	minuteHand.innerHTML = 'Update browser'
	let minuteHandContext = minuteHand.getContext('2d');

	minuteHandContext.strokeStyle = 'rgb(66, 66, 66)';
	minuteHandContext.lineWidth = minuteHandWidth;
	minuteHandContext.lineCap = 'round';

	let secondHand = document.createElement('canvas');
	secondHand.style.position = 'absolute';
	secondHand.setAttribute('width', clockDiameter);
	secondHand.setAttribute('height', clockDiameter);
	secondHand.setAttribute('id', 'cvs-second');
	secondHand.innerHTML = 'Update browser'
	let secondHandContext = secondHand.getContext('2d');

	secondHandContext.strokeStyle = 'rgb(66, 66, 66)';
	secondHandContext.lineWidth = secondHandWidth;
	secondHandContext.lineCap = 'round';

	// рисуем поле для электронных часов
	let timeField = document.createElement('canvas');
	timeField.style.position = 'absolute';
	timeField.setAttribute('width', clockDiameter);
	timeField.setAttribute('height', clockDiameter);
	timeField.setAttribute('id', 'cvs-eclock');
	timeField.innerHTML = 'Update browser'
	let timeFieldContext = timeField.getContext('2d');

	fontSize = clockRadius / 6
	timeFieldContext.fillStyle = 'rgb(255, 255, 255)';
	timeFieldContext.font = `italic ${fontSize}px sans-serif`;
	timeFieldContext.textAlign = 'center';
	timeFieldContext.textBaseline = 'alphabetic'

	// скрываем начальное содержание страницы и отображаем часы
	for (let all of container.children) {
		all.style.display = 'none'
	}

	container.appendChild(clockFace);
	container.appendChild(hourHand);
	container.appendChild(minuteHand);
	container.appendChild(secondHand);
	container.appendChild(timeField);

	let clockFaceImage = clockFaceContext.getImageData(0, 0, clockDiameter, clockDiameter);
	let hourHandImage = null;
	let minuteHandImage = null;
	let secondHandImage = null;


	let currentSecondAngle = 0;
	let currentMinuteAngle = 0;
	let currentHourAngle = 0;

	let currentDate = null;
	let mSecond = 0;
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
		mSecond = currentDate.getMilliseconds();

		// рисуем часовую стрелку и делаем ее скрин
		currentHourAngle = (currentHour * hourHandRotationAngle + 360 / maxHours * currentMinute / 60) * Math.PI / 180;
		hourHandContext.resetTransform();
		hourHandContext.putImageData(clockFaceImage, 0, 0);
		hourHandContext.save();
		hourHandContext.translate(clockRadius, clockRadius);
		hourHandContext.rotate(currentHourAngle);
		hourHandContext.translate(-clockRadius, -clockRadius);
		hourHandContext.beginPath();
		hourHandContext.moveTo(clockRadius, clockRadius + hourHandHeight * offset / 100);
		hourHandContext.lineTo(clockRadius, clockRadius + hourHandHeight * offset / 100 - hourHandHeight);
		hourHandContext.stroke();
		hourHandContext.restore();
		hourHandImage = hourHandContext.getImageData(0, 0, clockDiameter, clockDiameter);

		// рисуем минутную стрелку и делаем ее скрин
		currentMinuteAngle = currentMinute * minSecHandRotationAngle * Math.PI / 180;
		minuteHandContext.resetTransform();
		minuteHandContext.putImageData(clockFaceImage, 0, 0);
		minuteHandContext.putImageData(hourHandImage, 0, 0);
		minuteHandContext.save();
		minuteHandContext.translate(clockRadius, clockRadius);
		minuteHandContext.rotate(currentMinuteAngle);
		minuteHandContext.translate(-clockRadius, -clockRadius);
		minuteHandContext.beginPath();
		minuteHandContext.moveTo(clockRadius, clockRadius + minuteHandHeight * offset / 100);
		minuteHandContext.lineTo(clockRadius, clockRadius + minuteHandHeight * offset / 100 - minuteHandHeight);
		minuteHandContext.stroke();
		minuteHandContext.restore();
		minuteHandImage = minuteHandContext.getImageData(0, 0, clockDiameter, clockDiameter);

		// рисуем секундную стрелку и делаем ее скрин
		currentSecondAngle = currentSecond * minSecHandRotationAngle * Math.PI / 180;
		secondHandContext.resetTransform();
		secondHandContext.putImageData(clockFaceImage, 0, 0);
		secondHandContext.putImageData(hourHandImage, 0, 0);
		secondHandContext.putImageData(minuteHandImage, 0, 0);
		secondHandContext.save();
		secondHandContext.translate(clockRadius, clockRadius);
		secondHandContext.rotate(currentSecondAngle);
		secondHandContext.translate(-clockRadius, -clockRadius);
		secondHandContext.beginPath();
		secondHandContext.moveTo(clockRadius, clockRadius + secondHandHeight * offset / 100);
		secondHandContext.lineTo(clockRadius, clockRadius + secondHandHeight * offset / 100 - secondHandHeight);
		secondHandContext.stroke();
		secondHandContext.restore();
		secondHandImage = secondHandContext.getImageData(0, 0, clockDiameter, clockDiameter);

		currentTime = `${currentHour > 9 ? currentHour : '0' + currentHour}:${currentMinute > 9 ? currentMinute : '0' + currentMinute}:${currentSecond > 9 ? currentSecond : '0' + currentSecond}`;
		timeFieldContext.putImageData(clockFaceImage, 0, 0);
		timeFieldContext.putImageData(hourHandImage, 0, 0);
		timeFieldContext.putImageData(minuteHandImage, 0, 0);
		timeFieldContext.putImageData(secondHandImage, 0, 0);
		timeFieldContext.fillText(currentTime, clockRadius, clockRadius / 2 + fontSize);
		console.log(currentTime);

		setTimeout(startClock, 1020 - mSecond);
	}
}



