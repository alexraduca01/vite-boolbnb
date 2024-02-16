import { reactive } from 'vue';

export const store = reactive ({
    apiUrl: 'http://localhost:8000/api/',
    imgBasePath: "http://localhost:8000/storage/",
    searchUrl: 'http://localhost:8000/api/search/apartments',
    autocomplete: 'https://api.tomtom.com/search/2/geocode/',
    autocompleteEndPoint: '.json?key=2HI9GWKpWiwAq3zKIGlnZVdmoLe7u7xs',
    viewsUrl: 'http://localhost:8000/api/apartments/',
    viewsEndPoint: '/views',
    apartments: [],
    center: [],
})