/* eslint-disable indent */
import showPhone from './modules/showPhone';
import handleMenu from './modules/handleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import phoneMask from './modules/phoneMask';
import accordionQA from './modules/accordionQA';
import showHint from './modules/showHint';

import sliderCarousel from './plugins/sliderCarousel';

document.addEventListener('DOMContentLoaded', () => {

const scrollUp = () => {
	const upBtn = document.querySelector('.button-footer');
	upBtn.addEventListener('click', event => {
		smoothScroll(event);
	});
};

const carousel = new sliderCarousel({
	wrap: `.partners-slider`,
	main: `.partners-wrapper`,
	prev: '#partners-arrow_left',
	next: '#partners-arrow_right',
	slidesToShow: 3,
	infinity: true,
	responsive: [
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

const init = () => {
	showPhone();
	scrollUp();
	phoneMask();
	accordionQA();
	showHint();
	carousel.init();
	handleMenu();
	togglePopup({
		popupType: 'popup-menu',
		openBtnClass: 'link-popup-menu'
	});
	togglePopup({
		popupType: 'popup-repair-types',
		openBtnClass: 'link-popup-repair'
	});
	togglePopup({
		popupType: 'popup-privacy',
		openBtnClass: 'link-popup-privacy'
	});
	togglePopup({
		popupType: 'popup-consultation',
		openBtnClass: 'link-popup-consultation'
	});
};

init();

});
