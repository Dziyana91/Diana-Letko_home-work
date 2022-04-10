"use strict";


function setSpeed(n, m) {
	let speed = 0;
	speed = mathRandomDiap(n, m);
	if (speed == 0) {
		speed = setSpeed(n, m);
	}
	return speed;
}

function mathRandomDiap(n, m) {
	return Math.floor(
		Math.random() * (m - n + 1)
	) + n;
}

function playButtonSound() {
	// let sound = document.getElementById('hexRotateSound');
	let musicAndSoundsStatusH = JSON.parse(window.localStorage.getItem('musicAndSounds'));
	if (musicAndSoundsStatusH.sound) {
		buttonClickSound.play();
	}
}

