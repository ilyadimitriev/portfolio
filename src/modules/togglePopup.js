const togglePopup = ({
	popupType,
	openBtnClass
}) => {
	const openBtns = document.querySelectorAll(`.${openBtnClass}`);
	const closeBtns = document.querySelectorAll(`.${popupType} .close`);
	const toggle = (popupType, action) => {
		const allPopups = document.querySelectorAll('.popup');
		allPopups.forEach(popup => {
			if (action === 'open') {
				if (popup.classList.contains(`${popupType}`)) {
					popup.style.visibility = `visible`;
					document.body.style.overflowY = `hidden`;
				} else if (popup.classList.contains(`popup-menu`) && popupType !== `popup-menu`) {
					popup.querySelector('.popup-dialog-menu').classList.remove('active');
					popup.style.visibility = `hidden`;
				}
			} else if (action === 'close') {
				if (popup.classList.contains(`${popupType}`)) {
					popup.style.visibility = `hidden`;
					document.body.style.overflowY = `auto`;
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
};

export default togglePopup;
