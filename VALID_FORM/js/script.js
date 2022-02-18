"use strict";

let formTag = document.forms.INFO;
formTag.addEventListener('submit', validateInfoForm, false);

let developers = formTag.elements.developers;
developers.addEventListener('blur', checkLength, false);
developers.addEventListener('keydown', checkLength, false);
developers.addEventListener('keyup', checkLength, false);

let sitename = formTag.elements.sitename;
sitename.addEventListener('blur', checkLength, false);
sitename.addEventListener('keydown', checkLength, false);
sitename.addEventListener('keyup', checkLength, false);

let siteurl = formTag.elements.siteurl;
siteurl.addEventListener('blur', urlValidation, false);
siteurl.addEventListener('blur', checkLength, false);
siteurl.addEventListener('keydown', checkLength, false);
siteurl.addEventListener('keyup', checkLength, false);

let startdate = formTag.elements.startdate;
startdate.addEventListener('blur', dateValidation, false);

let visitors = formTag.elements.visitors;
visitors.addEventListener('keydown', numberValidation, false);
visitors.addEventListener('keyup', numberValidation, false);
visitors.addEventListener('change', numberValidation, false);
visitors.addEventListener('blur', numberValidation, false);
visitors.addEventListener('keypress', numberCharValidation, false);

let email = formTag.elements.email;
email.addEventListener('blur', emailValidation, false);
email.addEventListener('keydown', emailLength, false);
email.addEventListener('keyup', emailLength, false);

let division = formTag.elements.division;
division.addEventListener('change', divisionValidation, false);

let payment = document.getElementById('payment');						// устанавливаем обработчик на div, содержащий radio buttons
payment.addEventListener('change', paymentValidation, false);
payment.addEventListener('click', paymentValidation, false);

let votes = formTag.elements.votes;
votes.addEventListener('change', votesValidation, false);

let description = formTag.elements.description;
description.addEventListener('blur', memoLength, false);
description.addEventListener('keydown', memoLength, false);
description.addEventListener('keyup', memoLength, false);

