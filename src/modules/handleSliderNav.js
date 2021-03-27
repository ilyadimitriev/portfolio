const handleSliderNav = ({
	nav, 				//(Обязательный) Блок, в котором находятся слайды навигации и кнопки влево/вправо
	navSlideClass,		//(Обязательный) Слайд навигации
	leftArrowClass,		//(Обязательный) Кнопка влево
	rightArrowClass,	//(Обязательный) Кнопка вправо
	breakpoint,			//(Обязательный) С какой ширины окна отображается 1 слайд навигации
	elseToAdd,			//Действия для выполнения на НОВОМ слайде при смене слайда
	elseToRemove		//Действия для выполнения на ПРЕДЫДУЩЕМ слайде при смене слайда
}) => {
	const navElem = document.querySelector(nav);
	const navSlideAllElems = navElem.querySelectorAll(navSlideClass);

	let currentSlide = 0;

	navElem.addEventListener('click', event => {
		if (window.innerWidth > breakpoint) {
			const target = event.target.closest(navSlideClass);
			if (target) {
				// Если нажали на активный слайд, то далее ничего не выполняем
				if (target.classList.contains('active')) {
					return;
				} else {
					let newSlide;
					navSlideAllElems.forEach((elem, index) => {
						// Действия с предыдущим активным слайдом
						if (elem.classList.contains('active')) {
							if (elseToRemove) {
								elseToRemove(currentSlide);
							}
							elem.classList.remove('active');
						}
						// Запоминаем индекс нового активного слайда
						if (elem === target) {
							newSlide = index;
						}
					});

					//Действия с новым активныйм слайдом
					currentSlide = newSlide;
					target.classList.add('active');
					if (elseToAdd) {
						elseToAdd(currentSlide);
					}
				}
			}
		// Для переключения слайдов если отображается 1 слайд навигации
		} else {
			const target = event.target;
			// Узнаем индекс активного слайда
			navSlideAllElems.forEach((elem, index) => {
				if (elem.classList.contains('active')) {
					currentSlide = index;
				}
			});
			// Если переключили слайд, совершаем действия с предыдущим активным слайдом
			if (target.closest(leftArrowClass)) {
				navSlideAllElems[currentSlide].classList.remove('active');
				if (elseToRemove) {
					elseToRemove(currentSlide);
				}
				currentSlide--;
			} else if (target.closest(rightArrowClass)) {
				navSlideAllElems[currentSlide].classList.remove('active');
				if (elseToRemove) {
					elseToRemove(currentSlide);
				}
				currentSlide++;
			} else {
				return;
			}
			if (currentSlide < 0) {
				currentSlide = navSlideAllElems.length - 1;
			}
			if (currentSlide > navSlideAllElems.length - 1) {
				currentSlide = 0;
			}

			// Действия с новым активным слайдом
			navSlideAllElems[currentSlide].classList.add('active');
			if (elseToAdd) {
				elseToAdd(currentSlide);
			}
		}
	});
};

export default handleSliderNav;
