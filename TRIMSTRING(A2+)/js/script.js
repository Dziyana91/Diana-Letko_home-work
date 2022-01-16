"use strict";

alert('*' + stringTrim(prompt('введите текст')) + '*');


function stringTrim(s) {

	let sLength = s.length;

	let lastCharNo = sLength - 1;			// индекс последнего символа строки

	let spaceCountStart = 0;				// подсчет пробелов с начала
	let spaceCountEnd = 0;					// подсчет пробелов с конца

	for (let i = 0; s[i] === ' '; i++) {
		spaceCountStart++;
	}

	for (let i = 0; s[lastCharNo - i] === ' '; i++) {
		spaceCountEnd++;
	}

	let sTrimmed = s.slice(spaceCountStart, sLength - spaceCountEnd);	// если в конце нет пробелов, то обрезается до +1 несуществующего символа в конце и последний символ не удаляется

	return sTrimmed;
}