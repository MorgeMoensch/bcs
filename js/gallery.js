const IMAGES_BASE_PATH = "moin";
let current_image;
let number_of_images;
let event;
let is_maximized = false;

function setupGallery(numberOfImages, eventName) {
	this.number_of_images = numberOfImages;
	setupDOM(numberOfImages, eventName);
	setupOnKeyPressed();

	handleWebPSupport();
}

function setupDOM(eventName) {
	this.event = eventName;
	let anchor = document.getElementById('gallery-grid');
	for (let i = 1; i < this.number_of_images + 1; i++) {
		let image_container = document.createElement('img')
		//image_container.setAttribute("src", `${IMAGES_BASE_PATH}/thumbnails/${eventName}/${i}`);
		//image_container.setAttribute("src", `../../BCS-old/gallery/thumbs/night/2017/img (${i}).jpg`);
		image_container.setAttribute("src", `https://bcschuepfen.ch/gallery/thumbs/night/2017/img (${i}).jpg`);
		image_container.setAttribute('onclick', `maximizeImage(${i}, '${eventName.toString()}')`);
		anchor.appendChild(image_container);
	}

	// Possible other solution:
	// Use 3+ Cols, split up all the images due to their index on to separate cols. Similarly how
	// unsplash solves it.
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
	let placeholder = document.getElementById('maximizedImagePlaceholder');
	//placeholder.setAttribute("src", `${IMAGES_BASE_PATH}/full/${this.event}/${number}`);
	//placeholder.setAttribute("src", `../../BCS-old/gallery/night/2017/img (${number}).jpg`);
	placeholder.setAttribute("src", `https://bcschuepfen.ch/gallery/night/2017/img (${number}).jpg`);
	placeholder.setAttribute('class', '');

	let wrapper = document.getElementById('maximizedImageWrapper');
	wrapper.setAttribute('class', '');
	this.is_maximized = true;

	// Hide Arrows if no more image is available in this direction.
	if (number === 1) {
		setVisibilityTo(false, 'gallery-nav-left');
	} else {
		setVisibilityTo(true, 'gallery-nav-left');
	}

	if (number === this.number_of_images) {
		setVisibilityTo(false, 'gallery-nav-right');
	} else {
		setVisibilityTo(true, 'gallery-nav-right');
	}
}

function minimizeImage() {
	let maximizedImage = document.getElementById('maximizedImagePlaceholder');
	maximizedImage.setAttribute("src", "")
	maximizedImage.setAttribute('class', 'hidden');

	let wrapper = document.getElementById('maximizedImageWrapper');
	wrapper.setAttribute('class', 'hidden');
	this.is_maximized = false;
}

function showPreviousImage() {
	let newImageNumber = current_image - 1;
	maximizeImage(newImageNumber, event);
}

function showNextImage() {
	let newImageNumber = current_image + 1;
	maximizeImage(newImageNumber, event);
}

function setVisibilityTo(visibility, id) {
	if (visibility) {
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.add('hidden');
	}
}

function handleWebPSupport() {
	supportsWebp().then(supported => {
		if (!supported) {
			alert("Dein Browser unterstützt kein WebP. Deshalb können die Bilder nicht angezeigt werden. \n\nBitte update deinen Browser, oder installiere Firefox.\n\nWenn das Problem weiterhin besteht, kannst du dich bei webmaster ät bcschuepfen.ch melden")
		}
	})
}

async function supportsWebp() {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());
	return createImageBitmap(blob).then(() => true, () => false);
}