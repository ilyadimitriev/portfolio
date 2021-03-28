const accordionQA = () => {
	const accordion = document.querySelector('.accordion');
	const allAccordions = document.querySelectorAll('.title_block');
	accordion.addEventListener('click', event => {
		const target = event.target.closest('.title_block');
		if (target) {
			allAccordions.forEach(elem => {
				if (elem.classList.contains('msg-active')) {
					elem.classList.remove('msg-active');
				}
			});
			target.classList.add('msg-active');
		}
	});
};

export default accordionQA;
