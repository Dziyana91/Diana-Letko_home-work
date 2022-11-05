"use strict";

let array = [5, 7,
	[4, [2], 8, [1, 3], 2],
	[9, []],
	1, 8
];

console.log(treeSum(array));

function treeSum(arr) {
	let sum = 0;

	for (let n = 0; n < arr.length; n++) {

		// * лучший вариант кода
		if (typeof (arr[n]) == 'number') {
			sum = sum + arr[n];
		} else {
			sum = sum + treeSum(arr[n]);
		}

		// switch (true) {
		// 	case typeof (arr[n]) == 'number':
		// 		sum += arr[n];
		// 		break;
		// 	case typeof (arr[n]) == 'object':
		// 		sum += treeSum(arr[n]);
		// 		break;
		// 	default:
		// 		sum = sum;
		// }
	}
	return sum;
};