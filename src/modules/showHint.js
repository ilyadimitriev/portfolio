const showHint = () => {
	const problems = document.getElementById('problems');
	const allProblems = problems.querySelectorAll('.problems-item');
	allProblems.forEach(elem => {
		elem.addEventListener('mouseenter', () => {
			if (window.innerWidth > 1024) {
				const popup = elem.querySelector('.problems-item-popup');
				elem.classList.add('active-item');
				if (popup.getBoundingClientRect().top < 0) {
					popup.style.transform = `translateY(${popup.offsetHeight + 120}px)`;
					elem.classList.add('rotateUp');
				} else if (popup.getBoundingClientRect().bottom > window.innerHeight) {
					popup.style.transform = `translateY(-${popup.offsetHeight + 180}px)`;
					elem.classList.add('rotateDown');
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
