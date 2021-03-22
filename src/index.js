/* eslint-disable indent */
import showPhone from './modules/showPhone';
import handleMenu from './modules/handleMenu';
import smoothScroll from './modules/smoothScroll';
import handleRepairTypes from './modules/handleRepairTypes';

document.addEventListener('DOMContentLoaded', () => {

const scrollUp = () => {
	const upBtn = document.querySelector('.button-footer');
	upBtn.addEventListener('click', event => {
		smoothScroll(event);
	});
};

const init = () => {
	showPhone();
	handleMenu();
	scrollUp();
	handleRepairTypes();
};

init();

});
