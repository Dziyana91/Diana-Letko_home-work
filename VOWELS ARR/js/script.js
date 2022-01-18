"use strict";

let phrase = prompt('введите фразу для подсчета в ней гласных букв').toLowerCase();
let phraseArray = phrase.split('');

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

console.log(vowelsCountFE(phraseArray) + ' - с использованием метода массива forEach');
console.log(vowelsCountF(phraseArray) + ' - с использованием метода массива filter');
console.log(vowelsCountR(phraseArray) + ' - с использованием метода массива reduce');

function vowelsCountFE(phrase) {
	let count = 0;
	function countingForEach(value, i, array) {
		if (value in LETTERS_LIBRARY) {
			count++;
		}
	}
	phrase.forEach(countingForEach)
	return count;
}

function vowelsCountF(phrase) {
	function countingFilter(value, i, array) {
		return (value in LETTERS_LIBRARY);
	}
	let vowelsArray = phrase.filter(countingFilter);
	return vowelsArray.length;
}

function vowelsCountR(phrase) {
	function countingReduce(r, value, i, array) {
		if (value in LETTERS_LIBRARY) {
			r++;
		}
		return r;
	};
	let count = phrase.reduce(countingReduce, 0);
	return count;
}