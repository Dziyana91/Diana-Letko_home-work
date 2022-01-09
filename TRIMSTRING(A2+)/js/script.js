"use strict";

alert('*' + stringTrim(prompt('введите текст')) + '*');


function stringTrim(s) {

	let sTrimmed = s;

	while (true) {

		if (sTrimmed[0] === ' ') {
			sTrimmed = sTrimmed.slice(1);
		} else if (sTrimmed[sTrimmed.length - 1] === ' ') {
			sTrimmed = sTrimmed.slice(0, sTrimmed.length - 1);
		} else {
			sTrimmed = sTrimmed;
			break;
		}

	}
	return sTrimmed;
}