import StaticSlider from '../plugins/staticSlider';

const toggleScheme = () => {
	const nav = document.querySelector('.scheme-nav');
	const navOptions = nav.querySelectorAll('.scheme-nav__item');
	const descriptions = document.querySelectorAll('.scheme-description-block');
	const schemeSlider = new StaticSlider({
		wrap: `.scheme-slider`,
		main: `.scheme-slider-wrap`
	});
	schemeSlider.init();
	// Для открытия конкретного документа в модальном окне
	nav.addEventListener('click', event => {
		if (window.innerWidth > 576) {
			const target = event.target.closest('.scheme-nav__item');
			if (target) {
				const dataType = target.dataset.name;
				navOptions.forEach((elem, index) => {
					elem.classList.remove('active');
					descriptions[index].classList.remove('visible-content-block');
					if (elem.dataset.name === dataType) {
						schemeSlider.setCurrentSlide(index);
						elem.classList.add('active');
						descriptions[index].classList.add('visible-content-block');
					}
				});
			} else {
				return;
			}
		// Для переключения слайдов при минимальном количестве опций на экране
		} else {
			let currentSlide;
			navOptions.forEach((elem, index) => {
				if (elem.classList.contains('active')) {
					currentSlide = index;
				}
			});
			const target = event.target;
			if (target.closest('#nav-arrow-scheme_left')) {
				navOptions[currentSlide].classList.remove('active');
				descriptions[currentSlide].classList.remove('visible-content-block');
				currentSlide--;
			} else if (target.closest('#nav-arrow-scheme_right')) {
				navOptions[currentSlide].classList.remove('active');
				descriptions[currentSlide].classList.remove('visible-content-block');
				currentSlide++;
			} else {
				return;
			}
			if (currentSlide < 0) {
				currentSlide = navOptions.length - 1;
			}
			if (currentSlide > navOptions.length - 1) {
				currentSlide = 0;
			}
			navOptions[currentSlide].classList.add('active');
			descriptions[currentSlide].classList.add('visible-content-block');
			schemeSlider.setCurrentSlide(currentSlide);
		}
	});


};

export default toggleScheme;
