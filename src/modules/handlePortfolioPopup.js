import StaticSlider from '../plugins/staticSlider';

const handlePortfolioPopup = () => {

	const portfolio = document.getElementById('portfolio');
	const portfolioSlides = document.querySelectorAll('.portfolio-slider__slide>.portfolio-slider__slide-frame');
	const portfolioMobileSlides = document.querySelectorAll('.portfolio-slider-mobile>.portfolio-slider__slide-frame');
	const allDescriptions = document.querySelectorAll('.popup-portfolio-text');
	const popupPortfolio = document.querySelector('.popup-portfolio-slider-wrap');

	const popupPortfolioCarousel = new StaticSlider({
		wrap: `.popup-portfolio-slider`,
		main: `.popup-portfolio-slider-wrap`,
		prev: '#popup_portfolio_left',
		next: '#popup_portfolio_right',
		counter: '#popup-portfolio-counter'
	});

	popupPortfolioCarousel.init();

	// Для открытия конкретного портфолио в модальном окне
	portfolio.addEventListener('click', event => {
		const target = event.target.closest('.portfolio-slider__slide-frame');
		if (target) {
			if (event.target.closest('.portfolio-slider-mobile')) {
				portfolioMobileSlides.forEach((elem, index) => {
					allDescriptions[index].classList.remove('visible');
					if (elem.classList.contains('active')) {
						popupPortfolioCarousel.setCurrentSlide(index);
						allDescriptions[index].classList.add('visible');
					}
				});
			} else if (event.target.closest('.portfolio-slider__slide')) {
				portfolioSlides.forEach((elem, index) => {
					allDescriptions[index].classList.remove('visible');
					if (elem === target) {
						popupPortfolioCarousel.setCurrentSlide(index);
						allDescriptions[index].classList.add('visible');
					}
				});
			}
		} else {
			return;
		}
	});
	popupPortfolio.addEventListener('click', event => {
		if (event.target.closest('#popup_portfolio_left') || event.target.closest('#popup_portfolio_right')) {
			const id = popupPortfolioCarousel.getData();
			allDescriptions.forEach((elem, index) => {
				elem.classList.remove('visible');
				if (index === id) {
					elem.classList.add('visible');
				}
			});
		}
	});
	// // Сглаживаю ошибку верстальщика, чтоб при неадекватной верстке блок все равно смотрелся нормально
	// const resizePortfolioPopup = () => {
	// 	if (window.innerHeight < document.querySelector('.popup-dialog-portfolio').clientHeight) {
	// 		document.querySelector('.popup-dialog-portfolio').style.transform = `scale(${window.innerHeight / document.querySelector('.popup-dialog-portfolio').clientHeight})`;
	// 	} else {
	// 		document.querySelector('.popup-dialog-portfolio').style.transform = '';
	// 	}
	// };
	// resizePortfolioPopup();
	// window.addEventListener('resize', resizePortfolioPopup);
};

export default handlePortfolioPopup;
