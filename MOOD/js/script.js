"use strict";

mood(5);

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {

	console.log('цветов: ' + colorsCount);

	colorsList(colorsCount);

	function colorsList(colorsCount) {

		var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
		var used = {};										// ключ хэша - цвет, который уже встречался


		while (Object.keys(used).length < colorsCount) {		// проверка количества цветов в хэше
			var n = randomDiap(1, 7);
			var colorName = colors[n];

			if (colorName in used) {
				continue;
			}
			used[colorName] = true;						// запоминаем впервые встретившийся цвет
			console.log(colorName);
		}

	}

}



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
// 				// colorsList(1);								// чтобы количество выводимых цветов не уменьшалось при повторении, вызываем функцию 1 дополнительный раз для каждого повторения
// 				i--;											// чтобы количество выводимых цветов не уменьшалось при повторении, уменьшаем на 1 номер итерации
// 				continue;									// далее переходим к следующей итерации цикла
// 			}
// 			used[colorName] = true;						// запоминаем впервые встретившийся цвет
// 			console.log(colorName);

// 		}

// 	}
// }
