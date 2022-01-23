"use strict";

alert('*' + stringTrim(prompt('введите текст')) + '*');

function stringTrim(s) {

	let sLength = s.length;

	let lastCharNo = sLength - 1;			// индекс последнего символа строки

	let spaceCountStart = 0;				// подсчет пробелов с начала
	let spaceCountEnd = 0;					// подсчет пробелов с конца
	let sTrimmed = null;

	for (let i = 0; s[i] === ' '; i++) {
		spaceCountStart++;
	}

	console.log(spaceCountStart + ' - пробелов в начале строки');

	if (spaceCountStart == sLength) {
		console.log('строка состоит только из пробелов');
		sTrimmed = '';
		return sTrimmed;
	}

	for (let i = 0; s[lastCharNo - i] === ' '; i++) {
		spaceCountEnd++;
	}

	console.log(spaceCountEnd + ' - пробелов в конце строки');

	if (spaceCountStart == 0 && spaceCountEnd == 0) {
		console.log('в начале и конце строки нет пробелов');
		return s;
	}

	sTrimmed = s.slice(spaceCountStart, sLength - spaceCountEnd);	// если в конце нет пробелов, то обрезается до +1 несуществующего символа в конце и последний символ не удаляется

	return sTrimmed;
}