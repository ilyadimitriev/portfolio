const showHint = () => {
	const problems = document.getElementById('formula');
	const allProblemsDesktop = problems.querySelectorAll('.row .formula-item');

	allProblemsDesktop.forEach(elem => {
		elem.addEventListener('mouseenter', () => {
			if (screen.width > 1024) {
				const popup = elem.querySelector('.formula-item-popup');
				elem.classList.add('active-item');
				if (popup.getBoundingClientRect().top < 0) {
					popup.style.transform = `translateY(${popup.offsetHeight + 120}px)`;
					elem.classList.add('rotateUp');
				}
				elem.addEventListener('mouseleave', () => {
					elem.classList.remove('active-item');
					elem.classList.remove('rotateUp');
					elem.classList.remove('rotateDown');
					popup.style = '';
				});
			}
		});
	});
};

export default showHint;
