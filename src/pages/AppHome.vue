<template>
    <div class="h-100 bg-rich-black">
        <div class="container">
            <div class="row">
                <router-link v-for="item in store.apartments" class="col-sm-6 col-md-4 col-lg-3 text-white mb-4 text-decoration-none" :to="{name: 'show', params: { slug: item.slug}}">
                    <div>
                        <img class="img-fluid my-img" :src="store.imgBasePath + item.cover_img" :alt="item.title">
                    </div>
                    <div>
                        <div class="my-2">
                            <h5 class="m-0">{{ item.title }}</h5>
                            <span style="font-size: 0.7rem;">{{ item.address }}</span>
                        </div>
                        <h6>Offerta da: {{ item.user.name }}</h6>
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
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js'
    export default {
        data(){
            return {
                store,
            }
        },
        methods:{
            getApartments(){
                axios.get(store.apiUrl + 'apartments').then((res) => {
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].visible == 1){
                            store.apartments.push(res.data[i]);
                        }
                    }
                    // console.log(store.apartments);
                })
            }
        },
        created(){
            this.getApartments();
        }
    }
</script>

<style lang="scss" scoped>

@use '../assets/style/main.scss' as *;

.my-img{
    aspect-ratio: 1 / 1;
    width: 100%;
    max-height: 100%;
    border-radius: 15px;
}

</style>