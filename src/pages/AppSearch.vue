<template>
    <div v-if="loaderFlag">
        <LoaderComponent />
    </div>
    <div v-else class="position-relative">
        <AppHeader />
        <div class="h-100 bg-prussian-blue home-container">
            <div class="container py-4">
                <div v-if="store.apartments.length == 0">
                    <h1 class="text-white">No aparments found :(</h1>
                </div>
                <div class="row" v-else>
                    <router-link v-for="item in store.apartments" @click="postVisuals(item.slug)"
                        class="col-sm-6 col-md-4 col-lg-3 mb-5 text-white text-decoration-none"
                        :to="{ name: 'show', params: { slug: item.slug } }">
                        <div class="position-relative card-container" v-if="!searchFlag">
                            <div>
                                <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img" :alt="item.title">
                                <div style="position: absolute; top: 10px; left: 10px;">
                                    <div class="d-flex gap-5">
                                        <div v-if="item.sponsors.length > 0">
                                            <span class="badge rounded-pill text-bg-warning text-uppercase"><i class="fa-solid fa-crown"></i> premium</span>
                                        </div>
                                        <div class="position-relative" style="transform: translateY(1px);">
                                            <h6 class="fw-bold hosted-by">Hosted by: <span class="text-capitalize">{{ item.user.name }}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class=" box">
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
import { store } from '../store.js';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
export default {
    name: 'AppSearch',
    data() {
        return {
            store,
            searchFlag: false,
            loaderFlag: true,
        }
    },
    components: {
        AppFooter,
        AppHeader,
        LoaderComponent
    },
    methods: {
        postVisuals(apartmentSlug) {
            axios.post(store.viewsUrl + apartmentSlug + store.viewsEndPoint).then((res) => {
                // console.log(res.data);
            })
        },
        loading(){
            const loading = setTimeout(() => {
                this.loaderFlag = false;
            }, 2000);
        }
    },
    mounted(){
        this.loading();
    }
}


</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

.card-container:hover{
    transform: scale(1.1);
    box-shadow: 0 0 15px rgb(255, 255, 255, 0.6);
}

.card-container {
    transition: all 0.3s linear;
    border-radius: 15px;
}

.hosted-by {
    background-color: rgb(0, 0, 0, 0.6);
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
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
.box {
    position: absolute;
    bottom: 10px;
    left: 8px;
    background-color: rgb(0, 0, 0, 0.6);
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 15px;
    width: 95%;
    z-index: 1000;
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