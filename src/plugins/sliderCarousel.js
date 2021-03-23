class sliderCarousel {
	constructor({
		main,
		wrap,
		prev,
		next,
		position = 0,
		slidesToShow = 4,
		infinity = false,
		responsive = []
	}) {
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slides = this.wrap.children;
		this.slidesToShow = slidesToShow;
		this.options = {
			position,
			infinity,
			slideWidth: (Math.floor((100 / this.slidesToShow * 10)) / 10)
		};
		this.responsive = responsive;
	}
	init() {
		this.addGloClass();
		this.addStyle.call(this);

		if (this.prev && this.next) {
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}
		if (this.responsive) {
			this.responseInit.call(this);
		}
	}
	addGloClass() {
		this.main.classList.add(`glo-slider`);
		this.wrap.classList.add(`glo-slider__wrap`);
		for (const item of this.slides) {
			item.classList.add(`glo-slider__item`);
		}
	}
	addStyle() {
		let style = document.getElementById(`sliderCarousel-style`);
		if (!style) {
			style = document.createElement(`style`);
			style.id = `sliderCarousel-style`;
		}
		style.textContent = `
			.glo-slider {
				position: relative;
				overflow: hidden !important;
			}
			.glo-slider__wrap {
				display: flex !important;
				transition: transform 0.3s !important;
				will-change: transform !important;
			}
			.glo-slider__item {
				flex: 0 0 ${this.options.slideWidth}% !important;
				margin: auto 0 !important;
			}
		`;
		document.head.appendChild(style);
	}
	controlSlider() {
		this.prev.addEventListener(`click`, this.prevSlider.bind(this));
		this.next.addEventListener(`click`, this.nextSlider.bind(this));
	}
	prevSlider() {
		if (this.options.infinity || this.options.position > 0) {
			--this.options.position;
			if (this.options.position < 0) {
				this.options.position = this.slides.length - this.slidesToShow;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
		}
	}
	nextSlider() {
		if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
			++this.options.position;
			if (this.options.position > this.slides.length - this.slidesToShow) {
				this.options.position = 0;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
		}
	}
	addArrow() {
		this.prev = document.createElement(`button`);
		this.next = document.createElement(`button`);
		this.prev.classList = `glo-slider__prev`;
		this.next.classList = `glo-slider__next`;
		this.main.appendChild(this.prev);
		this.main.appendChild(this.next);
		const style = document.createElement(`style`);
		style.textContent = `
			.glo-slider__prev, .glo-slider__next {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 40px;
				height: 40px;
				background-color: rgba(0, 0, 0, .5);
				background-repeat: no-repeat;
				background-size: 30px;
				border-radius: 50%;
				border: none;
			}
			.glo-slider__prev {
				left: 20px;
				background-image: url(../images/icons/left-arrow.svg);
				background-position: 50% 50%;
			}
			.glo-slider__next {
				right: 20px;
				background-image: url(../images/icons/right-arrow.svg);
				background-position: 50% 50%;
			}
			.glo-slider__prev:hover,
			.glo-slider__next:hover, 
			.glo-slider__prev:focus, 
			.glo-slider__next:focus {
				outline: none;
			}
		`;
		document.head.appendChild(style);
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
				this.options.slideWidth = (Math.floor((100 / this.slidesToShow * 10)) / 10);
				this.wrap.style.transform = `translateX(-0%)`;
				this.addStyle();
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.slideWidth = (Math.floor((100 / this.slidesToShow * 10)) / 10);
				this.wrap.style.transform = `translateX(-0%)`;
				this.addStyle();
			}
		};
		checkResponse();
		window.addEventListener(`resize`, checkResponse);
	}
}

export default sliderCarousel;
