"use strict";

if (isPalindrome(prompt('введите текст'))) {
	alert("это палиндром");
} else { alert("это не палиндром") };


function isPalindrome(phrase) {

	let cleanStr = clearString(phrase);
	console.log('cleanStr: ' + cleanStr);

	let count = 0;

	let startIndex = 0;
	let lastIndex = cleanStr.length - 1;

	let answer = null;

	palindromeTest(cleanStr);

	function palindromeTest(str) {
		count++

		if (str[startIndex] !== str[lastIndex]) {
			console.log('answer: false');
			answer = false;
			return;
		} else if (lastIndex - startIndex == 2 || lastIndex - startIndex == 1) {		//проверяем дошли ли до середины
			console.log('we are in the middle');
			answer = true;
			return;
		} else {
			startIndex++;
			lastIndex--;
			// console.log(`start index - ${startIndex} last index - ${lastIndex}`);
			palindromeTest(cleanStr);
		}
	}

	console.log(`function run ${count} times`);
	return answer;
}

function clearString(str) {

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

	let cleanStr = str.trim().toLowerCase();

	for (let i = 0; i < str.length; i++) {
		let character = str[i];

		if (character === 'ё') {
			cleanStr = cleanStr.replace(character, 'е');
		} else if (character in SYMBOLS_TO_IGNORE) {
			cleanStr = cleanStr.replace(character, '');
		}
	}
	return cleanStr;
}