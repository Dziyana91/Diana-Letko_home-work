"use strict";

var formDef1 =
	[
		{ label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
		{ label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
		{ label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
		{ label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
		{
			label: 'Рубрика каталога:', kind: 'combo', name: 'division',
			variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
		},
		{
			label: 'Размещение:', kind: 'radio', name: 'payment',
			variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
		},

		{ label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
		{ label: 'Описание сайта:', kind: 'memo', name: 'description' },
		{ caption: 'Опубликовать', kind: 'submit' },
	];

var formDef2 =
	[
		{ label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
		{ label: 'Имя:', kind: 'longtext', name: 'firstname' },
		{ label: 'Отчество:', kind: 'longtext', name: 'secondname' },
		{ label: 'Возраст:', kind: 'number', name: 'age' },
		{ caption: 'Зарегистрироваться', kind: 'submit' },
	];

function addForm(formContent, formField) {

	let frm = document.forms[formField];
	let formRow = null;

	let lbl = null;
	let inpt = null;
	let optionsArray = null;

	let name = null;
	let itemKind = null;

	for (let item of formContent) {
		formRow = document.createElement('div');
		formRow.className = 'form-row';

		name = item.name;
		itemKind = item.kind;

		if ('label' in item) {
			lbl = document.createElement('label');
			lbl.htmlFor = name;
			lbl.className = 'labels';
			lbl.textContent = item.label;
			formRow.appendChild(lbl);
		};

		if (itemKind === 'combo') {

			inpt = document.createElement('select');
			inpt.id = name;
			inpt.className = itemKind;
			inpt.name = name;

			let selectOption = null;
			optionsArray = item.variants;

			for (let opt of optionsArray) {
				selectOption = document.createElement('option');
				selectOption.value = opt.value;
				selectOption.textContent = opt.text;
				if (opt.text === 'бытовая техника') {
					selectOption.selected = true;
				};
				inpt.appendChild(selectOption);
			};
		} else if (itemKind === 'memo') {

			inpt = document.createElement('textarea');
			inpt.id = name;
			inpt.className = itemKind;
			inpt.name = name;

		} else if (itemKind === 'radio') {

			inpt = document.createElement('div');
			inpt.id = name;
			let radioLbl = null;
			let radioOption = null;
			optionsArray = item.variants;

			for (let opt of optionsArray) {
				radioLbl = document.createElement('label');
				radioLbl.className = 'radio-label';

				radioOption = document.createElement('input');
				radioOption.name = name;
				radioOption.type = 'radio';
				radioOption.value = opt.value;

				let radioLblText = document.createElement('span');
				radioLblText.textContent = opt.text;

				radioLbl.appendChild(radioOption);
				radioLbl.appendChild(radioLblText);
				inpt.appendChild(radioLbl);
			};
		} else if (itemKind === 'submit') {
			inpt = document.createElement('input');
			inpt.type = 'submit';
			inpt.value = item.caption;
		} else {
			inpt = document.createElement('input');
			inpt.id = name;
			inpt.className = itemKind;
			inpt.name = name;
			if (name === 'siteurl') {
				inpt.type = 'url';
			} else if (name === 'email') {
				inpt.type = 'email';
			} else if (itemKind === 'longtext' || itemKind === 'shorttext') {
				inpt.type = 'text';
			} else if (itemKind === 'check') {
				inpt.type = 'checkbox';
				inpt.value = 'yes';
			} else if (itemKind === 'number') {
				inpt.type = 'number';
				inpt.min = 0;
				inpt.step = 1;
			} else {
				console.log('ERROR: cannot create input or set type for input');
			};
		};
		formRow.appendChild(inpt);
		frm.appendChild(formRow);
	};
}