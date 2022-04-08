"use strict";

function settingsPage() {
	let settingsField = document.createElement('div');
	settingsField.id = 'settingsField';

	let musicBtn = document.createElement('div');
	musicBtn.id = 'musicBtn';
	musicBtn.className = 'small-buttons';
	let musicOnIcon = '<i class="fas fa-music"></i>';						// fontawesome icon
	let musicOffIcon = '<i class="fas fa-pause"></i>';						// fontawesome icon

	musicBtn.addEventListener('click', musicStatusUpdate, false);
	musicBtn.addEventListener('touched', musicStatusUpdate, false);

	let soundBtn = document.createElement('div');
	soundBtn.id = 'soundBtn';
	soundBtn.className = 'small-buttons';
	let soundOnIcon = '<i class="fas fa-volume-up"></i>';				// fontawesome icon
	let soundOffIcon = '<i class="fas fa-volume-mute"></i>';			// fontawesome icon

	soundBtn.addEventListener('click', soundStatusUpdate, false);
	soundBtn.addEventListener('touched', soundStatusUpdate, false);

	let data = JSON.parse(window.localStorage.getItem('musicAndSounds'));
	if (!data) {
		musicBtn.innerHTML = musicOnIcon;
		soundBtn.innerHTML = soundOnIcon;
	} else {
		if (data.music) {
			musicBtn.innerHTML = musicOnIcon;
		} else {
			musicBtn.innerHTML = musicOffIcon;
		}
		if (data.sound) {
			soundBtn.innerHTML = soundOnIcon;
		} else {
			soundBtn.innerHTML = soundOffIcon;
		}
	};

	settingsField.appendChild(musicBtn);
	settingsField.appendChild(soundBtn);
	return settingsField;
}

let musicAndSoundsStatusH = null;

function checkMusicAndSoundsStatus() {

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

	// сразу проиграть музыку
	if (musicAndSoundsStatusH.music) {
		fontMusic.play();
	}
	return musicAndSoundsStatusH;
}

function musicStatusUpdate(eo) {
	eo = eo || window.event;
	eo.preventDefault();
	let self = this;

	let fontMusic = document.getElementById('fontMusic');
	let musicOnIcon = '<i class="fas fa-music"></i>';						// fontawesome icon
	let musicOffIcon = '<i class="fas fa-pause"></i>';						// fontawesome icon

	if (musicAndSoundsStatusH.music) {
		fontMusic.pause();
		// music = false;
		musicAndSoundsStatusH.music = false;
		self.innerHTML = musicOffIcon;
	} else {
		fontMusic.play();
		// music = true;
		musicAndSoundsStatusH.music = true;
		self.innerHTML = musicOnIcon;
	}

	localStorage['musicAndSounds'] = JSON.stringify(musicAndSoundsStatusH);
}

function soundStatusUpdate(eo) {
	eo = eo || window.event;
	eo.preventDefault();
	let self = this;

	// let fontMusic = document.getElementById('fontMusic');
	let soundOnIcon = '<i class="fas fa-volume-up"></i>';				// fontawesome icon
	let soundOffIcon = '<i class="fas fa-volume-mute"></i>';			// fontawesome icon

	if (musicAndSoundsStatusH.sound) {
		// fontMusic.pause();
		musicAndSoundsStatusH.sound = false;
		self.innerHTML = soundOffIcon;
	} else {
		// fontMusic.play();
		musicAndSoundsStatusH.sound = true;
		self.innerHTML = soundOnIcon;
	}

	localStorage['musicAndSounds'] = JSON.stringify(musicAndSoundsStatusH);
}