<template>
    <div class="w-100 bg-prussian-blue">
        <div class="bg-rich-black">
            <div class="container">   
            <div class="row bg-rich-black py-2">
            <div class="col-sm-12">
                <router-link to="/">
                    <img src="/public/images/logo.png" alt="" style="width: 100px;">
                </router-link>
            </div>
            </div>
            </div>
        </div>
            <div class="container">
            <div class="row">
            <div class="col-sm-12 p-0 text-white">
                <div class="">
                    <img :src="store.imgBasePath + apartment.cover_img" alt="" class="w-100">
                </div>
                <div class="pt-3">
                    <h2 class="">{{ apartment.title}}</h2>
                </div>
                <div class="d-flex w-75 justify-content-between pt-3 align-items-center">
                    <div>
                        <img class="bg-black rounded-circle w-25" src="/public/images/logo.png" alt="">
                    </div>
                    <span class="d-flex"> Host Name: <span class="text-danger">{{ apartment.user?.name + ' ' + apartment.user?.surname }}</span></span>
                </div>
                <h5 class="pt-4">What you will find:</h5>
                <div class="d-flex flex-column">
                    <span class="fs-5"><i class="fa-solid fa-building"></i> Rooms: {{apartment.rooms}}</span>
                    <span class="fs-5"><i class="fa-solid fa-bed"></i> Bedrooms: {{ apartment.beds }}</span>
                    <span class="fs-5"><i class="fa-solid fa-bath"></i> Bathrooms: {{ apartment.bathrooms }}</span>
                </div>
                <h5 class="pt-4">Services:</h5>
                <div >
                    <ul class="list-unstyled d-flex flex-column align-content-center gap-1">
                        <li v-for="service in services" class="fs-5"><i :class="service.icon" class=""></i> {{ service.name }}</li>
                    </ul>
                </div>
                <div>
                    <h4>Location:</h4>
                    <div class="row">
                        <div class="col-sm-12 rounded-top">
                            <div id="map" class="rounded"></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between py-4">
                    <div>
                        <h4 class=""> Host Name: <span class="text-danger">{{ apartment.user?.name + ' ' + apartment.user?.surname }}</span></h4>
                    </div>
                </div>
            </div>
            <div>
            <div>
                <span class="float-start">
                    <button class="btn btn-primary bg-light text-dark" type="button" @click.prevent="showOffcanvasMenu()">
                        Contact Host
                    </button>
                </span>
            </div>
            <div class="offcanvas offcanvas-bottom" :class="showMenu ? 'show' : ''" tabindex="-1"
                :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close text-reset" @click.prevent="showOffcanvasMenu()"></button>
                </div>
                <div class="offcanvas-body">
                    <form @submit.prevent="contactForm()" class="text-white fs-3">
                        <div class="mb-3">
                            <label for="name" class="form-label fs-6 text-black">Name</label>
                            <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label fs-6 text-black">Surname</label>
                            <input type="text" class="form-control" id="surname" name="surname" aria-describedby="nameHelp" v-model="surname">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label fs-6 text-black">Phone Number</label>
                            <input type="text" class="form-control" id="phone_number" name="phone_number" aria-describedby="nameHelp" v-model="phone_number">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label fs-6 text-black">Email address</label>
                            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label fs-6 text-black">Your Message</label>
                            <textarea type="text" class="form-control" id="body" name="body" aria-describedby="body" v-model="message"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send</button>
                        <button type="reset" class="btn btn-info mx-3 bg-light">Reset</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>  
    <AppFooter/>
    </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { store } from '../store.js';
    export default {
        name: 'AppShow',
        components: {
            AppFooter
        },
        data(){
            return {
                store,
                apartment: [],
                services: [],
                showMenu: false,
                name: '',
                surname: '',
                phone_number: '',
                email: '',
                body: ''
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
                    this.services = this.apartment.services
                    console.log(this.apartment);
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
            contactForm(){
                const formData = {
                    name: this.name,
                    surname: this.surname,
                    phone_number: this.phonenumber,
                    email: this.email,
                    body: this.message
                }
                axios
                .post(`${this.store.apiUrl}apartments/${this.$route.params.slug}/message`, formData)
                .then((res)=>{
                    console.log(res.data);
                    this.name = '';
                    this.surname = '';
                    this.phone_number = '';
                    this.email = '';
                    this.body = '';
                }).catch((err)=>{
                    console.log(err);
                })
            },
            showOffcanvasMenu(){
            this.showMenu ? this.showMenu = false : this.showMenu = true;
            }
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

@media screen and (max-width: 575px) {
    .offcanvas.offcanvas-bottom {
        width: 100% !important;
        height: 100% !important;
    }
}
</style>