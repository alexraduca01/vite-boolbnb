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
                        class="col-sm-6 col-md-4 col-lg-3 text-white mb-4 text-decoration-none"
                        :to="{ name: 'show', params: { slug: item.slug } }">
                        <div v-if="!searchFlag">
                            <div class="position-relative">
                                <swiper :slidesPerView="1" :loop="true" :pagination="{
                                    clickable: true,
                                }" :modules="modules" class="mySwiper">
                                    <swiper-slide>
                                        <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img"
                                            :alt="item.title">
                                    </swiper-slide>
                                    <swiper-slide v-for="image in item.images">
                                        <img  class="img-fluid my-img"
                                            :src="store.imgBasePath + image.url" alt="">
                                    </swiper-slide>
                                </swiper>
                                <div v-if="item.sponsors.length > 0">
                                    <span class="badge rounded-pill text-bg-warning text-uppercase"><i
                                            class="fa-solid fa-crown"></i> premium</span>
                                </div>
                            </div>
                            <div>
                                <div class="my-2">
                                    <h5 class="m-0">{{ item.title }}</h5>
                                    <span style="font-size: 0.7rem;">{{ item.address }}</span>
                                </div>
                                <h6>Offered by: {{ item.user.name }}</h6>
                                <div class="d-flex flex-column gap-1">
                                    <div class="d-flex gap-2">
                                        <i class="fa-solid fa-couch"></i>
                                        <div style="line-height: 15px;">{{ item.rooms }}</div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <i class="fa-solid fa-bed"></i>
                                        <div style="line-height: 15px;">{{ item.beds }}</div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <i class="fa-solid fa-bath"></i>
                                        <div class="ps-1" style="line-height: 15px;">{{ item.bathrooms }}</div>
                                    </div>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
export default {
    components: {
        AppHeader,
        AppFooter,
        Swiper,
        SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination, Navigation],
      };
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


.fa-crown {
    transform: translateY(-1px);
}

.badge {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1rem;
}

.home-container {
    padding-bottom: 1200px;
}

.my-img {
    aspect-ratio: 1 / 1;
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