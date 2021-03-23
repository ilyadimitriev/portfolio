const showHint = () => {
	const problems = document.getElementById('problems');
	problems.addEventListener('mouseenter', event => {
		if (screen.width > 1024) {
			const target = event.target.closest('.problems-item__icon');
			if (target) {
				const popup = target.querySelector('.problems-item-popup');
				popup.style.visibility = 'visible';
				if (popup.getBoundingClientRect().top < 0) {
					popup.style.transform = `translateY(${popup.offsetHeight + 120}px)`;
					popup.classList.add('rotateUp');
				} else if (popup.getBoundingClientRect().bottom > screen.height) {
					popup.style.transform = `translateY(-${popup.offsetHeight + 180}px)`;
					popup.classList.add('rotateDown');
				}
				target.addEventListener('mouseleave', () => {
					popup.style.visibility = 'hidden';
					popup.classList.remove('rotateUp');
					popup.classList.remove('rotateDown');
					popup.style = '';
				});
			}
		}
	}, true);
};

export default showHint;
