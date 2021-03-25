import StaticSlider from '../plugins/staticSlider';

const toggleRepairTypes = () => {
	const repairTypesBox = document.querySelector('.nav-list-repair');
	const repairTypesSliders = document.querySelectorAll('.repair-types-slider>div');
	let repairSlider;
	const createSlider = sliderId => {
		repairSlider = new StaticSlider({
			wrap: `#${sliderId}`,
			main: `.repair-types-slider-wrap`,
			prev: '#repair-types-arrow_left',
			next: '#repair-types-arrow_right',
			counter: '#repair-counter'
		});
	};
	createSlider('types-repair1');
	repairSlider.init();
	repairTypesBox.addEventListener('click', event => {
		const target = event.target.closest('.repair-types-nav__item');
		if (target) {
			if (target.classList.contains('active')) {
				return;
			} else {
				repairSlider.remove();
				const dataType = target.dataset.name;
				repairTypesBox.querySelectorAll('.repair-types-nav__item').forEach((elem, index) => {
					elem.classList.remove('active');
					repairTypesSliders[index].classList.remove('active');
					if (elem.dataset.name === dataType) {
						repairTypesSliders[index].classList.add('active');
						createSlider(repairTypesSliders[index].id);
						repairSlider.init();
					}
				});
				target.classList.add('active');
			}
		}
	});
};

export default toggleRepairTypes;
