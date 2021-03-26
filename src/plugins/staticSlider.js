class staticSlider {
	constructor({
		wrap,
		main,
		prev,
		next,
		dots,
		currentSlide = 0,
		counter
	}) {
		this.wrap = document.querySelector(wrap);
		this.main = document.querySelector(main);
		this.prev = prev;
		this.next = next;
		this.dots = document.querySelector(dots);
		this.counter = document.querySelector(counter);
		this.slides = this.wrap.children;
		this.currentSlide = (currentSlide > this.slides.length - 1) ?
			(console.warn('Слайдера с таким индексом не существует, будет отображен первый слайд'), 0) :
			currentSlide;
		this.sliderListener = event => {
			this.handleSlider.call(this, event);
		};
	}
	init() {
		this.addStaticClass();
		this.addStyle();
		this.controlSlider();
	}
	remove() {
		this.removeStaticClass();
		this.main.removeEventListener('click', this.sliderListener);
	}
	addStaticClass() {
		this.main.classList.add(`static-slider`);
		this.wrap.classList.add(`static-slider__wrap`);
		for (const item of this.slides) {
			if (this.slides[this.currentSlide] === item) {
				item.classList.add(`active`);
			}
			item.classList.add(`static-slider__item`);
		}
	}
	removeStaticClass() {
		this.main.classList.remove(`static-slider`);
		this.wrap.classList.remove(`static-slider__wrap`);
		for (const item of this.slides) {
			if (this.slides[this.currentSlide] === item) {
				item.classList.remove(`active`);
			}
			item.classList.remove(`static-slider__item`);
		}
	}
	addStyle() {
		let style = document.getElementById(`staticSlider-style`);
		if (!style) {
			style = document.createElement(`style`);
			style.id = `staticSlider-style`;
		}
		style.textContent = `
			.static-slider {
			}
			.static-slider__wrap {
				position: relative;
			}
			.static-slider__item {
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
				width: 100%;
				opacity: 0;
				-webkit-transition: opacity .5s;
				transition: opacity .5s;
			}
			.static-slider__item.active {
				opacity: 1;
				-webkit-transition: opacity .5s;
				transition: opacity .5s;
			}

		`;
		document.head.appendChild(style);
	}
	handleSlider(event) {
		event.preventDefault();
		const target = event.target;
		if (!target.closest(`${this.prev}`) && !target.closest(`${this.next}`)) return;

		this.prevSlider();
		if (target.closest(`${this.prev}`)) {
			this.currentSlide--;
		} else if (target.closest(`${this.next}`)) {
			this.currentSlide++;
		}

		if (this.currentSlide >= this.slides.length) {
			this.currentSlide = 0;
		}
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length - 1;
		}
		this.nextSlider();
		if (this.counter) {
			this.handleCounter();
		}
	}
	controlSlider() {
		this.main.addEventListener('click', this.sliderListener);
		if (this.counter) {
			this.handleCounter();
		}
	}
	prevSlider() {
		this.slides[this.currentSlide].classList.remove('active');
	}
	nextSlider() {
		this.slides[this.currentSlide].classList.add('active');
	}
	handleCounter() {
		this.counter.querySelector('.slider-counter-content__current').textContent = this.currentSlide + 1;
		this.counter.querySelector('.slider-counter-content__total').textContent = this.slides.length;
	}
	getData() {
		return this.currentSlide;
	}
	setCurrentSlide(num) {
		if (num > this.slides.length - 1) {
			console.warn('Слайдера с таким индексом не существует, будет отображен первый слайд');
			return;
		} else {
			this.prevSlider();
			this.currentSlide = num;
			this.nextSlider();
			if (this.counter) {
				this.handleCounter();
			}
		}
	}

}

export default staticSlider;
