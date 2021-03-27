import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';
import handleSliderNav from './handleSliderNav';

const toggleDesign = () => {
	let designSlideSlider;
	let paginationVisible = document.querySelector('.preview-block.visible');

	// Слайдер навигации
	const designTypesCarousel = new SliderCarousel({
		wrap: `.nav-list-designs`,
		main: `.nav-designs`,
		prev: '#nav-arrow-designs_left',
		next: '#nav-arrow-designs_right',
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
	designTypesCarousel.init();

	const designSlider = new StaticSlider({
		wrap: `.designs-slider`,
		main: `.designs-slider-wrap`
	});
	designSlider.init();

	const addSlider = wrapId => {
		designSlideSlider = new StaticSlider({
			wrap: `#${wrapId}`,
			main: `.designs-slider-wrap`,
			prev: '#design_left',
			next: '#design_right',
			counter: '#designs-counter'
		});
		designSlideSlider.init();
	};
	addSlider('designs-slider__style1');

	const allDesignsStyles = document.querySelectorAll('.design-slider__style>.designs-slide-wrap');
	const paginationContainer = document.querySelector('.preview-block-container');

	const enablePagination = () => {
		paginationContainer.addEventListener('click', event => {
			const target = event.target.closest('.preview-block__item');
			if (target && event.target.closest('.visible')) {
				const paginationElems = paginationVisible.querySelectorAll('.preview-block__item');
				paginationElems.forEach((elem, index) => {
					if (elem === target) {
						designSlideSlider.setCurrentSlide(index);
					}
				});
			}
		});
	};
	enablePagination();

	handleSliderNav({
		nav: '.designs-nav-wrap',
		navSlideClass: '.designs-nav__item',
		leftArrowClass: '#nav-arrow-designs_left',
		rightArrowClass: '#nav-arrow-designs_right',
		breakpoint: 576,
		elseToAdd(currentSlide) {
			addSlider(allDesignsStyles[currentSlide].id);
			designSlider.setCurrentSlide(currentSlide);
			paginationContainer.querySelectorAll('.preview-block')[currentSlide].classList.add('visible');
			paginationVisible = document.querySelector('.preview-block.visible');
			// Передаем выбранный вариант, чтобы слайдер навигации фокусировался на выбранном варианте при смене отоброжаемого количества вариантов
			designTypesCarousel.setPosition(currentSlide);
		},
		elseToRemove(currentSlide) {
			designSlideSlider.remove();
			paginationContainer.querySelectorAll('.preview-block')[currentSlide].classList.remove('visible');
		}
	});
};

export default toggleDesign;
