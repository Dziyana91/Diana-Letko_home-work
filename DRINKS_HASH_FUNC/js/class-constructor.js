"use strict";

function HashStorageFunc() {
	let self = this;

	self.storage = {};

	self.addVallue = function (key, value) {
		self.storage[key] = value;
		return self;
	}

	self.getValue = function (key) {
		return self.storage[key]
	}

	self.deleteValue = function (key) {

		if (key in self.storage) {
			delete self.storage[key];
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function () {
		let keysList = [];

		for (let n in self.storage) {
			keysList.push(n);
		}
		return keysList;
	}
}