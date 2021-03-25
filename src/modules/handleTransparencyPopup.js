import StaticSlider from '../plugins/staticSlider';

const handleTransparencyPopup = () => {
	const transparency = document.querySelector('.transparency-slider');
	const transparencyPopupSlides = document.querySelectorAll('.popup-transparency-slider__slide');

	const popupTransparencyCarousel = new StaticSlider({
		wrap: `.popup-transparency-slider`,
		main: `.popup-transparency-slider-wrap`,
		prev: '#transparency_left',
		next: '#transparency_right',
		counter: '#transparency-popup-counter'
	});

	popupTransparencyCarousel.init();

	// Для открытия конкретного документа в модальном окне
	transparency.addEventListener('click', event => {
		const target = event.target.closest('.transparency-item');
		if (target) {
			const dataType = target.dataset.name;
			transparencyPopupSlides.forEach((elem, index) => {
				if (elem.dataset.name === dataType) {
					popupTransparencyCarousel.setCurrentSlide(index);
				}
			});
		} else {
			return;
		}
	});
};

export default handleTransparencyPopup;



