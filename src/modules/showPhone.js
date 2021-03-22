const showPhone = () => {
	const btn = document.querySelector('.header-contacts__arrow');
	const secondNumber = document.querySelector('.header-contacts__phone-number-accord');
	btn.addEventListener('click', () => {
		btn.classList.toggle('active');
		secondNumber.classList.toggle('active');
	});
};

export default showPhone;
