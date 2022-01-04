"use strict";

console.log(vowelsCount(prompt('введите фразу для подсчета в ней гласных букв')));

function vowelsCount(phrase) {
	const VOWELS_LIBRARY = {
		'у': 'у',
		'У': 'У',
		'е': 'е',
		'Е': 'Е',
		'ы': 'ы',
		'Ы': 'Ы',
		'а': 'а',
		'А': 'А',
		'о': 'о',
		'О': 'О',
		'э': 'э',
		'Э': 'Э',
		'я': 'я',
		'Я': 'Я',
		'и': 'и',
		'И': 'И',
		'ю': 'ю',
		'Ю': 'Ю',
		'ё': 'ё',
		'Ё': 'Ё'
	};

	let count = 0;

	for (let i = 0; i < phrase.length; i++) {
		let charset = phrase[i];						// перебираем буквы в строке по очереди

		if (charset in VOWELS_LIBRARY) {
			count++
		};
	}
	return count;
}

