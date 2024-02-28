<template>
    <div v-if="loaderFlag">
        <LoaderComponent />
    </div>
    <div v-else class="position-relative">
        <AppHeader />
        <div class="h-100 bg-prussian-blue home-container">
            <div class="container py-4">
                <div v-if="store.apartments.length == 0">
                    <h1 class="text-white">No apartments found :(</h1>
                </div>
                <div class="row" v-else>
                    <p class="fs-5 text-white">Found {{ store.apartments.length }} results</p>
                    <router-link v-for="item in store.apartments" @click="postVisuals(item.slug)"
                        class="col-12 col-md-6 col-lg-4 mb-5 text-white text-decoration-none"
                        :to="{ name: 'show', params: { slug: item.slug } }">
                        <div class="position-relative card-container" v-if="!searchFlag">
                            <swiper :slidesPerView="1" :loop="true" :navigation="true" :modules="modules" @swiper="onSwiper"
                                @slideChange="onSlideChange" class="mySwiper rounded-swiper default-slider">
                                <swiper-slide>
                                    <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img"
                                        :alt="item.title">
                                </swiper-slide>
                                <swiper-slide v-for="image in item.images">
                                    <img class="img-fluid my-img" :src="store.imgBasePath + image.url" alt="" />
                                </swiper-slide>
                            </swiper>
                            <div style="position: absolute; top: 10px; left: 10px; z-index: 1000;">
                                <div class="d-flex gap-5">
                                    <div v-if="item.sponsors.length > 0">
                                        <span class="badge rounded-pill text-bg-warning text-uppercase">
                                            <i class="fa-solid fa-crown"></i> premium</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="box">
                                    <h5 class="m-0">{{ item.title }}</h5>
                                    <span style="font-size: 0.7rem;">{{ item.address }}</span>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
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
        LoaderComponent,
        Swiper,
        SwiperSlide
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation],
        };
    },
    methods: {
        postVisuals(apartmentSlug) {
            axios.post(store.viewsUrl + apartmentSlug + store.viewsEndPoint).then((res) => {
                // console.log(res.data);
            })
        },
        loading() {
            const loading = setTimeout(() => {
                this.loaderFlag = false;
            }, 1000);
        }
    },
    mounted() {
        this.loading();
    }
}


</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

.card-container:hover {
    transform: scale(1.05);
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
    width: 96.5%;
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