"use strict";

mood(5);

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {

	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	var usedH = {};										// ключ хэша - цвет, который уже встречался
	var colorsListLength = 0;							// количество выведенных цветов

	console.log('цветов: ' + colorsCount);

	while (colorsListLength < colorsCount) {		// проверка количества выведенных цветов
		var n = randomDiap(1, 7);
		var colorName = colors[n];

		if (colorName in usedH) {
			continue;
		}
		usedH[colorName] = true;						// запоминаем впервые встретившийся цвет
		colorsListLength++
		console.log(colorName);
	}
}

// * лучший вариант кода
// function mood(colorsCount) {

// 	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
// 	var usedH = {};									// ключ - номер цвета, который уже встречался

// 	console.log('цветов: ' + colorsCount);

// 	for (var i = 1; i <= colorsCount; i++) {

// 		do {
// 			var n = randomDiap(1, 7);
// 		} while (n in usedH);

// 		usedH[n] = true;							// запоминаем впервые встретившийся цвет
// 		var colorName = colors[n];
// 		console.log(colorName);
// 	}
// }

// тоже хороший вариант с while
// function mood(colorsCount) {

// 	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
// 	var usedH = {};										// ключ хэша - цвет, который уже встречался

// 	console.log('цветов: ' + colorsCount);

// 	for (var i = 1; i <= colorsCount; i++) {

// 		while (true) {
// 			var n = randomDiap(1, 7);
// 			if (!(n in usedH)) {
// 				break;
// 			}
// 		}

// 		usedH[n] = true;						// запоминаем впервые встретившийся цвет
// 		var colorName = colors[n];
// 		console.log(colorName);
// 	}
// }

// рекурсия
// function mood(colorsCount) {

// 	console.log('цветов: ' + colorsCount);

// 	colorsList(colorsCount);

// 	function colorsList(colorsCount) {

// 		var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
// 		var used = {};										// ключ хэша - цвет, который уже встречался

// 		for (var i = 1; i <= colorsCount; i++) {
// 			var n = randomDiap(1, 7);
// 			var colorName = colors[n];

// 			if (colorName in used) {
// 				colorsList(1);								// чтобы количество выводимых цветов не уменьшалось при повторении, вызываем функцию 1 дополнительный раз для каждого повторения
// 				continue;									// далее переходим к следующей итерации цикла
// 			}
// 			used[colorName] = true;						// запоминаем впервые встретившийся цвет
// 			console.log(colorName);
// 		}
// 	}
// }
