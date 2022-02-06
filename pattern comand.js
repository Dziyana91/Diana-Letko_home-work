"use strict";

class Test1 {
	constructor() {
		this.storage = {};
	};

	calculate() {
		console.log(1);
	}
}

class Test2 {
	constructor() {
		this.storage = {};
	};

	calculate() {
		console.log(2);
	}
}

class Test3 {
	constructor() {
		this.storage = {
			denis: new Test1(),
			diana: new Test2()
		};
	};

	getTest(b) {
		return this.storage[b];
	}
}

var abc = new Test3;

var cba = abc.getTest('diana');
cba.calculate();