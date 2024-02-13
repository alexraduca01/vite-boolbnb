<template>
    <div>
        <img :src="store.imgBasePath + apartment.cover_img" alt="" class="w-100">
    </div>
    <div class="container bg-prussian-blue">
        <div class="row">
            <div class="col-sm-12 text-white">
                <div class="pt-3">
                    <h2 class="fst-italic">{{ apartment.title}}</h2>
                </div>
                <div class="py-2">
                    <h6 class="fst-italic"> Host Name: <span class="text-danger">{{ apartment.user.name + ' ' + apartment.user.surname }}</span></h6>
                </div>
                <h5 class="py-2">Cosa troverai:</h5>
                <div>
                    <p><i class="fa-solid fa-building"></i> Rooms: {{apartment.rooms}}</p>
                    <p><i class="fa-solid fa-bed"></i> Bedrooms: {{ apartment.beds }}</p>
                    <p><i class="fa-solid fa-bath"></i> Bathrooms: {{ apartment.bathrooms }}</p>
                </div>
                <h6>Services</h6>
                <!-- <div v-for="service in apartment.service">
                    <ul>
                        <li>{{ service }}</li>
                    </ul>
                </div> -->
                <div>
                    <h4>Dove ti troverai</h4>
                    <h4>Mappa TomTom</h4>
                </div>
                <div>
                    <h4>Nome Host</h4>
                    <span class="btn btn-primary bg-light text-dark">Contatta l'host</span>
                </div>
                <div id="map"></div>
            </div>
        </div>
    </div>  
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';
    export default {
        name: 'AppShow',
        data(){
            return {
                store,
                apartment: [],
            }
        },
        methods:{
            getApartments(){
                axios.get(`${this.store.apiUrl}apartments/${this.$route.params.slug}`).then((res) => {
                    this.apartment = res.data
                    console.log(this.apartment);
                })
            },
        },
        created(){
            this.getApartments();
        }
    }
</script>

<style lang="scss" scoped>

</style>