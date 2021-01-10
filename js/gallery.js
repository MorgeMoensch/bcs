const IMAGES_BASE_PATH = "moin";
var current_image;
var number_of_images;
var event;
var is_maximized = false;

function setupGallery(numberOfImages, eventName) {
	this.number_of_images = numberOfImages;
	setupDOM(numberOfImages, eventName);
	setupOnKeyPressed();
}

function setupDOM(numberOfImages, eventName) {
	this.event = eventName;
	var anchor = document.getElementById('gallery-grid');
	for (var i = 1; i < numberOfImages + 1; i++) {
		let image_container = document.createElement('img')
		image_container.setAttribute("src", `${IMAGES_BASE_PATH}/thumbnails/${eventName}/${i}`);
		image_container.setAttribute("src", `../../BCS-old/gallery/thumbs/night/2017/img (${i}).jpg`);
		image_container.setAttribute('onclick', `maximizeImage(${i}, '${eventName.toString()}')`);
		anchor.appendChild(image_container);
	};


}

function setupOnKeyPressed() {
	document.addEventListener('keydown', event => {
		if (is_maximized) {
			if (event.key === 'Escape') {
				minimizeImage();
			}

			// Navigate through maximized image with arrows. Prevent, when no more image is.
			if (event.key === 'ArrowRight' && this.current_image < this.number_of_images) {
				maximizeImage(this.current_image + 1)
			}

			if (event.key === 'ArrowLeft' && this.current_image > 1) {
				maximizeImage(this.current_image - 1)
			}
		}
	});
}

function maximizeImage(number) {
	this.current_image = number;
	var placeholder = document.getElementById('maximizedImagePlaceholder');
	placeholder.setAttribute("src", `${IMAGES_BASE_PATH}/full/${this.event}/${number}`);
	placeholder.setAttribute("src", `../../BCS-old/gallery/night/2017/img (${number}).jpg`);
	placeholder.setAttribute('class', '');

	var wrapper = document.getElementById('maximizedImageWrapper');
	wrapper.setAttribute('class', '');
	this.is_maximized = true;

	// Hide Arrows if no more image is available in this direction.
	if (number == 1) {
		setVisibilityTo(false, 'gallery-nav-left');
	} else {
		setVisibilityTo(true, 'gallery-nav-left');
	}

	if (number == this.number_of_images) {
		setVisibilityTo(false, 'gallery-nav-right');
	} else {
		setVisibilityTo(true, 'gallery-nav-right');
	}
}

function minimizeImage() {
	var maximizedImage = document.getElementById('maximizedImagePlaceholder');
	maximizedImage.setAttribute("src", "")
	maximizedImage.setAttribute('class', 'hidden');

	var wrapper = document.getElementById('maximizedImageWrapper');
	wrapper.setAttribute('class', 'hidden');
	this.is_maximized = false;
}

function showPreviousImage() {
	var newImageNumber = current_image - 1;
	maximizeImage(newImageNumber, event);
}

function showNextImage() {
	var newImageNumber = current_image + 1;
	maximizeImage(newImageNumber, event);
}

function setVisibilityTo(visiblity, id) {
	if (visiblity) {
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.add('hidden');
	}
}