<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div>
                    <h3>{{ apartment.title}}</h3>
                </div>
                <div>
                    <img :src="store.imgBasePath + apartment.cover_img" alt="" class="w-100">
                </div>
                <div>
                    <h6>Rooms: {{apartment.rooms}}</h6>
                    <h6>Bedrooms: {{ apartment.beds }}</h6>
                    <h6>Bathrooms: {{ apartment.bathrooms }}</h6>
                </div>
                <div>
                    <h6> Host Name: {{ apartment.user.name + ' ' + apartment.user.surname }}</h6>
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
                    <span class="btn btn-primary">Contatta l'host</span>
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