function checkLength(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value.trim();
	let inputValueLength = self.value.length;
	console.log(inputValueLength);
	let messageText = null;

	if (inputValue == '' || inputValue == null) {
		messageText = 'поле не может быть пустым, введите данные';
		addMessageField(self, messageText);
	} else if (inputValueLength > 10) {										//* по условию должно быть 50
		messageText = 'максимальное количество знаков - 50';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function urlValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value.trim();
	let inputValueStart = inputValue.substr(0, 7);
	let inputValueLength = inputValue.length;
	let messageText = null;

	if (inputValueStart !== 'http://') {
		messageText = 'введите URL, начинающийся с http://';
		addMessageField(self, messageText);
	} else if (inputValueLength < 8) {
		messageText = 'введите действительный URL';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function dateValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value;
	console.log('date ' + inputValue);

	let today = new Date();
	let todayYear = today.getFullYear();
	let todayMonth = formatMonth(today.getMonth())
	let todayDate = formatDate(today.getDate());
	let todayFormated = `${todayYear}-${todayMonth}-${todayDate}`;
	console.log('today ' + todayFormated);

	let messageText = null;

	if (inputValue == '' || inputValue == null) {
		messageText = 'поле не может быть пустым, введите данные';
		addMessageField(self, messageText);
	} else if (inputValue > todayFormated) {
		messageText = 'дата не может быть больше сегодняшней';
		addMessageField(self, messageText);
	} else if (inputValue <= '2014-12-31') {
		messageText = 'мы публикуем информацию о сайтах, запущенных с 2015 года';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function numberValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value;
	console.log('number: ' + inputValue);
	let inputLength = inputValue.length;
	let firstNum = inputValue[0];
	let messageText = null;

	if (inputValue == '' || inputValue == null) {
		messageText = 'поле не может быть пустым, введите данные';
		addMessageField(self, messageText);
	} else if (inputLength > 1 && firstNum == 0) {
		messageText = 'удалите 0 в начале числа';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function numberCharValidation(EO) {
	EO = EO || window.event;
	let keyCode = EO.code;
	// console.log('key code ' + keyCode);
	if (keyCode == 'KeyE' || keyCode == 'Period' || keyCode == 'Slash') {
		EO.preventDefault();
	}
}

function emailValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value.trim();
	let atSymbolCount = 0;

	for (let i = 0; i < inputValue.length; i++) {
		let char = inputValue[i];
		if (char == '@') {
			atSymbolCount++;
		}
	}

	let messageText = null;

	if (inputValue == '' || inputValue == null) {
		messageText = 'поле не может быть пустым, введите данные';
		addMessageField(self, messageText);
	} else if (atSymbolCount == 0 || atSymbolCount > 1) {
		messageText = 'введите существующий e-mail, например example@gmail.com';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function emailLength(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValueLength = self.value.length;
	let messageText = null;

	if (inputValueLength > 10) {										//* по условию должно быть 30
		messageText = 'максимальное количество знаков - 30';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function divisionValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value;
	console.log('division: ' + inputValue);
	let messageText = null;

	if (inputValue == 1) {
		messageText = 'извините, рубрика БЫТОВАЯ ТЕХНИКА недоступна в настоящее время';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function paymentValidation(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = EO.target.value;						// определяем value выбранного radio button
	console.log('payment type: ' + inputValue);
	let messageText = null;

	if (inputValue == 1) {
		messageText = 'извините, бесплатное размещение недоступно в настоящее время';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function votesValidation(EO) {
	EO = EO || window.event;
	let self = this;
	let messageText = null;

	if (self.checked == false) {
		messageText = 'Вы должны разрешить отзывы, чтобы внести сайт в каталог';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function memoLength(EO) {
	EO = EO || window.event;
	let self = this;

	let inputValue = self.value.trim();
	let inputValueLength = self.value.length;
	let messageText = null;

	if (inputValue == '' || inputValue == null) {
		messageText = 'поле не может быть пустым, введите данные';
		addMessageField(self, messageText);
	} else if (inputValueLength > 10) {									//* по условию должно быть 250
		messageText = 'максимальное количество знаков - 250';
		addMessageField(self, messageText);
	} else {
		deleteMessageField(self);
	}
}

function validateInfoForm(EO) {
	EO = EO || window.event;

	try {
		let formTag = document.forms.INFO;

		let developers = formTag.elements.developers;
		let developersLength = developers.value.length;
		let developersValue = developers.value.trim();

		let sitename = formTag.elements.sitename;
		let sitenameLength = sitename.value.length;
		let sitenameValue = sitename.value.trim();

		let siteurl = formTag.elements.siteurl;
		let siteurlLength = siteurl.value.length;
		let siteurlValue = siteurl.value.trim();
		let siteurlValueStart = siteurlValue.substr(0, 7);
		let siteurlValueLength = siteurlValue.length;

		let startdate = formTag.elements.startdate;
		let startdateValue = startdate.value;
		let today = new Date();
		let todayYear = today.getFullYear();
		let todayMonth = formatMonth(today.getMonth())
		let todayDate = formatDate(today.getDate());
		let todayFormated = `${todayYear}-${todayMonth}-${todayDate}`;

		let visitors = formTag.elements.visitors;
		let visitorsValue = visitors.value;
		let firstNum = visitorsValue[0];

		let email = formTag.elements.email;
		let emailLength = email.value.length;
		let emailValue = email.value.trim();
		let atSymbolCount = 0;
		for (let i = 0; i < emailValue.length; i++) {
			let char = emailValue[i];
			if (char == '@') {
				atSymbolCount++;
			}
		}

		let division = formTag.elements.division;
		let divisionValue = division.value.trim();

		let payment = document.getElementById('payment');
		let paymentRadios = formTag.elements.payment;
		let paymentValue = paymentRadios.value;
		let paymentScroll = document.getElementById('paymentScroll');

		let votes = formTag.elements.votes;

		let description = formTag.elements.description;
		let descriptionLength = description.value.length;
		let descriptionValue = description.value.trim();

		let messageText = null;

		if (descriptionValue == '' || descriptionValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(description, messageText);
			description.focus();
			EO.preventDefault();
		} else if (descriptionLength > 10) {									//* по условию должно быть 250
			EO.preventDefault();
		}

		if (votes.checked == false) {
			messageText = 'Вы должны разрешить отзывы, чтобы внести сайт в каталог';
			addMessageField(votes, messageText);
			votes.focus();
			EO.preventDefault();
		}

		if (paymentValue == '') {
			messageText = 'выберите вариант размещения';
			addMessageField(payment, messageText);
			paymentScroll.scrollIntoView();
			EO.preventDefault();
		} else if (paymentValue == 1) {
			EO.preventDefault();
		}

		if (divisionValue == 1) {
			messageText = 'извините, рубрика БЫТОВАЯ ТЕХНИКА недоступна в настоящее время';
			addMessageField(division, messageText);
			division.focus();
			EO.preventDefault();
		}

		if (emailValue == '' || emailValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(email, messageText);
			email.focus();
			EO.preventDefault();
		} else if (atSymbolCount == 0 || atSymbolCount > 1) {
			EO.preventDefault();
		} else if (emailLength > 10) {								//* по условию должно быть 30
			EO.preventDefault();
		}

		if (visitorsValue == '' || visitorsValue == null) {
			console.log('введите количество посетителей')
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(visitors, messageText);
			visitors.focus();
			EO.preventDefault();
		} else if (visitorsValue.length > 1 && firstNum == 0) {
			EO.preventDefault();
		}

		if (startdateValue == '' || startdateValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(startdate, messageText);
			startdate.focus();
			EO.preventDefault();
		} else if (inputValue > todayFormated) {
			EO.preventDefault();
		} else if (inputValue <= '2014-12-31') {
			EO.preventDefault();
		}

		if (siteurlValue == '' || siteurlValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(siteurl, messageText);
			siteurl.focus();
			EO.preventDefault();
		} else if (siteurlValueStart !== 'http://') {
			EO.preventDefault();
		} else if (siteurlValueLength < 8) {
			EO.preventDefault();
		} else if (siteurlLength > 10) {					//* по условию должно быть 50
			EO.preventDefault();
		}

		if (sitenameValue == '' || sitenameValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(sitename, messageText);
			sitename.focus();
			EO.preventDefault();
		} else if (sitenameLength > 10) {					//* по условию должно быть 50
			EO.preventDefault();
		}

		if (developersValue == '' || developersValue == null) {
			messageText = 'поле не может быть пустым, введите данные';
			addMessageField(developers, messageText);
			developers.focus();
			EO.preventDefault();
		} else if (developersLength > 10) {						//* по условию должно быть 50
			EO.preventDefault();
		}
	}

	catch (ex) {
		alert('Проверьте корректность введенных данных');
		EO.preventDefault();
	};
}

function addMessageField(tag, messageText) {
	let formRow = tag.parentNode;
	let messageField = document.createElement('div');
	messageField.className = 'errorMessage';

	let errorMessage = document.createTextNode(messageText);
	messageField.appendChild(errorMessage);

	let messageFieldsArray = formRow.getElementsByClassName('errorMessage');
	console.log(messageFieldsArray);

	if (messageFieldsArray.length == 0) {
		formRow.appendChild(messageField);
		setRight(messageField, formRow);
	} else {
		let currentMessage = messageFieldsArray[0];
		console.log(currentMessage.firstChild)
		formRow.replaceChild(messageField, currentMessage);
		setRight(messageField, formRow);
	}
}

function deleteMessageField(tag) {
	let formRow = tag.parentNode;
	let messageFieldsArray = formRow.getElementsByClassName('errorMessage');
	if (messageFieldsArray.length > 0) {
		for (let remove of messageFieldsArray) {
			formRow.removeChild(remove);
		}
	}
}

function setRight(messageTag, rowTag) {
	let messageTagWidth = messageTag.offsetWidth;
	let rowTagWidth = rowTag.offsetWidth;
	let childTags = rowTag.children;
	let labelWidth = childTags[0].offsetWidth;
	let inputWidth = childTags[1].offsetWidth;
	let rowTagContentWidth = labelWidth + inputWidth;
	let emptySpace = rowTagWidth - rowTagContentWidth;
	if (emptySpace < 0) {
		messageTag.style.right = - messageTagWidth - 10 + 'px';
	} else {
		messageTag.style.right = emptySpace - messageTagWidth - 10 + 'px';
	}
}

function formatMonth(monthNumber) {
	let month = null;
	if (monthNumber <= 8) {
		month = `0${monthNumber + 1}`;
	} else {
		month = monthNumber + 1;
	}
	return month;
}

function formatDate(dateNumber) {
	let date = null;
	if (dateNumber <= 9) {
		month = `0${dateNumber}`;
	} else {
		date = dateNumber;
	}
	return date;
}