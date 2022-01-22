"use strict";

alert(isPalindrome(prompt('введите текст')));


function isPalindrome(phrase) {

	const SYMBOLS_TO_IGNORE = {
		'ь': true,
		'ъ': true,
		',': true,
		'.': true,
		'!': true,
		'?': true,
		':': true,
		';': true,
		'(': true,
		')': true,
		'"': true,
		'"': true,
		'-': true,
		'—': true,
		' ': true
	};

	let phraseLC = phrase.trim().toLowerCase();
	let phraseOptimized = deleteIgnorable(phraseLC);
	let phraseReverse = reversing(phraseOptimized);

	if (phraseOptimized === phraseReverse) {
		return "это палиндром";
	} else {
		return "это не палиндром";
	}

	function deleteIgnorable(s) {
		let str = s;

		for (let i = 0; i < s.length; i++) {
			let character = s[i];

			if (character === 'ё') {
				str = str.replace(character, 'е');
			} else if (character in SYMBOLS_TO_IGNORE) {
				str = str.replace(character, '');
			}
		}
		console.log(str);

		return str;
	}

	function reversing(s) {
		let sReversed = '';

		for (let i = s.length - 1; i >= 0; i--) {
			sReversed += s[i];
		}
		console.log(sReversed);

		return sReversed;
	}
}