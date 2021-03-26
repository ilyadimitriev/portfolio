import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';

const handleDesignPopup = () => {
	let designPopupSlideSlider;
	let currentSlide = 0;

	const designTypesPopupCarousel = new SliderCarousel({
		wrap: `#nav-list-popup-designs`,
		main: `.nav-designs-popup`,
		prev: '#nav-arrow-popup-designs_left',
		next: '#nav-arrow-popup-designs_right',
		slidesToShow: false,
		infinity: true,
		responsive: [
			{
				breakpoint: 1200,
				slidesToShow: 4
			},
			{
				breakpoint: 1024,
				slidesToShow: 2
			},
			{
				breakpoint: 576,
				slidesToShow: 1
			}
		]
	});
	designTypesPopupCarousel.init();

	const designPopupSlider = new StaticSlider({
		wrap: `.popup-design-slider`,
		main: `.popup-design-slider-wrap`
	});
	designPopupSlider.init();

	const addSlider = wrapId => {
		designPopupSlideSlider = new StaticSlider({
			wrap: `#${wrapId}`,
			main: `.popup-design-slider-wrap`,
			prev: '#popup_design_left',
			next: '#popup_design_right',
			counter: '#popup-designs-counter'
		});
		designPopupSlideSlider.init();
	};
	addSlider('popup-designs-slider__style1');

	const nav = document.querySelector('.popup-designs-nav-wrap');
	const navOptions = nav.querySelectorAll('.designs-nav__item_popup');
	const allDesignsStyles = document.querySelectorAll('.popup-designs-slide-wrap');
	const allDescriptions = document.querySelectorAll('.popup-design-text');

	nav.addEventListener('click', event => {
		if (window.innerWidth > 576) {
			const target = event.target.closest('.designs-nav__item_popup');
			if (target) {
				if (target.classList.contains('active')) {
					return;
				} else {
					designPopupSlideSlider.remove();
					navOptions.forEach((elem, index) => {
						elem.classList.remove('active');
						allDescriptions[index].classList.remove('visible-content-block');
						if (elem === target) {
							currentSlide = index;
							elem.classList.add('active');
							const wrapId = allDesignsStyles[index].id;
							addSlider(wrapId);
							designPopupSlider.setCurrentSlide(index);
							allDescriptions[index].classList.add('visible-content-block');
						}
					});
				}
			}
		// Для переключения слайдов при минимальном количестве опций на экране
		} else {
			navOptions.forEach((elem, index) => {
				if (elem.classList.contains('active')) {
					currentSlide = index;
				}
			});
			const target = event.target;
			if (target.closest('#nav-arrow-popup-designs_left')) {
				navOptions[currentSlide].classList.remove('active');
				currentSlide--;
			} else if (target.closest('#nav-arrow-popup-designs_right')) {
				navOptions[currentSlide].classList.remove('active');
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
			designPopupSlideSlider.remove();
			navOptions[currentSlide].classList.add('active');
			designPopupSlider.setCurrentSlide(currentSlide);
			addSlider(allDesignsStyles[currentSlide].id);
		}
	});
	window.addEventListener('orientationchange', () => {
		// Для правильного отображения слайдов при повороте экрана
		setTimeout(() => {
			designTypesPopupCarousel.setPosition(currentSlide);
		});
	});
};

export default handleDesignPopup;
