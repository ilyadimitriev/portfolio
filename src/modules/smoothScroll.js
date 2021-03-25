const smoothScroll = event => {
	event.preventDefault();
	const target = event.target.closest('a');
	if (target) {
		const destination = target.getAttribute(`href`);
		document.querySelector(destination).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
};

export default smoothScroll;
