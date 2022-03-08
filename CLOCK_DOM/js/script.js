"use strict";

let form = document.forms.clock;
let button = document.getElementById('button');
button.addEventListener('click', validateDiameter, false);
button.addEventListener('click', drawClock, false);
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
	let valid = false;

	if (inputValue < 200 || inputValue > 800) {
		errorMessage.innerHTML = 'размер часов должен быть в диапазоне 200 - 800';
	} else {
		errorMessage.innerHTML = '';
		valid = true;
	}
	return valid;
}

function drawClock(eo) {
	eo = eo || window.event;

	let container = document.getElementById('wrapper');

	const maxHours = 12;																// количество часов на циферблате
	let clockDiameter = document.getElementById('diameter').value;		// диаметр циферблата
	let clockRadius = clockDiameter / 2;										// половина ширины div с циферблатом
	let clockCircleLength = Math.PI * clockDiameter;						// длина окружности циферблата
	let numberContainerHeight = clockRadius;									// высота контейнера для кружка с цифрой
	let numberContainerWidth = clockCircleLength / maxHours;				// длина контейнера для кружка с цифрой - длина окружности разделенная по ровну на каждую цифру
	let outerGap = clockRadius * 0.05;											// отступ между краем цифеблата и кружком с цифрой - 5% от высоты контейнера для кружка с цифрой
	let numberCircleDiameter = numberContainerWidth * 0.6;				// диаметр кружка с цифрой - 60% от ширины контейнера для кружка с цифрой
	let numberRotationAngle = 360 / maxHours;									// градус смещения контейнера для кружка с цифрой - 360гр разделено поровну на количество контейнеров
	// стрелки часов
	let hourHandHeight = clockRadius * 0.6;									// длина стрелок
	let hourHandWidth = numberContainerWidth * 0.2;							// ширина стрелок
	let hourHandRotationAngle = 360 / maxHours; 								// градус смещения часовой стрелки - 360гр разделено на количество часов
	let minuteHandHeight = clockRadius * 0.8;
	let minuteHandWidth = hourHandWidth / 2;
	let secondHandHeight = clockRadius * 0.9;
	let secondHandWidth = minuteHandWidth / 3;
	const offset = 10;																// процент сдвига стрелок вниз от длины стрелки, чтобы они пересекались у основания И transform origin Y
	let minSecHandRotationAngle = 360 / maxHours / (60 / maxHours); 	// градус смещения минутной/секундной стрелки - 360гр разделено на количество часов и на количество отделений на циферблате

	// рисуем циферблат
	let clockFace = document.createElement('div');
	clockFace.style.width = clockDiameter + 'px';
	clockFace.style.height = clockDiameter + 'px';
	clockFace.style.borderRadius = 50 + '%';
	clockFace.style.backgroundColor = 'rgb(82, 125, 182)';
	clockFace.style.position = 'relative';
	clockFace.style.display = 'flex';
	clockFace.style.justifyContent = 'center';
	clockFace.style.fontFamily = 'sans-serif';

	// рисуем поле для электронных часов
	let timeField = document.createElement('div');
	let marginTop = clockRadius / 2;
	timeField.style.marginTop = marginTop + 'px';
	timeField.style.color = 'rgb(255, 255, 255)';
	timeField.style.fontSize = clockRadius / 6 + 'px';
	timeField.style.fontStyle = 'italic';
	timeField.style.zIndex = 1;

	// рисуем стрелки часов
	let hourHand = document.createElement('div');
	hourHand.style.height = hourHandHeight + 'px';
	hourHand.style.width = hourHandWidth + 'px';
	hourHand.style.borderRadius = hourHandWidth + 'px';
	hourHand.style.backgroundColor = 'rgb(66, 66, 66)';
	hourHand.style.position = 'absolute';
	hourHand.style.top = (clockRadius - hourHandHeight + hourHandHeight * offset / 100) + 'px';
	hourHand.style.left = (clockRadius - hourHandWidth / 2) + 'px';
	hourHand.style.transformOrigin = `50% ${100 - offset}%`;
	let minuteHand = document.createElement('div');
	minuteHand.style.height = minuteHandHeight + 'px';
	minuteHand.style.width = minuteHandWidth + 'px';
	minuteHand.style.borderRadius = minuteHandWidth + 'px';
	minuteHand.style.backgroundColor = 'rgb(66, 66, 66)';
	minuteHand.style.position = 'absolute';
	minuteHand.style.top = (clockRadius - minuteHandHeight + minuteHandHeight * offset / 100) + 'px';
	minuteHand.style.left = (clockRadius - minuteHandWidth / 2) + 'px';
	minuteHand.style.transformOrigin = `50% ${100 - offset}%`;
	let secondHand = document.createElement('div');
	secondHand.style.height = secondHandHeight + 'px';
	secondHand.style.width = secondHandWidth + 'px';
	secondHand.style.borderRadius = secondHandWidth + 'px';
	secondHand.style.backgroundColor = 'rgb(66, 66, 66)';
	secondHand.style.position = 'absolute';
	secondHand.style.top = (clockRadius - secondHandHeight + secondHandHeight * offset / 100) + 'px';
	secondHand.style.left = (clockRadius - secondHandWidth / 2) + 'px';
	secondHand.style.transformOrigin = `50% ${100 - offset}%`;

	// рисуем кружки с цифрами на циферблате
	let numberCircleStartPosition = clockRadius - numberContainerWidth / 2;		// стартовая позиция на 12 часах
	let numberPositionAngle = 0;																// стартовый угол поворота контейнера для кружка с цифрой

	for (let i = 1; i <= maxHours; i++) {
		// рисуем прямоугольный контейнер для кружка с цифрой
		let numberContainer = document.createElement('div');
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
		// рисуем кружок для цифры
		let numberCircle = document.createElement('div');
		numberCircle.style.width = numberCircleDiameter + 'px';
		numberCircle.style.height = numberCircleDiameter + 'px';
		numberCircle.style.borderRadius = 50 + '%';
		numberCircle.style.backgroundColor = 'rgb(197, 131, 217)';
		numberCircle.style.display = 'flex';
		numberCircle.style.justifyContent = 'center';
		numberCircle.style.alignItems = 'center';
		numberCircle.style.position = 'absolute';
		numberCircle.style.transform = `rotate(-${numberPositionAngle}deg)`;		// кружок с цифрой поворачиваем в обратную сторону, чтобы был всегда горизонтально
		// рисуем цифру в кружке
		let hourNumber = document.createElement('span');
		hourNumber.style.color = 'rgb(66, 66, 66)';
		hourNumber.innerHTML = i;
		hourNumber.style.fontSize = numberCircleDiameter / 2 + 'px';

		numberCircle.appendChild(hourNumber);
		numberContainer.appendChild(numberCircle);
		clockFace.appendChild(numberContainer);
	}

	// скрываем начальное содержание страницы и отображаем часы
	for (let all of container.children) {
		all.style.display = 'none'
	}

	clockFace.appendChild(timeField);
	clockFace.appendChild(hourHand);
	clockFace.appendChild(minuteHand);
	clockFace.appendChild(secondHand);
	container.appendChild(clockFace);

	let currentSecondAngle = 0;
	let currentMinuteAngle = 0;
	let currentHourAngle = 0;

	let currentDate = null;
	let currentSecond = 0;
	let currentMinute = 0;
	let currentHour = 0;
	let currentTime = null;

	startClock();
	let start = setInterval(startClock, 1000);

	function startClock() {

		currentDate = new Date();
		currentSecond = currentDate.getSeconds();
		currentMinute = currentDate.getMinutes();
		currentHour = currentDate.getHours();

		currentSecondAngle = currentSecond * minSecHandRotationAngle;
		secondHand.style.transform = `rotate(${currentSecondAngle}deg)`;
		currentMinuteAngle = currentMinute * minSecHandRotationAngle;
		minuteHand.style.transform = `rotate(${currentMinuteAngle}deg)`;
		currentHourAngle = currentHour * hourHandRotationAngle;
		if (currentMinute >= 30) {
			currentHourAngle += hourHandRotationAngle / 2;
		}
		hourHand.style.transform = `rotate(${currentHourAngle}deg)`;

		currentTime = `${currentHour > 9 ? currentHour : '0' + currentHour}:${currentMinute > 9 ? currentMinute : '0' + currentMinute}:${currentSecond > 9 ? currentSecond : '0' + currentSecond}`;
		timeField.innerHTML = currentTime;
		console.log(currentTime);
	}
}



