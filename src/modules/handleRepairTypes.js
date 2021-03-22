import showPopup from './showPopup';

const handleRepairTypes = () => {
	const repairBtns = document.querySelectorAll('.link-popup-repair');
	repairBtns.forEach(btn => {
		btn.addEventListener('click', showPopup.bind(null, 'popup-repair-types'));
	});
};

export default handleRepairTypes;
