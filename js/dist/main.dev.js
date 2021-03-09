'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var filmlist = document.querySelector(".filmlist"),
    toplist = document.querySelector(".toplist"),
    searchInput = document.querySelector(".search-input"),
    searchClear = document.querySelector(".search-close"),
    cardBox = document.querySelector(".card-flexbox"),
    infocard = document.querySelector(".infocard"),
    popup = document.querySelector(".popup");

var HeroesProg =
/*#__PURE__*/
function () {
  function HeroesProg() {
    _classCallCheck(this, HeroesProg);

    this.fullData = [];
    this.movieNames = [];
    this.idOfSelectedHeroes = [];
  }

  _createClass(HeroesProg, [{
    key: "load",
    value: function load() {
      this.getData("./dbHeroes.json");
      filmlist.addEventListener("input", this.selectFilms.bind(this));
      toplist.addEventListener("click", this.removeFilms.bind(this));
      searchInput.addEventListener("keyup", this.searchFilm.bind(this));
      searchClear.addEventListener("click", this.clearSearch.bind(this));
      cardBox.addEventListener("click", this.showDetailedCard.bind(this));
      popup.addEventListener("click", this.hideDetailedCard.bind(this));
    } // Получаем данные

  }, {
    key: "getData",
    value: function getData(url) {
      var _this = this;

      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.fullData = data.map(function (item) {
          return item;
        });
        var allMovieNames = data.reduce(function (accum, item) {
          return accum.concat(item.movies);
        }, []);
        _this.movieNames = allMovieNames.filter(function (item, i) {
          return allMovieNames.indexOf(item) === i && item;
        });
        _this.movieNames = _this.movieNames.sort();

        _this.formFilmlist();
      });
    } // Анимация карточек

  }, {
    key: "cardsAnimation",
    value: function cardsAnimation(animationType, duration) {
      return new Promise(function (resolve) {
        // const time = (animationType === `accordion`) ? 500 : 400;
        cardBox.querySelectorAll(".card-body").forEach(function (card) {
          card.style.animationDuration = "".concat(duration, "ms");
          card.classList.toggle("card-animate-".concat(animationType));
          card.classList.toggle("card-body-hover");
        });
        setTimeout(function () {
          cardBox.querySelectorAll(".card-body").forEach(function (card) {
            card.classList.toggle("card-animate-".concat(animationType));
            card.classList.toggle("card-body-hover");
            card.style.animationDuration = "";
          });
          resolve();
        }, duration);
      });
    } // Анимация больших карточек

  }, {
    key: "infocardAnnimation",
    value: function infocardAnnimation(animationType, duration) {
      return new Promise(function (resolve) {
        infocard.style.animationDuration = "".concat(duration, "ms");
        infocard.classList.toggle(animationType);
        setTimeout(function () {
          infocard.classList.toggle(animationType);
          infocard.style.animationDuration = "";
          resolve();
        }, duration);
      });
    } // Формируем список фильмов

  }, {
    key: "formFilmlist",
    value: function formFilmlist() {
      var label = document.createElement("label");
      label.classList = "film-name";
      this.movieNames.forEach(function (movie) {
        label.innerHTML = "".concat(movie, "<input class=\"film-input\" type=\"checkbox\"><span class=\"film-checkmark\"></span>");
        filmlist.append(label.cloneNode(true));
      });
    } // Ограничение на ввод в поисковую строку

  }, {
    key: "limitInput",
    value: function limitInput(event) {
      var target = event.target;
      target.value = target.value.replace(/[^\w- :.]/gi, "");
    } // Поиск фильма

  }, {
    key: "searchFilm",
    value: function searchFilm(event) {
      this.limitInput(event);
      var value = event.target.value.trim();
      var reg = new RegExp(value, "i");
      var films = document.querySelectorAll(".film-name");
      films.forEach(function (film) {
        if (!reg.test(film.textContent)) {
          film.style.display = "none";
        } else {
          film.style.display = "block";
        }
      });
    } // Сбросить фильтр имен фильмов

  }, {
    key: "clearSearch",
    value: function clearSearch(event) {
      var input = event.target.nextElementSibling;

      if (input.value !== "") {
        input.value = "";
        var films = document.querySelectorAll(".film-name");
        films.forEach(function (film) {
          return film.style.display = "block";
        });
      }
    } // Записать слово с заглавной буквы

  }, {
    key: "capitalize",
    value: function capitalize(word) {
      try {
        if (word.split(" ").length < 2 && !/[^a-z]+/ig.test(word)) {
          return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word;
        }
      } catch (_unused) {
        return word;
      }
    } // Добавить карточки

  }, {
    key: "addCards",
    value: function addCards(filmName) {
      var _this2 = this;

      // Узнаем id героев, которые есть в выбранном фильме и еще не выведены на экран
      var heroesId = this.fullData.reduce(function (accum, elem, id) {
        // Отсечем героев без фильмов
        if (elem.movies) {
          // Проверим, был ли герой в выбранном фильме и нет ли его среди выведенных карточек
          if (elem.movies.some(function (movie) {
            return movie === filmName;
          }) && !_this2.idOfSelectedHeroes.includes(id)) {
            return accum.concat(id);
          } else {
            return accum;
          }
        } else {
          return accum;
        }
      }, []); // // Добавим id новых героев

      this.idOfSelectedHeroes = [].concat(_toConsumableArray(this.idOfSelectedHeroes), _toConsumableArray(heroesId)); // Создаем карточки для новых героев

      var card = document.createElement("div");
      card.classList = "card-body card-body-hover";
      heroesId.forEach(function (heroId) {
        var hero = _this2.fullData[heroId];
        card.id = "card".concat(heroId);
        card.innerHTML = "\n\t\t\t\t<div class=\"card-header\">\n\t\t\t\t\t<span class=\"card-name\">".concat(hero.name, "</span>\n\t\t\t\t\t<span class=\"card-species\">").concat(_this2.capitalize(hero.species), "</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-inner\">\n\t\t\t\t\t<div class=\"gender-container\">\n\t\t\t\t\t\t<div class=\"gender-box\"><img class=\"gender-img\" src=\"/img/white-icon/").concat(hero.gender, ".png\" alt=\"\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"status-container\">\n\t\t\t\t\t\t<div class=\"status-box\"><img class=\"status-img\" src=\"/img/white-icon/").concat(hero.status, ".png\" alt=\"\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t");
        card.querySelector(".card-inner").style.backgroundImage = "url('./".concat(hero.photo, "')");
        cardBox.append(card.cloneNode(true));
      }); // Анимируем карточки

      if (this.idOfSelectedHeroes > heroesId) {
        this.cardsAnimation("accordion", 500);
      } else {
        this.cardsAnimation("decompose", 400);
      }
    } // Убрать карточки

  }, {
    key: "removeCards",
    value: function removeCards() {
      var _this3 = this;

      var films = toplist.querySelectorAll(".toplist-film");

      if (films.length !== 0) {
        // Получим список оставшихся выбранных фильмов
        var selectedFilms = [];
        films.forEach(function (film) {
          selectedFilms.push(film.textContent);
        });
        var cardsToDelete = [];
        this.cardsAnimation("compose", 250).then(function () {
          _this3.idOfSelectedHeroes.forEach(function (heroId) {
            var hero = _this3.fullData[heroId]; // Если среди фильмов героя нет ни одного из оставшихся фильмов, то удаляем его

            if (!hero.movies.some(function (film) {
              return selectedFilms.some(function (selectedFilm) {
                return selectedFilm === film;
              });
            })) {
              var cardToRemove = document.getElementById("card".concat(heroId));
              cardToRemove.remove();
              cardsToDelete.push(heroId);
            }
          });

          _this3.cardsAnimation("decompose", 250); // Удаляем из памяти приложения id удаленных карточек


          _this3.idOfSelectedHeroes = _this3.idOfSelectedHeroes.filter(function (heroId) {
            return !cardsToDelete.some(function (id) {
              return id === heroId;
            });
          });
        });
      } else {
        // Если выбранных фильмов не осталось
        this.cardsAnimation("compose", 400).then(function () {
          cardBox.innerHTML = "";
          _this3.idOfSelectedHeroes = [];
        });
      }
    } // Показать подробную информацию

  }, {
    key: "showDetailedCard",
    value: function showDetailedCard(event) {
      var _this4 = this;

      var card = event.target.closest(".card-body");

      if (card) {
        var heroId = card.id.match(/\d+/)[0];
        var hero = this.fullData[heroId];
        popup.style.display = "block"; // Формируем содержимое карточки

        var buildformElem = function buildformElem(infoType, comment, hero) {
          if (hero[infoType]) {
            var thmlContent = "<div class=\"infocard-info infocard-".concat(infoType.toLowerCase(), "\" style=\"dispay: flex\">\n\t\t\t\t\t\t<span class=\"infocard-info-type\">").concat(comment, "</span>\n\t\t\t\t\t\t<p class=\"infocard-info-data\">").concat(_this4.capitalize(hero[infoType]), "</p>\n\t\t\t\t\t</div>");
            return thmlContent;
          } else {
            return "";
          }
        };

        var realName = buildformElem("realName", "Real name:", hero);
        var species = buildformElem("species", "Species:", hero);
        var citizenship = buildformElem("citizenship", "Citizenship:", hero);
        var gender = buildformElem("gender", "Gender:", hero);
        var birthDay = buildformElem("birthDay", "Birthday:", hero);
        var deathday = buildformElem("deathDay", "Deathday:", hero);
        var status = buildformElem("status", "Status:", hero);
        var actors = buildformElem("actors", "Actor:", hero);
        infocard.innerHTML = "<div class=\"infocard-body\">\n\t\t\t\t\t<div class=\"infocard-photo\" style=\"background-image: url('./".concat(hero.photo, "')\"></div>\n\t\t\t\t\t<div class=\"infocard-text-container\">\n\t\t\t\t\t\t<h2 class=\"infocard-name\">").concat(hero.name, "</h2>\n\t\t\t\t\t\t").concat(realName).concat(species).concat(citizenship).concat(gender).concat(birthDay).concat(deathday).concat(status).concat(actors, "\n\t\t\t\t\t\t<div class=\"infocard-info infocard-movies\">\n\t\t\t\t\t\t\t<span class=\"infocard-info-type\">Movies:</span>\n\t\t\t\t\t\t\t<p class=\"infocard-info-data\">").concat(hero.movies.join("<br>"), "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"infocard-close close\"></button>\n\t\t\t\t</div>\n\t\t\t");
        this.infocardAnnimation("infocard-fadein", 300);
      }
    } // Скрыть подробную информацию

  }, {
    key: "hideDetailedCard",
    value: function hideDetailedCard(event) {
      var target = event.target === popup ? event.target : event.target.closest(".infocard-close") ? event.target.closest(".infocard-close") : undefined;

      if (target) {
        this.infocardAnnimation("infocard-fadeout", 300).then(function () {
          infocard.innerHTML = "";
          popup.style.display = "none";
        });
      }
    } // Добавить фильмы к фильтру

  }, {
    key: "selectFilms",
    value: function selectFilms(event) {
      var target = event.target.closest(".film-input");
      var filmTarget = event.target.closest(".film-name");
      var filmName = filmTarget.textContent;

      if (target.checked) {
        var topfilm = document.createElement("div");
        topfilm.classList = "toplist-film";
        topfilm.innerHTML = "".concat(filmName, "<button class=\"close toplist-close\"></button>");
        toplist.append(topfilm.cloneNode(true));
        this.addCards(filmName);
      } else {
        toplist.querySelectorAll(".toplist-film").forEach(function (film) {
          if (film.textContent === filmName) {
            film.remove();
          }
        });
        this.removeCards();
      }
    } // Убрать фильм из фильтра

  }, {
    key: "removeFilms",
    value: function removeFilms(event) {
      var filmTarget = event.target.closest(".toplist-film");
      var target = event.target.closest(".toplist-close");
      var filmName = filmTarget.textContent;

      if (target) {
        filmlist.querySelectorAll(".film-name").forEach(function (film) {
          if (film.textContent === filmName) {
            var input = film.querySelector(".film-input");
            input.checked = false;
          }
        });
        filmTarget.remove();
        this.removeCards();
      }
    }
  }]);

  return HeroesProg;
}(); // Запуск программы по готовности страницы


document.addEventListener("DOMContentLoaded", function () {
  var prog = new HeroesProg();
  prog.load();
}); // Поменял метод определения id карточек, которые нужно добавить на экран