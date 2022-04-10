"use strict";

function settingsPage() {
	let settingsField = document.createElement('div');
	settingsField.id = 'settingsField';

	let musicBtn = document.createElement('div');
	musicBtn.id = 'musicBtn';
	musicBtn.className = 'small-buttons';
	let musicOnIcon = '<i class="fas fa-music"></i>';						// fontawesome icon
	let musicOffIcon = '<i class="fas fa-pause"></i>';						// fontawesome icon
	let musicTextField = document.createElement('div');
	musicTextField.id = 'musicTextField';
	musicTextField.className = 'settings-text-field';

	let soundBtn = document.createElement('div');
	soundBtn.id = 'soundBtn';
	soundBtn.className = 'small-buttons';
	let soundOnIcon = '<i class="fas fa-volume-up"></i>';				// fontawesome icon
	let soundOffIcon = '<i class="fas fa-volume-mute"></i>';			// fontawesome icon
	let soundTextField = document.createElement('div');
	soundTextField.id = 'soundTextField';
	soundTextField.className = 'settings-text-field';

	let musicAndSoundsStatusH = null;

	// проверим локальные настройки музыки и звука 
	let data = JSON.parse(window.localStorage.getItem('musicAndSounds'));
	if (data) {
		musicAndSoundsStatusH = data;
	} else {
		musicAndSoundsStatusH = {
			music: true,
			sound: true
		};
	}

	if (musicAndSoundsStatusH.music) {
		musicBtn.innerHTML = musicOnIcon;
		musicTextField.innerHTML = 'музыка включена';
	} else {
		musicBtn.innerHTML = musicOffIcon;
		musicTextField.innerHTML = 'музыка выключена';
	}
	if (musicAndSoundsStatusH.sound) {
		soundBtn.innerHTML = soundOnIcon;
		soundTextField.innerHTML = 'звуки включены';
	} else {
		soundBtn.innerHTML = soundOffIcon;
		soundTextField.innerHTML = 'звуки выключены';
	};

	musicBtn.addEventListener('click', () => { playButtonSound(); musicStatusUpdate(musicAndSoundsStatusH, musicBtn) }, false);
	musicBtn.addEventListener('touched', () => { playButtonSound(); musicStatusUpdate(musicAndSoundsStatusH, musicBtn) }, false);
	soundBtn.addEventListener('click', () => { playButtonSound(); soundStatusUpdate(musicAndSoundsStatusH, soundBtn) }, false);
	soundBtn.addEventListener('touched', () => { playButtonSound(); soundStatusUpdate(musicAndSoundsStatusH, soundBtn) }, false);

	settingsField.appendChild(musicBtn);
	settingsField.appendChild(musicTextField);
	settingsField.appendChild(soundBtn);
	settingsField.appendChild(soundTextField);
	return settingsField;
}

// глобальные переменные - звуки и музыка
let fontMusic = new Audio();
fontMusic.src = 'media/fontMusic.wav';
fontMusic.loop = true;
let buttonClickSound = new Audio();
buttonClickSound.src = 'media/buttonClickSound.wav';
let hexRotateSound = new Audio();
hexRotateSound.src = 'media/hexRotateSound.wav';

document.body.addEventListener('mousemove', checkMusicAndSoundsStatus, false);

function checkMusicAndSoundsStatus() {
	let musicAndSoundsStatusH = null;
	// проверим локальные настройки музыки и звука 
	let data = JSON.parse(window.localStorage.getItem('musicAndSounds'));
	if (data) {
		musicAndSoundsStatusH = data;
	} else {
		musicAndSoundsStatusH = {
			music: true,
			sound: true
		};
	}

	// ! не работает, ошибка - play() failed because the user didn't interact with the document first
	// if (musicAndSoundsStatusH.music) {
	// 	// fontMusic.muted = true;
	// 	fontMusic.play();
	// }
	document.body.removeEventListener('mousemove', checkMusicAndSoundsStatus, false);

	// ! не работает - удаляются не все теги audio
	// let wrapper = document.getElementById('wrapper');
	// let buttonClickSound = document.createElement('AUDIO');
	// buttonClickSound.src = 'media/buttonClickSound.wav';
	// buttonClickSound.id = 'buttonClickSound';
	// buttonClickSound.className = 'sounds';
	// let hexRotateSound = document.createElement('AUDIO');
	// hexRotateSound.src = 'media/hexRotateSound.wav';
	// hexRotateSound.id = 'hexRotateSound';
	// hexRotateSound.className = 'sounds';

	// if (musicAndSoundsStatusH.sound) {
	// 	wrapper.appendChild(buttonClickSound);
	// 	wrapper.appendChild(hexRotateSound);
	// }

}

function musicStatusUpdate(musicAndSoundsStatusH, button) {

	let musicTextField = document.getElementById('musicTextField');
	let musicOnIcon = '<i class="fas fa-music"></i>';						// fontawesome icon
	let musicOffIcon = '<i class="fas fa-pause"></i>';						// fontawesome icon

	if (musicAndSoundsStatusH.music) {
		fontMusic.pause();
		// fontMusic.muted = true;
		musicAndSoundsStatusH.music = false;
		button.innerHTML = musicOffIcon;
		musicTextField.innerHTML = 'музыка выключена';
	} else {
		fontMusic.play();
		// fontMusic.muted = false;
		musicAndSoundsStatusH.music = true;
		button.innerHTML = musicOnIcon;
		musicTextField.innerHTML = 'музыка включена';
	}

	localStorage['musicAndSounds'] = JSON.stringify(musicAndSoundsStatusH);
}

function soundStatusUpdate(musicAndSoundsStatusH, button) {

	let soundTextField = document.getElementById('soundTextField');
	let soundOnIcon = '<i class="fas fa-volume-up"></i>';				// fontawesome icon
	let soundOffIcon = '<i class="fas fa-volume-mute"></i>';			// fontawesome icon

	// let wrapper = document.getElementById('wrapper');
	// let buttonClickSound = document.createElement('AUDIO');
	// buttonClickSound.src = 'media/buttonClickSound.wav';
	// buttonClickSound.id = 'buttonClickSound';
	// buttonClickSound.className = 'sounds';
	// let hexRotateSound = document.createElement('AUDIO');
	// hexRotateSound.src = 'media/hexRotateSound.wav';
	// hexRotateSound.id = 'hexRotateSound';
	// hexRotateSound.className = 'sounds';

	if (musicAndSoundsStatusH.sound) {
		musicAndSoundsStatusH.sound = false;
		button.innerHTML = soundOffIcon;
		soundTextField.innerHTML = 'звуки выключены';
		// let sounds = wrapper.getElementsByClassName('sounds');
		// console.log(sounds);
		// ! не работает - удаляются не все теги audio
		// for (let i = 0; i < sounds.length; i++) {
		// 	wrapper.removeChild(sounds[i]);
		// }
	} else {
		musicAndSoundsStatusH.sound = true;
		button.innerHTML = soundOnIcon;
		soundTextField.innerHTML = 'звуки включены';
		// wrapper.appendChild(buttonClickSound);
		// wrapper.appendChild(hexRotateSound);
	}

	localStorage['musicAndSounds'] = JSON.stringify(musicAndSoundsStatusH);
}