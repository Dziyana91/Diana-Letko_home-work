"use strict";

if (isPalindrome(prompt('введите текст'))) {
	alert("это палиндром");
} else { alert("это не палиндром") };


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

	let answer = true;

	for (let i = 0; i < phraseOptimized.length; i++) {

		let startIndex = 0;
		let lastIndex = phraseOptimized.length - 1;

		if (phraseOptimized[startIndex + i] !== phraseOptimized[lastIndex - i]) {
			answer = false;
			break;
		}
	}
	return answer;

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
}