<template>
    <div class="w-100 bg-prussian-blue">
        <div class="container">
            <div class="row">
            <div class="col-sm-12 text-white">
                <div>
                    <img :src="store.imgBasePath + apartment.cover_img" alt="" class="w-100">
                </div>
                <div class="pt-3">
                    <h2 class="">{{ apartment.title}}</h2>
                </div>
                <div class="py-2">
                    <h6 class=""> Host Name: <span class="text-danger">{{ apartment.user?.name + ' ' + apartment.user?.surname }}</span></h6>
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
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between py-4">
                    <div>
                        <h4 class=""> Host Name: <span class="text-danger">{{ apartment.user?.name + ' ' + apartment.user?.surname }}</span></h4>
                    </div>
                    <div>
                        <span class="btn btn-primary bg-light text-dark">Contatta l'host</span>
                    </div>
                </div>
            </div>
            <form @submit.prevent="submitForm()" class="text-white fs-3">
            <div class="mb-3">
                <label for="name" class="form-label fs-5">Name</label>
                <input type="text" class="form-control" id="name" aria-describedby="nameHelp" v-model="name">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label fs-5">Surname</label>
                <input type="text" class="form-control" id="surname" aria-describedby="nameHelp" v-model="surname">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label fs-5">Phone Number</label>
                <input type="text" class="form-control" id="phonenumber" aria-describedby="nameHelp" v-model="phonenumber">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label fs-5">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="mb-3">
                <label for="message" class="form-label fs-5">Your Message</label>
                <textarea type="text" class="form-control" id="message" aria-describedby="message" v-model="message"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-info mx-3 bg-light">Reset</button>
        </form>
        </div>
    </div>  
    </div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { store } from '../store.js';
    export default {
        name: 'AppShow',
        data(){
            return {
                store,
                apartment: [],
                // lat: null,
                // lon: null,
            }
        },
        methods:{
            getApartments(){
                let lat 
                let lon
                axios.get(`${this.store.apiUrl}apartments/${this.$route.params.slug}`).then((res) => {
                    this.apartment = res.data;
                    lat = this.apartment.lat
                    lon = this.apartment.lon
                })
                const mapTime = setTimeout(()=>{
                    this.makeMap(lon, lat);

                }, 1500)
            },
            makeMap(lon, lat){
                let center = [ lon, lat ];
                console.log(lat, lon);
                // let center = [this.location[1], this.location[0]];
                const map = tt.map({
                    key: '2HI9GWKpWiwAq3zKIGlnZVdmoLe7u7xs',
                    container: 'map',
                    center: center,
                    zoom:10,                    
                })
                const marker = new tt.Marker().setLngLat(center).addTo(map);
            }, 
        },
        mounted(){
            this.getApartments();
        }, 
        created(){
        }
    }
</script>

<style lang="scss" scoped>
#map {
    aspect-ratio: 21 / 9;
    width: 100%;
    max-height: 100%;
}
</style>