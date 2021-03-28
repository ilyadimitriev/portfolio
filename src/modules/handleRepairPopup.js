import SliderCarousel from '../plugins/sliderCarousel';
import handleSliderNav from './handleSliderNav';

const handleRepairPopup = () => {
	const nav = document.querySelector('.nav-list-popup-repair');
	const table = document.querySelector('.popup-repair-types-content-table');
	const lastUpdate = document.querySelector('.popup-repair-types-content__head-date');
	const categoryHeadTitle = document.querySelector('.popup-repair-types-content__head-title');

	let tableAll;
	let allCategories;

	let repairPopupCarousel;

	fetch('./db/db.json')
		.then(response => {
			if (response.status !== 200) {
				throw new Error(`Возникла ошибка при отправки данных`);
			} else {
				return response.json();
			}
		})
		.then(data => {
			// Сохраняем полученные данные
			const fullData = [...data];
			// Получаем список категорий
			const serviceCategories = fullData.reduce((accum, item) => accum.concat(item), []);

			// Отображаем дату обновления данных
			lastUpdate.textContent = fullData[0].date;

			// Шаблон для создания категории в навигации
			const category = document.createElement('button');
			category.classList = 'button_o popup-repair-types-nav__item';

			// Шаблон для списка услуг и цен
			const repairTypesList = document.createElement('table');
			repairTypesList.classList = 'popup-repair-types-content-table__list';
			repairTypesList.innerHTML = '<tbody></tbody>';
			const tr = document.createElement('tr');
			tr.classList = 'mobile-row';

			serviceCategories.forEach(item => {
				if (item.title) {
					category.textContent = item.title;
					nav.appendChild(category.cloneNode(true));

					// Формируем список услуг и цен
					repairTypesList.querySelector('tbody').innerHTML = '';
					item.priceList.forEach(elem => {
						const unit = (elem.units === 'м2') ? 'м<sup>2</sup>' : elem.units;
						tr.innerHTML = `
							<td class="repair-types-name">${elem.typeService}</td>
							<td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
							<td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
							<td class="repair-types-value">${unit}</td>
							<td class="repair-types-value">${elem.cost} руб.</td>
						`;
						repairTypesList.querySelector('tbody').appendChild(tr.cloneNode(true));
					});
					table.appendChild(repairTypesList.cloneNode(true));
				}
			});

			// Отмечаем первую категорию как активную
			nav.querySelector('.popup-repair-types-nav__item').classList.add('active');
			table.querySelector('.popup-repair-types-content-table__list').classList.add('active');

			// После формирования списка услуг и цен получаем список нужных далее элементов
			tableAll = document.querySelectorAll('.popup-repair-types-content-table__list');
			allCategories = document.querySelectorAll('.popup-repair-types-nav__item');

			// Слайдер навигации
			repairPopupCarousel = new SliderCarousel({
				wrap: `.nav-list-popup-repair`,
				main: `.nav-wrap-repair-popup`,
				prev: '#nav-arrow-popup-repair_left',
				next: '#nav-arrow-popup-repair_right',
				slidesToShow: false,
				infinity: true,
				responsive: [
					{
						breakpoint: 1024,
						slidesToShow: 2
					},
					{
						breakpoint: 768,
						slidesToShow: 1
					}
				]
			});
			repairPopupCarousel.init();

			handleSliderNav({
				nav: '.nav-wrap-repair-popup',
				navSlideClass: '.popup-repair-types-nav__item',
				leftArrowClass: '#nav-arrow-popup-repair_left',
				rightArrowClass: '#nav-arrow-popup-repair_right',
				breakpoint: 768,
				elseToAdd(currentSlide) {
					tableAll[currentSlide].classList.add('active');
					categoryHeadTitle.textContent = allCategories[currentSlide].textContent;
					// Передаем выбранный вариант, чтобы слайдер навигации фокусировался на выбранном варианте при смене отоброжаемого количества вариантов
					repairPopupCarousel.setPosition(currentSlide);
				},
				elseToRemove(currentSlide) {
					tableAll[currentSlide].classList.remove('active');
				}
			});

			// Сглаживаю ошибку верстальщика, чтоб при неадекватной верстке блок все равно смотрелся нормально
			const resizeRepairPopup = () => {
				if (window.innerHeight < document.querySelector('.popup-dialog-repair-types').clientHeight) {
					document.querySelector('.popup-dialog-repair-types').style.transform = `scale(${window.innerHeight / (document.querySelector('.popup-dialog-repair-types').clientHeight)})`;
				} else {
					document.querySelector('.popup-dialog-repair-types').style.transform = '';
				}
			};
			resizeRepairPopup();
			window.addEventListener('resize', resizeRepairPopup);

		})
		.catch(error => {
			console.log(error);
		});
};

export default handleRepairPopup;
