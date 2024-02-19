<template>
    <div class="w-100 bg-rich-black p-2 position-relative">
        <div class="container text-white p-0">
            <div class="row justify-content-between align-items-center m-0">
                <!-- Logo -->
                <div class="col-2">
                    <router-link to="/" @click="getApartments(), userInput = ''">
                        <img src="/public/images/logo.png" alt="" style="width: 100px;">
                    </router-link>
                </div>

                <!-- Search Bar  -->
                <form class="my-form col-8 d-flex justify-content-between gap-0 gap-lg-5" @submit.prevent @keyup.enter="searchApartments()" autocomplete="off">

                    <div class="input-group flex-nowrap ms-0">
                        <span @click="searchApartments()" style="transform: translate(27px, 6px); z-index: 1000; cursor: pointer;" id="addon-wrapping"><i
                                class="fa-solid text-black fa-magnifying-glass"></i></span>

                        <input type="text" @input.prevent="autocomplete()" list="addressList"
                            v-model="userInput" class="form-control ps-5 rounded-pill" placeholder="Search"
                            aria-label="Username" aria-describedby="addon-wrapping">
                        <datalist id="addressList">
                            <option v-for="item in addressResults" :value="item.address.freeformAddress">
                                {{ item.address.freeformAddress }}
                            </option>
                        </datalist>
                    </div>


                    <!-- Filter -->

                    <div>
                        <span>
                            <span><i class="fa-solid fa-filter" @click.prevent="showOffcanvasMenu(), clearFilters()"
                                    :disabled="filterDisabled" style="transform: translateY(8px);"></i></span>
                        </span>
                    </div>
                    <div v-if="filterOpen && filterDisabled && showMenu" class="offcanvas offcanvas-end text-white bg-rich-black"
                        :class="showMenu ? 'show' : ''" tabindex="-1"
                        :style="{ visibility: showMenu ? 'visible' : 'hidden' }" style="z-index: 5000; position: fixed; height: 100vh; box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="">Filtri</h5>
                            <button type="button" class="btn-close btn-close-white text-reset"
                                @click.prevent="showOffcanvasMenu(), clearFilters()"></button>
                        </div>
                        <div class="offcanvas-body d-flex flex-column gap-2 gap-lg-5 bg-rich-black">

                            <!-- Stanze -->
                            <div class="d-flex gap-4 justify-content-between align-items-center ">
                                <div class="d-flex flex-column align-items-center">
                                    <label for="rooms">Rooms</label>
                                    <input style="width: 60px;" type="number" name="rooms" id="rooms" min="1" v-model="rooms">
                                </div>
                                <div class="d-flex flex-column align-items-center">
                                    <label for="beds">Beds</label>
                                    <input style="width: 60px;" type="number" name="beds" id="beds" min="1" v-model="beds">
                                </div>
                                <div class="d-flex flex-column align-items-center">
                                    <label for="bathrooms">Bathrooms</label>
                                    <input style="width: 60px;" type="number" name="bathrooms" id="bathrooms" min="1" v-model="bathrooms">
                                </div>
                            </div>

                            <!-- Chilometri -->
                            <div id="form-wrapper" class="mt-5 mb-3">
                                <h3 class="fw-bold">Kilometers</h3>
                                <div id="kilometers-amount-slider">
                                    <input type="radio" name="kilometers-amount" id="1" value="10" v-model="radiusInput">
                                    <label for="1" data-kilometers-amount="10km"></label>
                                    <input type="radio" name="kilometers-amount" id="2" value="20" v-model="radiusInput" checked>
                                    <label for="2" checked data-kilometers-amount="20km"></label>
                                    <input type="radio" name="kilometers-amount" id="3" value="30" v-model="radiusInput">
                                    <label for="3" data-kilometers-amount="30km"></label>
                                    <input type="radio" name="kilometers-amount" id="4" value="40" v-model="radiusInput">
                                    <label for="4" data-kilometers-amount="40km"></label>
                                    <input type="radio" name="kilometers-amount" id="5" value="50" v-model="radiusInput">
                                    <label for="5" data-kilometers-amount="50km"></label>
                                    <div id="kilometers-amount-pos"></div>
                                </div>
                            </div>

                            <!-- Servizi -->
                            <div>
                                <h3 class="fw-bold mt-5">Services</h3>
                                <ul class="list-unstyled">
                                    <li class="text-capitalize" v-for="service in services">
                                        <div
                                            class="form-check form-switch d-flex flex-row-reverse justify-content-between p-0 mb-1 mb-lg-3">
                                            <input class="form-check-input" type="checkbox" role="switch"
                                                id="flexSwitchCheckDefault" v-model="selectedServices" :value="service.name">
                                            <label class="form-check-label" for="flexSwitchCheckDefault"><i
                                                    :class="service.icon" class="me-2"></i>{{ service.name }}</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </form>

                <!-- Login -->
                <div class="col-2">
                    <a href="http://localhost:8000/login">login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            userInput: '',
            addressResults: [],
            services: [],
            showMenu: false,
            filterDisabled: false,
            filterOpen: false,
            overflow: false,
            radiusInput: '',
            rooms: null,
            beds: null,
            bathrooms: null,
            selectedServices: [],
        }
    },
    methods: {
        clearFilters(){
            this.rooms = null;
            this.beds = null;
            this.bathrooms = null;
            this.radiusInput = '';
            this.selectedServices = [];
        },
        getApartments(){
            axios.get(store.apiUrl + 'apartments').then((res) => {
                store.apartments = res.data
            })
        },
        searchApartments() {
            this.redirectTo('/search');
            let url = store.searchUrl;
            
            if(this.userInput == ''){
                url += '?search=';
            } else {
                url += '?search=' + this.userInput;
            }

            if(this.radiusInput != ''){
                url += '&radius=' + this.radiusInput;
            }

            if(this.rooms){
                url += '&rooms=' + this.rooms;
            }

            if(this.beds){
                url += '&beds=' + this.beds;
            }

            if(this.bathrooms){
                url += '&bathrooms=' + this.bathrooms;
            }

            if(this.selectedServices.length > 0){
                console.log(this.selectedServices);
                url += '&services=' + this.selectedServices.join(',');
            }

            // if (this.selectedServices.length > 0) {
            //     let servicesQuery = this.selectedServices.join(',');
            //     url += '&services=' + encodeURIComponent(servicesQuery);
            // }
            
            axios.get(url).then((res) => {
                console.log(res.data);
                store.apartments = res.data;
            })
        },
        getServices() {
            axios.get(store.apiUrl + 'services').then((res) => {
                this.services = res.data;
                // console.log(this.services);
            })
        },
        showOffcanvasMenu() {
            this.filterDisabled = true;
            this.filterOpen = true;
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        },
        addOverflowHidden() {
            if(this.overflow == false){
                document.querySelector('body').classList.add('overflow-hidden');
                this.overflow = true;
            } else {
                document.querySelector('body').classList.remove('overflow-hidden');
                this.overflow = false;
            }
            
        },
        autocomplete() {
            if (this.userInput.length >= 5) {
                axios.get(store.autocomplete + this.userInput + store.autocompleteEndPoint)
                    .then(response => {
                        console.log(response.data);
                        this.addressResults = response.data.results;
                    })
                    .catch(error => console.error('Si è verificato un errore durante il recupero dei dati:', error));
            }
        },
        redirectTo(url){
            this.$router.push(url);
        }
    },
    created() {
        this.getServices();
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

$number-of-options: 5;

.my-form {
    max-width: none;
}

#form-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}

form {
    width: 90%;
    max-width: 500px;

    #kilometers-amount-slider {
        display: flex;
        flex-direction: row;
        align-content: stretch;
        position: relative;
        width: 100%;
        height: 50px;
        user-select: none;

        &::before {
            content: " ";
            position: absolute;
            height: 2px;
            width: 100%;
            width: calc(100% * (#{$number-of-options - 1} / #{$number-of-options}));
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
        }

        input,
        label {
            box-sizing: border-box;
            flex: 1;
            user-select: none;
            cursor: pointer;
        }

        label {
            display: inline-block;
            position: relative;
            width: 20%;
            height: 100%;
            user-select: none;

            &::before {
                content: attr(data-kilometers-amount);
                position: absolute;
                left: 50%;
                padding-top: 10px;
                transform: translate(-50%, 45px);
                font-size: 14px;
                letter-spacing: 0.4px;
                font-weight: 400;
                white-space: nowrap;
                opacity: 0.85;
                transition: all 0.15s ease-in-out;
            }

            &::after {
                content: " ";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 30px;
                border: 2px solid white;
                background: #000;
                border-radius: 50%;
                pointer-events: none;
                user-select: none;
                z-index: 1;
                cursor: pointer;
                transition: all 0.15s ease-in-out;
            }

            &:hover::after {
                transform: translate(-50%, -50%) scale(1.25);
            }
        }

        input {
            display: none;

            &:checked {
                +label::before {
                    font-weight: 800;
                    opacity: 1;
                }

                +label::after {
                    border-width: 4px;
                    transform: translate(-50%, -50%) scale(0.75);
                }

                ~#kilometers-amount-pos {
                    opacity: 1;
                }

                @for $i from 1 through $number-of-options {
                    &:nth-child(#{$i * 2 - 1})~#kilometers-amount-pos {
                        left: #{($i * 20%) - 10%};
                    }
                }
            }
        }

        #kilometers-amount-pos {
            display: block;
            position: absolute;
            top: 50%;
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            transition: all 0.15s ease-in-out;
            transform: translate(-50%, -50%);
            border: 2px solid #000;
            opacity: 0;
            z-index: 2;
        }
    }

    &:valid {
        #kilometers-amount-slider {
            input {
                +label::before {
                    transform: translate(-50%, 45px) scale(0.9);
                    transition: all 0.15s linear;
                }

                &:checked+label::before {
                    transform: translate(-50%, 45px) scale(1.1);
                    transition: all 0.15s linear;
                }
            }
        }
    }

    &+button {
        display: block;
        position: relative;
        margin: 56px auto 0;
        padding: 10px 20px;
        appearance: none;
        transition: all 0.15s ease-in-out;
        font-family: inherit;
        font-size: 24px;
        font-weight: 600;
        background: #000;
        border: 2px solid white;
        border-radius: 8px;
        outline: 0;
        user-select: none;
        cursor: pointer;

        &:hover {
            // transform: scale(1.1);
            background: #000;
            color: #fff;

            &:active {
                transform: scale(0.9);
            }
        }

        &:focus {
            background: #4caf50;
            border-color: #4caf50;
            color: #fff;
            pointer-events: none;

            &::before {
                animation: spin 1s linear infinite;
            }
        }

        &::before {
            display: inline-block;
            width: 0;
            opacity: 0;
            content: "\f3f4";
            font-family: "Font Awesome 5 Pro";
            font-weight: 900;
            margin-right: 0;
            transform: rotate(0deg);
        }
    }

    &:invalid+button {
        pointer-events: none;
        opacity: 0.25;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
        width: 24px;
        opacity: 1;
        margin-right: 12px;
    }

    to {
        transform: rotate(360deg);
        width: 24px;
        opacity: 1;
        margin-right: 12px;
    }
}

.overflow-hidden {
    overflow: hidden;
}

@media screen and (max-width: 575px) {
    .offcanvas.offcanvas-end {
        width: 100% !important;
    }
}
</style>