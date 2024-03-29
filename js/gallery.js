const IMAGES_BASE_PATH = "../img/gallery";
let current_image;
let number_of_images;
let event;
let is_maximized = false;

function setupGallery(numberOfImages, eventName) {
	this.number_of_images = numberOfImages;
	setupDOM(eventName);
	setupOnKeyPressed();

	handleWebPSupport();
}

function setupDOM(eventName) {
	this.event = eventName;
	let anchor = document.getElementById('gallery-grid');

	let cols = [];
	for(let i = 0; i <3; i++) {
		let col = document.createElement('div')
		col.setAttribute('id', `gallery-col-${i}`)
		col.setAttribute('class', `gallery-column`)
		anchor.appendChild(col)
		cols.push(col)
	}

	for (let i = 1; i < this.number_of_images + 1; i++) {
		addImage(cols[i%3], i)
	}

	// Possible other solution:
	// Use 3+ Cols, split up all the images due to their index on to separate cols. Similarly how
	// unsplash solves it.
}

function addImage(col, i) {
	let image_container = document.createElement('img')
	image_container.setAttribute("src", `${IMAGES_BASE_PATH}/thumbnails/${this.event}/img-${i}.jpg`);
	image_container.setAttribute('onclick', `maximizeImage(${i}, '${this.event.toString()}')`);
	image_container.setAttribute('loading', 'lazy')
	col.appendChild(image_container);
}

function setupOnKeyPressed() {
	document.addEventListener('keydown', event => {
		if (this.is_maximized) {
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
	placeholder.setAttribute("src", `${IMAGES_BASE_PATH}/full/${this.event}/img-${number}.jpg`);
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
		// Preload next image
		let img = new Image();
		img.src = `${IMAGES_BASE_PATH}/full/${this.event}/img-${number + 1}.jpg`
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
	let newImageNumber = this.current_image - 1;
	maximizeImage(newImageNumber, event);
}

function showNextImage() {
	let newImageNumber = this.current_image + 1;
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