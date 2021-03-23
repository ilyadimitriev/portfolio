const accordionQA = () => {
	const accordion = document.querySelector('.accordion');
	accordion.addEventListener('click', event => {
		const target = event.target.closest('.title_block');
		if (target) {
			if (target.classList.contains('msg-active')) {
				target.classList.remove('msg-active');
			} else {
				target.classList.add('msg-active');
			}
		}
	});
};

export default accordionQA;
