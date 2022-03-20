"use strict";


window.onload = function () {
	let formDef1 = null;
	let formDef2 = null;

	getFormContent();

	function getFormContent() {

		if (formDef1 === null) {
			$.ajax("https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json",
				{ type: 'GET', dataType: 'json', success: function (data) { formDef1 = data; getFormContent() }, error: errorHandler }
			);
			return;
		}

		if (formDef2 === null) {
			$.ajax("https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json",
				{ type: 'GET', dataType: 'json', success: function (data) { formDef2 = data; getFormContent() }, error: errorHandler }
			);
			return;
		}

		createForm(formDef1, 'formField1');
		createForm(formDef2, 'formField2');
	}
};


function createForm(formContent, formField) {

	let wrapper = document.getElementById('wrapper');
	let formContainer = document.createElement('div');

	let frm = document.createElement('form');
	frm.name = formField;
	frm.action = 'https://fe.it-academy.by/TestForm.php';
	frm.method = 'get';

	//* лучше создать DIV, в него подсоединить строки, а потом прикрепить один элемент к форме
	let container = document.createElement('div');
	container.className = 'form-wrapper';

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

		switch (true) {
			case itemKind === 'combo':
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
					}
					inpt.appendChild(selectOption);
				};
				break;
			case itemKind === 'memo':
				inpt = document.createElement('textarea');
				inpt.id = name;
				inpt.className = itemKind;
				inpt.name = name;
				break;
			case itemKind === 'radio':
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
					radioOption.type = itemKind;
					radioOption.value = opt.value;

					let radioLblText = document.createElement('span');
					radioLblText.textContent = opt.text;

					radioLbl.appendChild(radioOption);
					radioLbl.appendChild(radioLblText);
					inpt.appendChild(radioLbl);
				};
				break;
			case itemKind === 'submit':
				inpt = document.createElement('input');
				inpt.type = 'submit';
				inpt.value = item.caption;
				break;
			default:
				inpt = document.createElement('input');
				inpt.id = name;
				inpt.className = itemKind;
				inpt.name = name;
				switch (true) {
					case name === 'siteurl':
						inpt.type = 'url';
						break;
					case name === 'email':
						inpt.type = 'email';
						break;
					case itemKind === 'longtext' || itemKind === 'shorttext':
						inpt.type = 'text';
						break;
					case itemKind === 'check':
						inpt.type = 'checkbox';
						inpt.value = 'yes';
						break;
					case itemKind === 'number':
						inpt.type = 'number';
						inpt.min = 0;
						inpt.step = 1;
						break;
					default:
						console.log('ERROR: cannot create input or set type for input');
				};
		};
		formRow.appendChild(inpt);
		container.appendChild(formRow);
	};
	frm.appendChild(container);
	formContainer.appendChild(frm);
	wrapper.appendChild(formContainer);
};

function errorHandler(jqXHR, statusStr, errorStr) {
	alert(statusStr + ' ' + errorStr);
}
