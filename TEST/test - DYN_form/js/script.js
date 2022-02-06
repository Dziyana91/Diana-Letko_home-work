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
			optionsArray = item.variants;
			inpt = new InputSelect;
			inpt.setIdentificators(name, itemKind).addOptions(optionsArray);
			console.log(inpt);
			formRow.appendChild(inpt);
		}

		// switch (true) {
		// 	case itemKind === 'combo':
		// 		optionsArray = item.variants;
		// 		inpt = new InputSelect;
		// 		inpt.setIdentificators(name, itemKind).addOptions(optionsArray);
		// 		break;
		// 	case itemKind === 'memo':
		// 		inpt = new InputTextarea;
		// 		inpt.setIdentificators(name, itemKind);
		// 		break;
		// 	case itemKind === 'radio':
		// 		optionsArray = item.variants;
		// 		inpt = new InputRadio;
		// 		inpt.setIdentificators(name).addOptions(optionsArray);
		// 		break;
		// 	case name === 'siteurl':
		// 		inpt = new InputUrl;
		// 		inpt.setIdentificators(name, itemKind).setType('url');
		// 		break;
		// 	case name === 'email':
		// 		inpt = new ItemEmail;
		// 		inpt.setIdentificators(name, itemKind).setType('email');
		// 		break;
		// 	case itemKind === 'longtext' || itemKind === 'shorttext':
		// 		inpt = new InputText;
		// 		inpt.setIdentificators(name, itemKind).setType('text');
		// 		break;
		// 	case itemKind === 'check':
		// 		inpt = new InputCheckbox;
		// 		inpt.setIdentificators(name, itemKind).setType('checkbox').setValue('yes');
		// 		break;
		// 	case itemKind === 'number':
		// 		inpt = new InputNumber;
		// 		inpt.setIdentificators(name, itemKind).setType('number').setMin(0).setStep(1);
		// 		break;
		// 	case itemKind === 'submit':
		// 		inpt = new InputSubmit;
		// 		inpt.setIdentificators(name, itemKind).setType('submit').setValue(item.caption);
		// 		break;
		// 	default:
		// 		console.log('ERROR: cannot create input or set type for input');
		// };
	};
	// formRow.appendChild(inpt);
	frm.appendChild(formRow);
};

