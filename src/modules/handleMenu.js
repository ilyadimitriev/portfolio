import smoothScroll from './smoothScroll';

const handleMenu = () => {
	const navMenu = document.querySelector('.popup-menu-nav');
	const dialogMenu = document.querySelector('.popup-dialog-menu');
	const menuBtn = document.querySelector('.menu');
	const closeBtn = document.querySelector('.close-menu');
	menuBtn.addEventListener('click', () => {
		dialogMenu.classList.add('active');
	});
	closeBtn.addEventListener('click', () => {
		dialogMenu.classList.remove('active');
	});
	navMenu.addEventListener('click', event => {
		const target = event.target.closest('.popup-menu-nav__item a');
		if (target) {
			smoothScroll(event);
			dialogMenu.classList.remove('active');
		}
	});
};

export default handleMenu;
