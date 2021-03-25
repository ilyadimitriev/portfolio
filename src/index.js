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

import SliderCarousel from './plugins/sliderCarousel';
import TinyInfinitCarousel from './plugins/tinyInfinitCarousel';
import StaticSlider from './plugins/staticSlider';

document.addEventListener('DOMContentLoaded', () => {

const scrollUp = () => {
	const upBtn = document.querySelector('.button-footer');
	upBtn.addEventListener('click', event => {
		smoothScroll(event);
	});
};

const advantagesCarousel = new TinyInfinitCarousel({
	wrap: `.formula-slider`,
	main: `.formula-slider-wrap`,
	prev: '#formula-arrow_left',
	next: '#formula-arrow_right',
	classToAdd: 'active-item'
});

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

const schemeTypesCarousel = new SliderCarousel({
	wrap: `.nav-scheme-slider`,
	main: `.nav-list-repair`,
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


const problemsCarousel = new TinyInfinitCarousel({
	wrap: `.problems-slider`,
	main: `.problems-slider-wrap`,
	prev: '#problems-arrow_left',
	next: '#problems-arrow_right',
	classToAdd: 'active-item'
});

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
			slidesToShow: 3
		},
		{
			breakpoint: 576,
			slidesToShow: 1
		}
	]
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

const reviewsCarousel = new TinyInfinitCarousel({
	wrap: `.reviews-slider`,
	main: `.reviews-slider-wrap`,
	prev: '#reviews-arrow_left',
	next: '#reviews-arrow_right'
});

const init = () => {
	showPhone();
	scrollUp();
	phoneMask();
	accordionQA();
	showAdvantages();
	showHint();
	advantagesCarousel.init();
	toggleRepairTypes();
	repairTypesCarousel.init();
	transparencyCarousel.init();
	problemsCarousel.init();
	designTypesCarousel.init();
	reviewsCarousel.init();
	schemeTypesCarousel.init();
	toggleScheme();
	partnersCarousel.init();
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
	togglePopup({
		popupType: 'popup-transparency',
		openBtnClass: 'transparency-item__img'
	});
	handleTransparencyPopup();
};

init();

});
