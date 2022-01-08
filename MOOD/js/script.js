"use strict";

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];

	var used = {};											// ключ хэша - цвет, который уже встречался

	moodHeader(colorsCount);
	moodColors(colorsCount);

	function moodHeader(colorsCount) {
		console.log('цветов: ' + colorsCount);
	}

	function moodColors(colorsCount) {

		for (var i = 1; i <= colorsCount; i++) {
			var n = randomDiap(1, 7);
			var colorName = colors[n];

			if (colorName in used) {
				moodColors(1);								// чтобы количество выводимых цветов не уменьшалось при повторении, вызываем функцию 1 дополнительный раз для каждого повторения
				continue;									// далее переходим к следующей итерации цикла
			} else {
				used[colorName] = true;					// запоминаем впервые встретившийся цвет
				console.log(colorName);
			}
		}

	}
}

mood(3);