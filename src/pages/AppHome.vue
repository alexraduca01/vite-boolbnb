<template>
    <div class="position-relative">
        <AppHeader/>
        <div class="h-100 bg-prussian-blue home-container">
            <div class="container py-3">
                <div v-if="store.apartments.length == 0">
                    <h1 class="text-white">No results</h1>
                </div>
                <div class="row" v-else>
                    <router-link v-for="item in store.apartments" @click="postVisuals(item.slug)" class="col-sm-6 col-md-4 col-lg-3 text-white mb-4 text-decoration-none" :to="{name: 'show', params: { slug: item.slug}}">
                        <div v-if="!searchFlag">
                            <div>
                                <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img" :alt="item.title">
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
        <AppFooter style="position: absolute; bottom: 0;"/>
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
        data(){
            return {
                store,
                searchFlag: false,
                userInput: '',
            }
        },
        methods:{
            getApartments(){
                axios.get(store.apiUrl + 'apartments').then((res) => {
                    store.apartments = res.data
                    // console.log(store.apartments);
                })
            },
            postVisuals(apartmentSlug){
                axios.post(store.viewsUrl + apartmentSlug + store.viewsEndPoint).then((res) => {
                    // console.log(res.data);
                })
            },
            
        },
        created(){
            this.getApartments();
        }
    }
</script>

<style lang="scss" scoped>

@use '../assets/style/main.scss' as *;
.home-container {
    padding-bottom: 1200px;
}
.my-img{
    aspect-ratio: 1 / 1;
    width: 100%;
    max-height: 100%;
    border-radius: 15px;
}

@media screen and (min-width: 768px){
    .home-container{
        padding-bottom: 920px;
    }
}

@media screen and (min-width: 992px){
    .home-container{
        padding-bottom: 520px;
        min-height: 100vh;
    }
}

</style>