const showPopup = selectedPopup => {
	const allPopups = document.querySelectorAll('.popup');
	allPopups.forEach(popup => {
		// если содержит переданный класс, то отображаем
		if (popup.classList.contains(`${selectedPopup}`)) {
			popup.style.visibility = `visible`;
			// если это меню, то закрываем
		} else if (popup.classList.contains(`popup-menu`)) {
			popup.querySelector('.popup-dialog-menu').classList.remove('active');
		}
	});
};

export default showPopup;

