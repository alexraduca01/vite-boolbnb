<template>
    <div class="position-relative">
        <AppHeader />
        <div class="h-100 bg-prussian-blue home-container">
            <div class="container py-3">
                <div v-if="store.apartments.length == 0">
                    <h1 class="text-white">No results</h1>
                </div>
                <div class="row" v-else>
                    <router-link v-for="item in store.apartments" @click="postVisuals(item.slug)"
                        class="col-sm-6 col-md-4 col-lg-3 text-white text-decoration-none"
                        :to="{ name: 'show', params: { slug: item.slug } }">
                        <div v-if="!searchFlag" class="position-relative">
                            <div class="position-relative">
                                <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img" :alt="item.title">
                                <div style="position: absolute; top: 10px; left: 10px;">
                                    <div class="d-flex gap-5">
                                        <div v-if="item.sponsors.length > 0">
                                            <span class="badge rounded-pill text-bg-warning text-uppercase"><i class="fa-solid fa-crown"></i> premium</span>
                                        </div>
                                        <div class="position-relative" style="transform: translateY(5px);">
                                            <h6 class="fw-bold">Hosted by: {{ item.user.name }}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="box">
                                    <h5 class="m-0">{{ item.title }}</h5>
                                    <span style="font-size: 0.7rem;">{{ item.address }}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <AppFooter style="position: absolute; bottom: 0;" />
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue';
export default {
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            store,
            searchFlag: false,
            userInput: '',
            imgApartment: [],
        }
    },
    methods: {
        getApartments() {
            axios.get(store.apiUrl + 'apartments').then((res) => {
                store.apartments = res.data
            })
        },
        postVisuals(apartmentSlug) {
            axios.post(store.viewsUrl + apartmentSlug + store.viewsEndPoint).then((res) => {
                // console.log(res.data);
            })
        },
    },
    created() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

.box {
    position: relative;
    bottom: 65px;
    left: 8px;
    background-color: rgb(0, 0, 0, 0.6);
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 15px;
    width: 95%;
    // border-bottom-right-radius: 15px;
    // border-bottom-left-radius: 15px;
}

.fa-crown {
    transform: translateY(-1px);
}

.badge {
    font-size: 1rem;
}

.home-container {
    padding-bottom: 1200px;
}

.my-img {
    aspect-ratio: 6 / 5;
    width: 100%;
    max-height: 100%;
    border-radius: 15px;
}

@media screen and (min-width: 768px) {
    .home-container {
        padding-bottom: 920px;
    }
}

@media screen and (min-width: 992px) {
    .home-container {
        padding-bottom: 520px;
        min-height: 100vh;
    }
}
</style>