import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';

const toggleRepairTypes = () => {
	let repairSlideSlider;
	let currentSlide = 0;

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

	const nav = document.querySelector('.nav-wrap-repair');
	const navOptions = nav.querySelectorAll('.repair-types-nav__item');
	const allRrepairTypeSlides = document.querySelectorAll('.repair-slider>.repair-slide-wrap');

	nav.addEventListener('click', event => {
		if (window.innerWidth > 576) {
			const target = event.target.closest('.repair-types-nav__item');
			if (target) {
				if (target.classList.contains('active')) {
					return;
				} else {
					repairSlideSlider.remove();
					navOptions.forEach((elem, index) => {
						elem.classList.remove('active');
						if (elem === target) {
							currentSlide = index;
							elem.classList.add('active');
							repairSlider.setCurrentSlide(index);
							const wrapId = allRrepairTypeSlides[index].id;
							addSlider(wrapId);
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
			if (target.closest('#nav-arrow-repair-left_base')) {
				navOptions[currentSlide].classList.remove('active');
				currentSlide--;
			} else if (target.closest('#nav-arrow-repair-right_base')) {
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
			repairSlideSlider.remove();
			navOptions[currentSlide].classList.add('active');
			repairSlider.setCurrentSlide(currentSlide);
			addSlider(allRrepairTypeSlides[currentSlide].id);
		}
	});
	window.addEventListener('orientationchange', () => {
		// Для правильного отображения слайдов при повороте экрана
		setTimeout(() => {
			repairTypesCarousel.setPosition(currentSlide);
		});
	});
};

export default toggleRepairTypes;
