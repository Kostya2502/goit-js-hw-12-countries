import countrySearch from './countryQuery.js';
import refs from './refs';
import 'lodash';
import oneCountryInfo from './oneCountry.hbs';
import countriesList from './manyCountries.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error } = require('@pnotify/core');

function getCountry(e) {
    e.preventDefault();
    clearCountriesContainer();
    const searchQuery = e.target.value;

    countrySearch.fetchCountry(searchQuery).then(data => {
        if (data.length > 10) {
            error({
                text: "Пожалуйста, введите более конкретный запрос!"
            });
        } else if (data.status === 404) {
            error({
                text: "Страна не найдена"
            });
        } else if (data.length === 1) {
            listMarkup(data, oneCountryInfo);
        } else if (data.length <= 10) {
            listMarkup(data, countriesList);
        }
    }).catch(Error => {
        Error({ text: "Вы должны ввести параметры запроса!" })
    })
}

function listMarkup(countries, template) {
    const markup = countries.map(country => template(country)).join();
    refs.countriesContainer.insertAdjacentHTML('afterbegin', markup)
}

function clearCountriesContainer() {
    refs.countriesContainer.innerHTML = '';
}

refs.searchForm.addEventListener('input', _.debounce(getCountry, 500));