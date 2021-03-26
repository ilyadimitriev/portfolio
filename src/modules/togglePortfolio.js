import StaticSlider from '../plugins/staticSlider';
import SliderCarousel from '../plugins/sliderCarousel';

const togglePortfolio = () => {
	const portfolioCarousel = new SliderCarousel({
		wrap: `.portfolio-slider`,
		main: `.portfolio-slider-wrap`,
		prev: '#portfolio-arrow_left',
		next: '#portfolio-arrow_right',
		slidesToShow: 3,
		infinity: false,
		responsive: [
			{
				breakpoint: 1200,
				slidesToShow: 2
			},
			{
				breakpoint: 578,
				slidesToShow: false
			}
		]
	});
	portfolioCarousel.init();

	const portfolioSlideSlider = new StaticSlider({
		wrap: `.portfolio-slider-mobile`,
		main: `.portfolio-slider-wrap`,
		prev: '#portfolio-arrow-mobile_left',
		next: '#portfolio-arrow-mobile_right',
		counter: '#portfolio-counter'
	});
	portfolioSlideSlider.init();

	const portfolio = document.getElementById('portfolio');
	const portfolioSlides = document.querySelectorAll('.portfolio-slider>.portfolio-slider__slide');

	portfolio.addEventListener('click', event => {
		if (event.target.closest('#portfolio-arrow_right') || event.target.closest('#portfolio-arrow_left')) {
			const data = portfolioCarousel.getData();
			const leftArrow = document.getElementById('portfolio-arrow_left');
			const rightArrow = document.getElementById('portfolio-arrow_right');
			if (event.target.closest('#portfolio-arrow_right') && data.position === portfolioSlides.length - data.slidesToShow) {
				rightArrow.classList.add('disabled');
			} else if (event.target.closest('#portfolio-arrow_left') && data.position === 0) {
				leftArrow.classList.add('disabled');
			} else {
				rightArrow.classList.remove('disabled');
				leftArrow.classList.remove('disabled');
			}
		}
	});
};

export default togglePortfolio;
