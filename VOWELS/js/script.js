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

	phrase = phrase.toLowerCase();

	let count = 0;

	for (let i = 0; i < phrase.length; i++) {
		let charset = phrase[i];						// перебираем буквы в строке по очереди

		if (charset in VOWELS_LIBRARY) {
			count++
		};
	}
	return count;
}

// * самый быстро работающий вариант - через if и перебор всех гласных

// можно также с библиотекой в виде массива, но хэш быстрее массива
function vowelsCount(phrase) {
	const VOWELS_LIBRARY = ['а', 'я', 'у', 'ю', 'о', 'ё', 'и', 'ы', 'э', 'е',];  //! вместо массова можно было просто записать строкой, строка это массив букв, с ней работают те же методы
	phrase = phrase.toLowerCase();
	let count = 0;

	for (let i = 0; i < phrase.length; i++) {
		let charset = phrase[i];						// перебираем буквы в строке по очереди

		if (VOWELS_LIBRARY.includes(charset)) {	//! VOWELS_LIBRARY.indexOf(charset)!==-1
			count++
		};
	}
	return count;
}