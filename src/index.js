/* eslint-disable indent */
import showPhone from './modules/showPhone';
import handleMenu from './modules/handleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import phoneMask from './modules/phoneMask';
import accordionQA from './modules/accordionQA';
import showHint from './modules/showHint';
import showAdvantages from './modules/showAdvantages';
import handleTransparencyPopup from './modules/handleTransparencyPopup';
import toggleRepairTypes from './modules/toggleRepairTypes';
import toggleScheme from './modules/toggleScheme';
import toggleDesign from './modules/toggleDesign';
import handleDesignPopup from './modules/handleDesignPopup';
import togglePortfolio from './modules/togglePortfolio';
import handlePortfolioPopup from './modules/handlePortfolioPopup';
import sendForm from './modules/sendForm';
import handleRepairPopup from './modules/handleRepairPopup';

import SliderCarousel from './plugins/sliderCarousel';
import TinyInfinitCarousel from './plugins/tinyInfinitCarousel';

document.addEventListener('DOMContentLoaded', () => {

const scrollUp = () => {
	const upBtn = document.querySelector('.button-footer');
	upBtn.addEventListener('click', event => {
		smoothScroll(event);
	});
};

const servicesCarousel = new TinyInfinitCarousel({
	wrap: `.services-slider`,
	main: `.services`,
	prev: '#services-arrow_left',
	next: '#services-arrow_right',
	slidesToShow: false,
	responsive: [
		{
			breakpoint: 576,
			slidesToShow: true
		}
	]
});

const advantagesCarousel = new TinyInfinitCarousel({
	wrap: `.formula-slider`,
	main: `.formula-slider-wrap`,
	prev: '#formula-arrow_left',
	next: '#formula-arrow_right',
	classToAdd: 'active-item'
});

const problemsCarousel = new TinyInfinitCarousel({
	wrap: `.problems-slider`,
	main: `.problems-slider-wrap`,
	prev: '#problems-arrow_left',
	next: '#problems-arrow_right',
	classToAdd: 'active-item'
});

const transparencyCarousel = new TinyInfinitCarousel({
	wrap: `.transparency-slider`,
	main: `.transparency-slider-wrap`,
	prev: '#transparency-arrow_left',
	next: '#transparency-arrow_right',
	slidesToShow: false,
	responsive: [
		{
			breakpoint: 1091,
			slidesToShow: true
		}
	]
});

const reviewsCarousel = new TinyInfinitCarousel({
	wrap: `.reviews-slider`,
	main: `.reviews-slider-wrap`,
	prev: '#reviews-arrow_left',
	next: '#reviews-arrow_right'
});

const partnersCarousel = new SliderCarousel({
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
	handleMenu();
	showPhone();
	scrollUp();
	phoneMask();
	servicesCarousel.init();
	sendForm('feedback1');
	sendForm('feedback2');
	sendForm('feedback3');
	sendForm('feedback4');
	sendForm('feedback5');
	sendForm('feedback6');
	showAdvantages();
	showHint();
	advantagesCarousel.init();
	toggleRepairTypes();
	togglePortfolio();
	transparencyCarousel.init();
	problemsCarousel.init();
	toggleDesign();
	reviewsCarousel.init();
	toggleScheme();
	partnersCarousel.init();
	accordionQA();
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
		popupType: 'popup-design',
		openBtnClass: 'link-list-designs'
	});
	togglePopup({
		popupType: 'popup-consultation',
		openBtnClass: 'link-popup-consultation'
	});
	togglePopup({
		popupType: 'popup-transparency',
		openBtnClass: 'transparency-item__img'
	});
	togglePopup({
		popupType: 'popup-portfolio',
		openBtnClass: 'portfolio-slider__slide-frame'
	});
	handleRepairPopup();
	handleTransparencyPopup();
	handlePortfolioPopup();
	handleDesignPopup();
};

init();

});
