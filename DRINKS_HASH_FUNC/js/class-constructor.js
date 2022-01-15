"use strict";

function HashStorageFunc() {
	let self = this;

	self.addVallue = function (key, value) {
		self[key] = value;
		return self;
	}

	self.getValue = function (key) {
		return self[key]
	}

	self.deleteValue = function (key) {

		if (key in self) {
			delete self[key];
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function () {
		let keysList = [];

		for (let n in self) {

			if (typeof (self[n]) == 'function') {
				continue
			} else {
				keysList.push(n);
			}
		}
		return keysList;
	}
}