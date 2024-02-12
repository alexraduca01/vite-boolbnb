import { reactive } from 'vue';

export const store = reactive ({
    apiUrl: 'http://localhost:8000/api/',
    imgBasePath: "http://localhost:8000/storage/",
    searchUrl: 'http://localhost:8000/api/search/apartments?search=',
    viewsUrl: 'http://localhost:8000/api/apartments/',
    viewsEndPoint: '/views',
    apartments: [],
})