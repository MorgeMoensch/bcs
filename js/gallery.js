const IMAGES_BASE_PATH = "moin";

function setupDOM(numberOfImages, eventName) {
	var anchor = document.getElementsByTagName('main')[0];
	for(var i = 1; i < numberOfImages + 1; i++) {
		let image_container = document.createElement('img')
		image_container.setAttribute("src", `${IMAGES_BASE_PATH}/thumbnails/${eventName}/${i}`);
		image_container.setAttribute("src", `../../BCS-old/gallery/thumbs/night/2017/img (${i}).jpg`);
		image_container.setAttribute('onclick', `maximizeImage(${i}, '${eventName.toString()}')`);
		anchor.appendChild(image_container);
	};
}

function maximizeImage(number, event) {
	var placeholder = document.getElementById('maximizedImagePlaceholder');
	placeholder.setAttribute("src", `${IMAGES_BASE_PATH}/full/${event}/${number}`);
	placeholder.setAttribute("src", `../../BCS-old/gallery/night/2017/img (${number}).jpg`);
	placeholder.setAttribute('class', '');
}

function minimizeImage() {
	var maximizedImage = document.getElementById('maximizedImagePlaceholder');
	maximizedImage.setAttribute('class', 'hidden');
}