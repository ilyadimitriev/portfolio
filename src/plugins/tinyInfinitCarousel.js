// based on https://www.youtube.com/watch?v=DqkH_PV5cto and sliderCarousel.js

class tinyCarousel {
	constructor({
		classToAdd = false,
		main,
		wrap,
		prev,
		next,
		slidesToShow = true,
		responsive = []
	}) {
		this.classToAdd = classToAdd;
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slides = this.wrap.children;
		this.slidesToShow = slidesToShow;
		this.options = {
			position: 1,
			slideWidth: 100
		};
		this.responsive = responsive;
		this.cloneExist = false;
		this.prevBtnFunc = () => {
			this.prevSlider.call(this);
		};
		this.nextBtnFunc = () => {
			this.nextSlider.call(this);
		};
	}
	init() {
		if (this.responsive) {
			this.responseInit.call(this);
		} else {
			this.addTinyClass();
			this.addStyle.call(this);
			this.controlSlider();
		}
	}
	remove() {
		this.wrap.querySelectorAll('.tiny-slider__item').forEach(elem => {
			if (elem.id === 'first-clone' || elem.id === 'last-clone') {
				elem.remove();
			}
		});
		this.prev.removeEventListener('click', this.prevBtnFunc);
		this.next.removeEventListener('click', this.nextBtnFunc);
		this.removeTinyClass();
		this.wrap.style.transform = ``;
	}
	addTinyClass() {
		this.main.classList.add(`tiny-slider`);
		this.wrap.classList.add(`tiny-slider__wrap`);
		for (const item of this.slides) {
			item.classList.add(`tiny-slider__item`);
		}
	}
	removeTinyClass() {
		this.main.classList.remove(`tiny-slider`);
		this.wrap.classList.remove(`tiny-slider__wrap`);
		for (const item of this.slides) {
			item.classList.remove(`tiny-slider__item`);
			item.classList.remove('tiny-slider__item_active');
		}
	}
	addStyle() {
		let style = document.getElementById(`tinyCarousel-style`);
		if (!style) {
			style = document.createElement(`style`);
			style.id = `tinyCarousel-style`;
		}
		style.textContent = `
			.tiny-slider {
				position: relative;
				overflow: hidden !important;
			}
			.tiny-slider__wrap {
				display: flex !important;
				flex-direction: row;
				flex-wrap: nowrap;
				will-change: transform !important;
			}
			.tiny-slider__item {
				height: fit-content;
				flex: 0 0 ${this.options.slideWidth}% !important;
			}

		`;
		document.head.appendChild(style);
	}
	controlSlider() {
		this.infiniteSlider();
		this.prev.addEventListener(`click`, this.prevBtnFunc);
		this.next.addEventListener(`click`, this.nextBtnFunc);
	}
	handleActiveClass() {
		let count = this.slides.length - 1;
		do {
			if (this.options.position === count) {
				this.slides[count].classList.add('tiny-slider__item_active');
				if (this.classToAdd) {
					this.slides[count].classList.add(this.classToAdd);
				}
			} else {
				this.slides[count].classList.remove('tiny-slider__item_active');
				if (this.classToAdd) {
					this.slides[count].classList.remove(this.classToAdd);
				}
			}
			count--;
		} while (count > 0);
	}
	prevSlider() {
		if (this.options.position <= 0) return;
		this.options.position--;
		this.wrap.style.transition = 'transform 0.3s';
		this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
	}
	nextSlider() {
		if (this.options.position >= this.slides.length - 1) return;
		this.options.position++;
		this.wrap.style.transition = 'transform 0.3s';
		this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
	}
	infiniteSlider() {
		if (this.cloneExist) return;

		const firstClone = this.wrap.firstElementChild.cloneNode(true);
		const lastClone = this.wrap.lastElementChild.cloneNode(true);
		firstClone.id = 'first-clone';
		lastClone.id = 'last-clone';
		this.wrap.append(firstClone);
		this.wrap.prepend(lastClone);
		this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
		this.handleActiveClass();
		this.wrap.addEventListener('transitionend', () => {
			if (this.slides[this.options.position].id === 'first-clone') {
				this.wrap.style.transition = 'none';
				this.options.position = 1;
				this.handleActiveClass();
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
			} else if (this.slides[this.options.position].id === 'last-clone') {
				this.wrap.style.transition = 'none';
				this.options.position = this.slides.length - 2;
				this.handleActiveClass();
				this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
			} else {
				this.handleActiveClass();
			}
		});

	}
	responseInit() {
		const slidesToShowDefault = this.slidesToShow;
		const allResponse = this.responsive.map(item => item.breakpoint).sort((a, b) => a - b);
		const checkResponse = () => {
			const windowWidth = document.documentElement.clientWidth;
			const nearestMore = allResponse.find(width => {
				if (width > windowWidth) {
					return width;
				}
			});
			if (nearestMore) {
				let responsiveId;
				this.responsive.find((resp, id) => {
					if (resp.breakpoint === nearestMore) {
						responsiveId = id;
						return true;
					}
				});
				this.slidesToShow = this.responsive[responsiveId].slidesToShow;
				if (this.slidesToShow) {
					this.addTinyClass();
					this.addStyle();
					this.controlSlider();
					this.cloneExist = true;
				} else {
					this.remove();
					this.cloneExist = false;
				}
			} else {
				this.slidesToShow = slidesToShowDefault;
				if (this.slidesToShow) {
					this.addTinyClass();
					this.addStyle();
					this.controlSlider();
					this.cloneExist = true;
				} else {
					this.remove();
					this.cloneExist = false;
				}
			}
		};
		checkResponse();
		window.addEventListener(`resize`, checkResponse);
	}
}

export default tinyCarousel;
