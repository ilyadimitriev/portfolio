import smoothScroll from './smoothScroll';

const handleMenu = () => {
	const navMenu = document.querySelector('.popup-menu-nav');
	const dialogMenu = document.querySelector('.popup-dialog-menu');
	const popup = document.querySelector(`.popup-menu`);
	const html = document.querySelector('html');
	navMenu.addEventListener('click', event => {
		const target = event.target.closest('.popup-menu-nav__item a');
		if (target) {
			smoothScroll(event);
			dialogMenu.classList.remove('active');
			popup.style.visibility = `hidden`;
			html.style.overflowY = `auto`;
		}
	});
};

export default handleMenu;
