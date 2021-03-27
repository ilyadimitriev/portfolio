import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';
import handleSliderNav from './handleSliderNav';

const toggleScheme = () => {

	// Слайдер навигации
	const schemeTypesCarousel = new SliderCarousel({
		wrap: `.nav-scheme-slider`,
		main: `.nav-wrap-scheme`,
		prev: '#nav-arrow-scheme_left',
		next: '#nav-arrow-scheme_right',
		slidesToShow: false,
		infinity: true,
		responsive: [
			{
				breakpoint: 1024,
				slidesToShow: 3
			},
			{
				breakpoint: 768,
				slidesToShow: 3
			},
			{
				breakpoint: 576,
				slidesToShow: 1
			}
		]
	});
	schemeTypesCarousel.init();

	const schemeSlider = new StaticSlider({
		wrap: `.scheme-slider`,
		main: `.scheme-slider-wrap`
	});
	schemeSlider.init();

	const descriptions = document.querySelectorAll('.scheme-description-block');

	handleSliderNav({
		nav: '.scheme-nav',
		navSlideClass: '.scheme-nav__item',
		leftArrowClass: '#nav-arrow-scheme_left',
		rightArrowClass: '#nav-arrow-scheme_right',
		breakpoint: 576,
		elseToAdd(currentSlide) {
			schemeSlider.setCurrentSlide(currentSlide);
			descriptions[currentSlide].classList.add('visible-content-block');
			// Передаем выбранный вариант, чтобы слайдер навигации фокусировался на выбранном варианте при смене отоброжаемого количества вариантов
			schemeTypesCarousel.setPosition(currentSlide);
		},
		elseToRemove(currentSlide) {
			descriptions[currentSlide].classList.remove('visible-content-block');
		}
	});
};

export default toggleScheme;
