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
	function countingForEach(value, i, array) {
		if (value in LETTERS_LIBRARY) {
			count++;
		}
	}
	phraseArray.forEach(countingForEach)
	return count;
}

function vowelsCountF(phrase) {
	let phraseLC = phrase.toLowerCase();
	let phraseArray = phraseLC.split('');
	function countingFilter(value, i, array) {
		return (value in LETTERS_LIBRARY);
	}
	let vowelsArray = phraseArray.filter(countingFilter);
	return vowelsArray.length;
}

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