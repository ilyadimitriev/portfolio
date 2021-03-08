'use strict';

const filmlist = document.querySelector(`.filmlist`),
	toplist = document.querySelector(`.toplist`),
	searchInput = document.querySelector(`.search-input`),
	searchClear = document.querySelector(`.search-close`),
	cardBox = document.querySelector(`.card-flexbox`),
	infocard = document.querySelector(`.infocard`),
	popup = document.querySelector(`.popup`);

class HeroesProg {

	constructor() {
		this.fullData = [];
		this.movieNames = [];
		this.idOfSelectedHeroes = [];
	}
	load() {
		this.getData(`./dbHeroes.json`);
		filmlist.addEventListener(`input`, this.selectFilms.bind(this));
		toplist.addEventListener(`click`, this.removeFilms.bind(this));
		searchInput.addEventListener(`keyup`, this.searchFilm.bind(this));
		searchClear.addEventListener(`click`, this.clearSearch.bind(this));
		cardBox.addEventListener(`click`, this.showDetailedCard.bind(this));
		popup.addEventListener(`click`, this.hideDetailedCard.bind(this));
	}
	// Получаем данные
	getData(url) {
		return fetch(url).then(response => response.json())
			.then(data => {
				this.fullData = data.map(item => item);
				const allMovieNames = data.reduce((accum, item) => accum.concat(item.movies), []);
				this.movieNames = allMovieNames.filter((item, i) => allMovieNames.indexOf(item) === i && item);
				this.movieNames = this.movieNames.sort();
				this.formFilmlist();
			});
	}
	// Анимация карточек
	cardsAnimation(animationType) {
		return new Promise(resolve => {
			const time = (animationType === `accordion`) ? 500 : 400;
			cardBox.querySelectorAll(`.card-body`).forEach(card => {
				card.classList.toggle(`card-animate-${animationType}`);
				card.classList.toggle(`card-body-hover`);
			});
			setTimeout(() => {
				cardBox.querySelectorAll(`.card-body`).forEach(card => {
					card.classList.toggle(`card-animate-${animationType}`);
					card.classList.toggle(`card-body-hover`);
				});
				resolve();
			}, time);
		});
	}
	// Анимация больших карточек
	infocardAnnimation(animationType) {
		return new Promise(resolve => {
			infocard.classList.toggle(animationType);
			setTimeout(() => {
				infocard.classList.toggle(animationType);
				resolve();
			}, 300);
		});
	}
	// Формируем список фильмов
	formFilmlist() {
		const label = document.createElement(`label`);
		label.classList = `film-name`;
		this.movieNames.forEach(movie => {
			label.innerHTML = `${movie}<input class="film-input" type="checkbox"><span class="film-checkmark"></span>`;
			filmlist.append(label.cloneNode(true));
		});
	}
	// Ограничение на ввод в поисковую строку
	limitInput(event) {
		const target = event.target;
		target.value = target.value.replace(/[^\w- :.]/gi, ``);
	}
	// Поиск фильма
	searchFilm(event) {
		this.limitInput(event);
		const value = event.target.value.trim();
		const reg = new RegExp(value, `i`);
		const films = document.querySelectorAll(`.film-name`);
		films.forEach(film => {
			if (!reg.test(film.textContent)) {
				film.style.display = `none`;
			} else {
				film.style.display = `block`;
			}
		});
	}
	// Сбросить фильтр имен фильмов
	clearSearch(event) {
		const input = event.target.nextElementSibling;
		if (input.value !== ``) {
			input.value = ``;
			const films = document.querySelectorAll(`.film-name`);
			films.forEach(film => film.style.display = `block`);
		}
	}
	// Записать слово с заглавной буквы
	capitalize(word) {
		try {
			if (word.split(` `).length < 2 && !/[^a-z]+/ig.test(word)) {
				return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
			} else {
				return word;
			}
		} catch {
			return word;
		}
	}
	// Добавить карточки
	addCards(filmName) {
		// Запомним, какие уже есть карточки
		const prevCardsId = this.idOfSelectedHeroes;
		// Узнаем id героев, которые есть в выбранном фильме
		const heroesId = this.fullData.reduce((accum, elem, id) => {
			// Отсечем героев без фильмов
			if (elem.movies) {
				// Проверим, был ли герой в выбранном фильме
				if (elem.movies.some(movie => movie === filmName)) {
					return accum.concat(id);
				} else {
					return accum;
				}
			} else {
				return accum;
			}
		}, []);

		// Добавим id только тех героев, которые еще не выведены на экран
		this.idOfSelectedHeroes = [...new Set([...heroesId, ...this.idOfSelectedHeroes])];

		// Создаем карточки на основе полученной информации
		const card = document.createElement(`div`);
		card.classList = `card-body card-body-hover`;
		this.idOfSelectedHeroes.forEach(heroId => {
			// Если такой карточки еще не выведено, то добавляем ее
			if (!prevCardsId.some(elem => elem === heroId)) {
				const hero = this.fullData[heroId];
				card.id = `card${heroId}`;
				card.innerHTML = `
					<div class="card-header">
						<span class="card-name">${hero.name}</span>
						<span class="card-species">${this.capitalize(hero.species)}</span>
					</div>
					<div class="card-inner">
						<div class="gender-container">
							<div class="gender-box"><img class="gender-img" src="/img/white-icon/${hero.gender}.png" alt=""></div>
						</div>
						<div class="status-container">
							<div class="status-box"><img class="status-img" src="/img/white-icon/${hero.status}.png" alt=""></div>
						</div>
					</div>
				`;
				card.querySelector(`.card-inner`).style.backgroundImage = `url('./${hero.photo}')`;
				cardBox.append(card.cloneNode(true));
			}
		});
		// Анимируем карточки
		if (prevCardsId.length > 0) {
			this.cardsAnimation(`accordion`);
		} else {
			this.cardsAnimation(`decompose`);
		}
	}
	// Убрать карточки
	removeCards() {
		const films = toplist.querySelectorAll(`.toplist-film`);
		if (films.length !== 0) {
			// Получим список оставшихся выбранных фильмов
			const selectedFilms = [];
			films.forEach(film => {
				selectedFilms.push(film.textContent);
			});
			this.cardsAnimation(`accordion`);
			const cardsToDelete = [];
			this.idOfSelectedHeroes.forEach(heroId => {
				const hero = this.fullData[heroId];
				// Если среди фильмов героя нет ни одного из оставшихся фильмов, то удаляем его
				if (!hero.movies.some(film => selectedFilms.some(selectedFilm => selectedFilm === film))) {
					const cardToRemove = document.getElementById(`card${heroId}`);
					cardToRemove.remove();
					cardsToDelete.push(heroId);
				}
			});
			// Удаляем из памяти приложения id удаленных карточек
			this.idOfSelectedHeroes = this.idOfSelectedHeroes.filter(heroId => !cardsToDelete.some(id => id === heroId));
		} else {	// Если выбранных фильмов не осталось
			this.cardsAnimation(`compose`).then(() => {
				cardBox.innerHTML = ``;
				this.idOfSelectedHeroes = [];
			});
		}
	}
	// Показать подробную информацию
	showDetailedCard(event) {
		const card = event.target.closest(`.card-body`);
		if (card) {
			const heroId = card.id.match(/\d+/)[0];
			const hero = this.fullData[heroId];
			popup.style.display = `block`;
			// Формируем содержимое карточки
			const buildformElem = (infoType, comment, hero) => {
				if (hero[infoType]) {
					const thmlContent =
					`<div class="infocard-info infocard-${infoType.toLowerCase()}" style="dispay: flex">
						<span class="infocard-info-type">${comment}</span>
						<p class="infocard-info-data">${this.capitalize(hero[infoType])}</p>
					</div>`;
					return thmlContent;
				} else {
					return ``;
				}
			};
			const realName = buildformElem(`realName`, `Real name:`, hero);
			const species = buildformElem(`species`, `Species:`, hero);
			const citizenship = buildformElem(`citizenship`, `Citizenship:`, hero);
			const gender = buildformElem(`gender`, `Gender:`, hero);
			const birthDay = buildformElem(`birthDay`, `Birthday:`, hero);
			const deathday = buildformElem(`deathDay`, `Deathday:`, hero);
			const status = buildformElem(`status`, `Status:`, hero);
			const actors = buildformElem(`actors`, `Actor:`, hero);

			infocard.innerHTML =
				`<div class="infocard-body">
					<div class="infocard-photo" style="background-image: url('./${hero.photo}')"></div>
					<div class="infocard-text-container">
						<h2 class="infocard-name">${hero.name}</h2>
						${realName}${species}${citizenship}${gender}${birthDay}${deathday}${status}${actors}
						<div class="infocard-info infocard-movies">
							<span class="infocard-info-type">Movies:</span>
							<p class="infocard-info-data">${hero.movies.join(`<br>`)}</p>
						</div>
					</div>
					<button class="infocard-close close"></button>
				</div>
			`;
			this.infocardAnnimation(`infocard-fadein`);
		}
	}
	// Скрыть подробную информацию
	hideDetailedCard(event) {
		const target = (event.target === popup) ? event.target :
			(event.target.closest(`.infocard-close`)) ? event.target.closest(`.infocard-close`) : undefined;
		if (target) {
			this.infocardAnnimation(`infocard-fadeout`).then(() => {
				infocard.innerHTML = ``;
				popup.style.display = `none`;
			});
		}
	}
	// Добавить фильмы к фильтру
	selectFilms(event) {
		const target = event.target.closest(`.film-input`);
		const filmTarget = event.target.closest(`.film-name`);
		const filmName = filmTarget.textContent;
		if (target.checked) {
			const topfilm = document.createElement(`div`);
			topfilm.classList = `toplist-film`;
			topfilm.innerHTML = `${filmName}<button class="close toplist-close"></button>`;
			toplist.append(topfilm.cloneNode(true));
			this.addCards(filmName);
		} else {
			toplist.querySelectorAll(`.toplist-film`).forEach(film => {
				if (film.textContent === filmName) {
					film.remove();
				}
			});
			this.removeCards();
		}
	}
	// Убрать фильм из фильтра
	removeFilms(event) {
		const filmTarget = event.target.closest(`.toplist-film`);
		const target = event.target.closest(`.toplist-close`);
		const filmName = filmTarget.textContent;
		if (target) {
			filmlist.querySelectorAll(`.film-name`).forEach(film => {
				if (film.textContent === filmName) {
					const input = film.querySelector(`.film-input`);
					input.checked = false;
				}
			});
			filmTarget.remove();
			this.removeCards();
		}
	}
}

// Запуск программы по готовности страницы
document.addEventListener(`DOMContentLoaded`, () => {
	const prog = new HeroesProg();
	prog.load();
});
