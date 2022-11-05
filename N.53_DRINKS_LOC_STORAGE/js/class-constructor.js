"use strict";

class LocStorageClass {

	constructor(storageType) {
		this.lsName = storageType;
		let data = JSON.parse(window.localStorage.getItem(storageType));
		if (data) {
			this.storage = data;
		} else {
			this.storage = {};
		}
	};

	addVallue(key, value) {
		this.storage[key] = value;
		localStorage[this.lsName] = JSON.stringify(this.storage);
		return this;
	};

	getValue(key) {
		return this.storage[key];
	};

	deleteValue(key) {
		if (key in this.storage) {
			delete this.storage[key];
			localStorage[this.lsName] = JSON.stringify(this.storage);
			return true;
		} else {
			return false;
		}
	};

	getKeys() {
		return Object.keys(this.storage);
	};
}