import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';

const toggleDesign = () => {
	let designSlideSlider;
	let currentSlide = 0;
	let paginationVisible = document.querySelector('.preview-block.visible');

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

	const nav = document.querySelector('.designs-nav-wrap');
	const navOptions = nav.querySelectorAll('.designs-nav__item');
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

	nav.addEventListener('click', event => {
		if (window.innerWidth > 576) {
			const target = event.target.closest('.designs-nav__item');
			if (target) {
				if (target.classList.contains('active')) {
					return;
				} else {
					designSlideSlider.remove();
					navOptions.forEach((elem, index) => {
						elem.classList.remove('active');
						paginationContainer.querySelectorAll('.preview-block')[index].classList.remove('visible');
						if (elem === target) {
							currentSlide = index;
							elem.classList.add('active');
							const wrapId = allDesignsStyles[index].id;
							addSlider(wrapId);
							designSlider.setCurrentSlide(index);
							paginationContainer.querySelectorAll('.preview-block')[index].classList.add('visible');
							paginationVisible = document.querySelector('.preview-block.visible');
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
			if (target.closest('#nav-arrow-designs_left')) {
				navOptions[currentSlide].classList.remove('active');
				currentSlide--;
			} else if (target.closest('#nav-arrow-designs_right')) {
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
			designSlideSlider.remove();
			navOptions[currentSlide].classList.add('active');
			designSlider.setCurrentSlide(currentSlide);
			addSlider(allDesignsStyles[currentSlide].id);
		}
	});
	window.addEventListener('orientationchange', () => {
		// Для правильного отображения слайдов при повороте экрана
		setTimeout(() => {
			designTypesCarousel.setPosition(currentSlide);
		});
	});
};

export default toggleDesign;
