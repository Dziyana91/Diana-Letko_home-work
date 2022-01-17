"use strict";

vowelsCount(prompt('введите фразу для подсчета в ней гласных букв'));

function vowelsCount(phrase) {
	const VOWELS_LIBRARY = {
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

	let phraseLowerCase = phrase.toLowerCase();
	let phraseArray = phraseLowerCase.split('');

	let count1 = 0;
	function countingForEach(value, i, array) {
		if (value in VOWELS_LIBRARY) {
			count1++;
		}
	}
	phraseArray.forEach(countingForEach)
	console.log(count1 + ' - с использованием метода массива forEach');

	function countingFilter(value, i, array) {
		return (value in VOWELS_LIBRARY);
	}
	let vowelsArray = phraseArray.filter(countingFilter);
	let count2 = vowelsArray.length;
	console.log(count2 + ' - с использованием метода массива filter');

	function countingReduce(r, value, i, array) {
		if (value in VOWELS_LIBRARY) {
			r++;
		}
		return r;
	};
	let count3 = phraseArray.reduce(countingReduce, 0);
	console.log(count3 + ' - с использованием метода массива reduce');
}
