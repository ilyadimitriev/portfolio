const togglePopup = ({
	popupType,
	openBtnClass
}) => {
	const openBtns = document.querySelectorAll(`.${openBtnClass}`);
	const closeBtns = document.querySelectorAll(`.${popupType} .close`);
	const popup = document.querySelector(`.${popupType}`);
	const dialogMenu = document.querySelector('.popup-dialog-menu');
	const html = document.querySelector('html');
	const toggle = (popupType, action, event) => {
		const allPopups = document.querySelectorAll('.popup');
		allPopups.forEach(popup => {
			if (action === 'open') {
				if (popup.classList.contains(`${popupType}`)) {
					popup.style.visibility = `visible`;
					html.style.overflowY = `hidden`;
					if (popupType === `popup-menu`) {
						dialogMenu.classList.add('active');
					}
				} else if (popup.classList.contains(`popup-menu`) && popupType !== `popup-menu`) {
					popup.querySelector('.popup-dialog-menu').classList.remove('active');
					popup.style.visibility = `hidden`;
				}
			} else if (action === 'close') {
				if (popup.classList.contains(`${popupType}`) && event.target === popup || event.target.matches(`.close`)) {
					popup.style.visibility = `hidden`;
					html.style.overflowY = `auto`;
					if (popupType === `popup-menu`) {
						dialogMenu.classList.remove('active');
					}
				}
			}
		});
	};
	openBtns.forEach(btn => {
		btn.addEventListener('click', toggle.bind(null, `${popupType}`, 'open'));
	});
	closeBtns.forEach(btn => {
		btn.addEventListener('click', toggle.bind(null, `${popupType}`, 'close'));
	});
	popup.addEventListener('click', toggle.bind(null, `${popupType}`, 'close'));
};

export default togglePopup;
