"use strict";

// class InputPrototype {

// 	constructor() {
// 		this.inpt = document.createElement('input');
// 	}

// 	setIdentificators(name, itemKind) {
// 		inpt.id = name;
// 		inpt.className = itemKind;
// 		inpt.name = name;
// 		return this;
// 	}
// }


class InputSelect {
	constructor() {
		this.inpt = document.createElement('select');
	};
	// _inpt = document.createElement('select');

	setIdentificators(name, itemKind) {
		this.inpt.id = name;
		this.inpt.className = itemKind;
		this.inpt.name = name;
		return this;
	}

	addOptions(optionsArray) {
		let selectOption = null;

		for (let opt of optionsArray) {
			selectOption = document.createElement('option');
			selectOption.value = opt.value;
			selectOption.textContent = opt.text;
			if (opt.text === 'бытовая техника') {
				selectOption.selected = true;
			}
			this.inpt.appendChild(selectOption);
		};
		return this;
	}
}

class InputRadio {
	constructor() {
		this.inpt = document.createElement('div');
	};

	setIdentificators(name) {
		inpt.id = name;
		return this;
	}

	addOptions(optionsArray, name, itemKind) {
		let radioLbl = null;
		let radioOption = null;
		// optionsArray = item.variants;

		for (let opt of optionsArray) {
			radioLbl = document.createElement('label');
			radioLbl.className = 'radio-label';

			radioOption = document.createElement('input');
			radioOption.name = name;
			radioOption.type = itemKind;
			radioOption.value = opt.value;

			let radioLblText = document.createElement('span');
			radioLblText.textContent = opt.text;

			radioLbl.appendChild(radioOption);
			radioLbl.appendChild(radioLblText);
			inpt.appendChild(radioLbl);
		};
		return this;
	}
}

class InputTextarea {
	constructor() {
		this.inpt = document.createElement('textarea');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};
}

class InputText {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}

class InputUrl {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}

class InputEmail {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}

class InputCheckbox {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};

	setValue(value) {
		inpt.value = value;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}

class InputNumber {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		inpt.name = name;
		return this;
	};

	setMin(min) {
		inpt.min = min;
		return this;
	}

	setMax(max) {
		inpt.min = max;
		return this;
	}

	setStep(step) {
		inpt.step = step;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}

class InputSubmit {
	constructor() {
		this.inpt = document.createElement('input');
	};

	setIdentificators(name, itemKind) {
		inpt.id = name;
		inpt.className = itemKind;
		// inpt.name = name;
		return this;
	};

	setValue(value) {
		inpt.value = value;
		return this;
	};

	setType(type) {
		inpt.type = type;
		return this;
	};
}