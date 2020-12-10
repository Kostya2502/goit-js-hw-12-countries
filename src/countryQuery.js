const basicURL = 'https://restcountries.eu/rest/v2/name/';

export default {
    fetchCountry(query) {
        const request = `${query}`;
        return fetch(basicURL + request).then(response =>
            response.json());
    },

};