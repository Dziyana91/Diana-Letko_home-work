"use strict";

window.addEventListener('load', dragdrop, false);

function dragdrop(e) {
	e = e || window.event;

	let images = document.getElementsByTagName('IMG');

	let positionX = 0;
	let positionY = 0;
	let shiftX = 0;
	let shiftY = 0;
	let index = 0;

	for (let i = 0; i < images.length; i++) {
		let imgElem = images[i];

		let imgPadding = window.getComputedStyle(imgElem).padding;
		let imgPaddingArray = imgPadding.split(' ');
		let paddingNumbers = imgPaddingArray.map(p => parseFloat(p));

		let padTop = paddingNumbers[0];
		let padLeft = 0;

		if (paddingNumbers.length == 1) {
			padLeft = paddingNumbers[0];
		} else if (paddingNumbers.length == 2 || paddingNumbers.length == 3) {
			padLeft = paddingNumbers[1];
		} else {
			padLeft = paddingNumbers[3];
		}

		positionX = imgElem.offsetLeft + padLeft;
		positionY = imgElem.offsetTop + padTop;

		imgElem.style.left = positionX + 'px';
		imgElem.style.top = positionY + 'px';
		imgElem.style.padding = 0;
		imgElem.style.zIndex = index;
		imgElem.addEventListener('mousedown', getImg, false);
		imgElem.addEventListener('mouseover', () => imgElem.style.cursor = 'grab', false);
		imgElem.addEventListener('mouseup', dropImg, false);
	}

	for (let i = 0; i < images.length; i++) {
		let imgElem = images[i];
		imgElem.style.position = 'absolute';
	}

	function getImg(eo) {
		eo = eo || window.event;
		eo.preventDefault();
		positionX = this.offsetLeft;
		positionY = this.offsetTop;
		shiftX = eo.pageX - positionX;
		shiftY = eo.pageY - positionY;
		index++;
		this.style.zIndex = index;
		this.style.cursor = 'grabbing';
		this.addEventListener('mousemove', dragImg, false);
	}

	function dropImg(eo) {
		eo = eo || window.event;
		eo.preventDefault();
		this.style.cursor = 'grab';
		this.removeEventListener('mousemove', dragImg, false);
	}

	function dragImg(eo) {
		eo = eo || window.event;
		eo.preventDefault();
		this.style.left = (eo.pageX - shiftX) + 'px';
		this.style.top = (eo.pageY - shiftY) + 'px';
	}

}