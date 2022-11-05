"use strict";

let phrase = prompt('введите фразу для подсчета в ней гласных букв');

const LETTERS_LIBRARY = {
	'у': 'у',
	'е': 'е',
	'ы': 'ы',
	'а': 'а',
	'о': 'о',
	'э': 'э',
	'я': 'я',
	'и': 'и',
	'ю': 'ю',
	'ё': 'ё',
};

console.log(vowelsCountFE(phrase) + ' - с использованием метода массива forEach');
console.log(vowelsCountF(phrase) + ' - с использованием метода массива filter');
console.log(vowelsCountR(phrase) + ' - с использованием метода массива reduce');

function vowelsCountFE(phrase) {
	let phraseLC = phrase.toLowerCase();
	let phraseArray = phraseLC.split('');
	let count = 0;
	phraseArray.forEach(countingForEach);
	function countingForEach(value, i, array) {		// все аргументы объявлять не обязательно, если они в функции не нужны
		if (value in LETTERS_LIBRARY) {
			count++;
		}
	};
	return count;
}

// * без отдельного описания функции - с использованием литералла функции
// function vowelsCountFE(phrase) {
// 	let phraseLC = phrase.toLowerCase();
// 	let phraseArray = phraseLC.split('');
// 	let count = 0;
// 	phraseArray.forEach(
// 		function (value) {
// 			if (value in LETTERS_LIBRARY) {
// 				count++;
// 			}
// 		});
// 	return count;
// }

// * с использованием литералла функции + стрелочная функция 
// function vowelsCountFE(phrase) {
// 	let phraseLC = phrase.toLowerCase();
// 	let phraseArray = phraseLC.split('');
// 	let count = 0;
// 	phraseArray.forEach(
// 		(value) => {
// 			if (value in LETTERS_LIBRARY) {
// 				count++;
// 			}
// 		});
// 	return count;
// }

function vowelsCountF(phrase) {
	let phraseLC = phrase.toLowerCase();
	let phraseArray = phraseLC.split('');
	function countingFilter(value, i, array) {
		return (value in LETTERS_LIBRARY);
	}
	let vowelsArray = phraseArray.filter(countingFilter);
	return vowelsArray.length;
}

// * с использованием литералла функции + стрелочная функция
// function vowelsCountF(phrase) {
// 	let phraseLC = phrase.toLowerCase();
// 	let phraseArray = phraseLC.split('');
// 	let vowelsArray = phraseArray.filter(value => value in LETTERS_LIBRARY);
// 	return vowelsArray.length;
// }

function vowelsCountR(phrase) {
	let phraseLC = phrase.toLowerCase();
	let phraseArray = phraseLC.split('');
	function countingReduce(r, value, i, array) {
		if (value in LETTERS_LIBRARY) {
			r++;
		}
		return r;
	};
	let count = phraseArray.reduce(countingReduce, 0);
	return count;
}

// * с использованием литералла функции
// function vowelsCountR(phrase) {
// 	let phraseLC = phrase.toLowerCase();
// 	let phraseArray = phraseLC.split('');
// 	let count = phraseArray.reduce(
// 		function (r, value) {
// 			if (value in LETTERS_LIBRARY) {
// 				r++;
// 			}
// 			return r;									// если возможно, лучше чтобы в функции был только один return в конце
// 		}, 0);
// 	return count;
// }

// * с использованием литералла функции + стрелочная функция
// function vowelsCountR(phrase) {
// 	let phraseLC = phrase.toLowerCase();
// 	let phraseArray = phraseLC.split('');
// 	let count = phraseArray.reduce(								// return можно указать вместо объявления переменной, но читать такой код сложно
// 		(r, value) => r + (value in LETTERS_LIBRARY), 0);	// (value in LETTERS_LIBRARY) - boolean преобразуется к числу
// 	return count;
// }