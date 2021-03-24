class staticSlider {
	constructor({
		wrap,
		prev,
		next,
		dots
	}) {
		this.wrap = document.querySelector(wrap);
		this.prev = document.getElementById(prev);
		this.next = document.getElementById(next);
		this.dots = document.getElementById(dots);
	}
	init() {

	}


}

export default staticSlider;
