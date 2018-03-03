var transformProp = Modernizr.prefixed("transform");

function Carousel3D(el) {
	this.element = el;

	this.rotation = 0;
	this.panelCount = 0;
	this.totalPanelCount = this.element.children.length;
	this.theta = 0;

	this.isHorizontal = true;
}

Carousel3D.prototype.modify = function() {
	var panel, angle, i;

	this.panelSize = this.element[
		this.isHorizontal ? "offsetWidth" : "offsetHeight"
	];
	this.rotateFn = this.isHorizontal ? "rotateY" : "rotateX";
	this.theta = 360 / this.panelCount;

	// do some trig to figure out how big the carousel
	// is in 3D space
	this.radius = Math.round(
		this.panelSize / 2 / Math.tan(Math.PI / this.panelCount)
	);

	for (i = 0; i < this.panelCount; i++) {
		panel = this.element.children[i];
		angle = this.theta * i;
		panel.style.opacity = 1;
		panel.style.backgroundColor = "hsla(" + angle + ", 100%, 50%, 0.8)";
		// rotate panel, then push it out in 3D space
		panel.style[transformProp] =
			this.rotateFn +
			"(" +
			angle +
			"deg) translateZ(" +
			this.radius +
			"px)";
	}

	// hide other panels
	for (; i < this.totalPanelCount; i++) {
		panel = this.element.children[i];
		panel.style.opacity = 0;
		panel.style[transformProp] = "none";
	}

	// adjust rotation so panels are always flat
	this.rotation = Math.round(this.rotation / this.theta) * this.theta;

	this.transform();
};

Carousel3D.prototype.transform = function() {
	// push the carousel back in 3D space,
	// and rotate it
	this.element.style[transformProp] =
		"translateZ(-" +
		this.radius +
		"px) " +
		this.rotateFn +
		"(" +
		this.rotation +
		"deg)";
};

var init = function() {
	/* Cube */
	var box1 = document.querySelector(".container-cube").children[0],
		showPanelButtons = document.querySelectorAll(
			"#cube-show-buttons button"
		),
		panelClassName = "cube-show-front",
		onButtonClick = function(event) {
			box1.classList.remove(panelClassName);
			panelClassName = event.target.className;
			box1.classList.add(panelClassName);
		};

	for (var i = 0, len = showPanelButtons.length; i < len; i++) {
		showPanelButtons[i].addEventListener("click", onButtonClick, false);
	}

	document.getElementById("cube-toggle-backface-visibility").addEventListener(
		"click",
		function() {
			box1.classList.toggle("panels-backface-invisible");
		},
		false
	);

	/* Prism */
	var box2 = document.querySelector(".container-prism").children[0],
		showPanelButtons = document.querySelectorAll(
			"#prism-show-buttons button"
		),
		panelClassName = "prism-show-front",
		onButtonClick = function(event) {
			box2.classList.remove(panelClassName);
			panelClassName = event.target.className;
			box2.classList.add(panelClassName);
		};

	for (var i = 0, len = showPanelButtons.length; i < len; i++) {
		showPanelButtons[i].addEventListener("click", onButtonClick, false);
	}

	document
		.getElementById("prism-toggle-backface-visibility")
		.addEventListener(
			"click",
			function() {
				box2.classList.toggle("panels-backface-invisible");
			},
			false
		);

	/* Carousel */
	var carousel = new Carousel3D(document.getElementById("carousel")),
		panelCountInput = document.getElementById("carousel-panel-count"),
		axisButton = document.getElementById("carousel-toggle-axis"),
		navButtons = document.querySelectorAll("#carousel-navigation button"),
		onNavButtonClick = function(event) {
			var increment = parseInt(event.target.getAttribute("data-increment"));
			carousel.rotation += carousel.theta * increment * -1;
			carousel.transform();
		};

	// populate on startup
	carousel.panelCount = parseInt(panelCountInput.value, 10);
	carousel.modify();

	axisButton.addEventListener(
		"click",
		function() {
			carousel.isHorizontal = !carousel.isHorizontal;
			carousel.modify();
		},
		false
	);

	panelCountInput.addEventListener(
		"change",
		function(event) {
			carousel.panelCount = event.target.value;
			carousel.modify();
		},
		false
	);

	for (var i = 0; i < 2; i++) {
		navButtons[i].addEventListener("click", onNavButtonClick, false);
	}

	document
		.getElementById("carousel-toggle-backface-visibility")
		.addEventListener(
			"click",
			function() {
				carousel.element.toggleClassName(
					"panels-backface-invisible"
				);
			},
			false
		);

	setTimeout(function() {
		document.body.addClassName("ready");
	}, 0);
};

window.addEventListener("DOMContentLoaded", init, false);
