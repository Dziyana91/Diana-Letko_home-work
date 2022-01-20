"use strict";

class HashStorageClass {

	constructor() {
		this.storage = {};
	};

	addVallue(key, value) {
		this.storage[key] = value;
		return this;
	};

	getValue(key) {
		return this.storage[key];
	};

	deleteValue(key) {
		if (key in this.storage) {
			delete this.storage[key];
			return true;
		} else {
			return false;
		}
	};

	getKeys() {
		return Object.keys(this.storage);
	};
}