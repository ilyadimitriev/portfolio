import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';
import handleSliderNav from './handleSliderNav';

const toggleRepairTypes = () => {
	let repairSlideSlider;

	// Слайдер навигации
	const repairTypesCarousel = new SliderCarousel({
		wrap: `.nav-list-repair`,
		main: `.repair-types-nav`,
		prev: '#nav-arrow-repair-left_base',
		next: '#nav-arrow-repair-right_base',
		slidesToShow: false,
		infinity: true,
		responsive: [
			{
				breakpoint: 1024,
				slidesToShow: 3
			},
			{
				breakpoint: 768,
				slidesToShow: 2
			},
			{
				breakpoint: 576,
				slidesToShow: 1
			}
		]
	});
	repairTypesCarousel.init();

	const repairSlider = new StaticSlider({
		wrap: `.repair-types-slider`,
		main: `.repair-types-slider-wrap`
	});
	repairSlider.init();

	const addSlider = wrapId => {
		repairSlideSlider = new StaticSlider({
			wrap: `#${wrapId}`,
			main: `.repair-types-slider-wrap`,
			prev: '#repair-types-arrow_left',
			next: '#repair-types-arrow_right',
			counter: '#repair-counter'
		});
		repairSlideSlider.init();
	};
	addSlider('types-repair1');

	const allRrepairTypeSlides = document.querySelectorAll('.repair-slider>.repair-slide-wrap');

	handleSliderNav({
		nav: '.nav-wrap-repair',
		navSlideClass: '.repair-types-nav__item',
		leftArrowClass: '#nav-arrow-repair-left_base',
		rightArrowClass: '#nav-arrow-repair-right_base',
		breakpoint: 576,
		elseToAdd(currentSlide) {
			addSlider(allRrepairTypeSlides[currentSlide].id);
			repairSlider.setCurrentSlide(currentSlide);
			// Передаем выбранный вариант, чтобы слайдер навигации фокусировался на выбранном варианте при смене отоброжаемого количества вариантов
			repairTypesCarousel.setPosition(currentSlide);
		},
		elseToRemove() {
			repairSlideSlider.remove();
		}
	});
};

export default toggleRepairTypes;
