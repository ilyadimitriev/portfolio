import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';
import handleSliderNav from './handleSliderNav';

const handleDesignPopup = () => {
	let designPopupSlideSlider;

	// Слайдер навигации
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

	// Слайдер с типами дизайна
	const designPopupSlider = new StaticSlider({
		wrap: `.popup-design-slider`,
		main: `.popup-design-slider-wrap`
	});
	designPopupSlider.init();

	// Слайдер внутри слайда с типом дизайна
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

	const allDesignsStyles = document.querySelectorAll('.popup-designs-slide-wrap');
	const allDescriptions = document.querySelectorAll('.popup-design-text');

	handleSliderNav({
		nav: '.popup-designs-nav-wrap',
		navSlideClass: '.designs-nav__item_popup',
		leftArrowClass: '#nav-arrow-popup-designs_left',
		rightArrowClass: '#nav-arrow-popup-designs_right',
		breakpoint: 576,
		elseToAdd(currentSlide) {
			// Переключаемся на нужный слайд с типом дизайна
			designPopupSlider.setCurrentSlide(currentSlide);
			// Внутри выбранного слайда создаем слайдер
			addSlider(allDesignsStyles[currentSlide].id);
			// Передаем выбранный вариант, чтобы слайдер навигации фокусировался на выбранном варианте при смене отоброжаемого количества вариантов
			designTypesPopupCarousel.setPosition(currentSlide);
			allDescriptions[currentSlide].classList.add('visible-content-block');
		},
		elseToRemove(currentSlide) {
			// Удаляем слайдер из предыдущего слайда
			designPopupSlideSlider.remove();
			allDescriptions[currentSlide].classList.remove('visible-content-block');
		}
	});
};

export default handleDesignPopup;
