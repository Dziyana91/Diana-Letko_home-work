"use strict";

console.log(vowelsCount(prompt('введите фразу для подсчета в ней гласных букв')));

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

	// * с использованием метода массива forEach
	// let count = 0;
	// function counting(value, i, array) {
	// 	if (value in VOWELS_LIBRARY) {
	// 		count++;
	// 	};
	// }
	// phraseArray.forEach(counting);

	// * с использованием метода массива filter
	// function vowels(value, i, array) {
	// 	return (value in VOWELS_LIBRARY);
	// }
	// let vowelsArray = phraseArray.filter(vowels);
	// let count = vowelsArray.length;

	// * с использованием метода массива reduce
	function counting(r, value, i, array) {
		if (value in VOWELS_LIBRARY) {
			r++;
		}
		return r;
	};
	let count = phraseArray.reduce(counting, 0);

	return count;
}
