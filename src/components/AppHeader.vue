<template>
    <div class="w-100 bg-rich-black p-2">
        <div class="container text-white p-0">
            <div class="row justify-content-between align-items-center m-0">
                <!-- Logo -->
                <div class="col-2">
                    <img src="/public/images/logo.png" alt="" style="width: 100px;">
                </div>

                <!-- Search Bar  -->
                <div class="col-7">
                    <div class="input-group flex-nowrap">
                        <span style="transform: translate(27px, 6px); z-index: 1000;" id="addon-wrapping"><i
                                class="fa-solid text-black fa-magnifying-glass"></i></span>
                        <input type="text" @keyup.enter="searchApartments()" v-model="userInput"
                            class="form-control ps-5 rounded-pill" placeholder="Search" aria-label="Username"
                            aria-describedby="addon-wrapping">
                    </div>
                </div>

                <!-- Filter -->
                <div class="col-1">
                    <div class="container">
                        <span class="float-start">
                            <span><i class="fa-solid fa-filter" @click.prevent="showOffcanvasMenu()"></i></span>
                        </span>
                    </div>
                    <div class="offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" tabindex="-1"
                        :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="">Offcanvas with backdrop</h5>
                            <button type="button" class="btn-close text-reset"
                                @click.prevent="showOffcanvasMenu()"></button>
                        </div>
                        <div class="offcanvas-body">
                            <p>.....</p>
                        </div>
                    </div>
                </div>

                <!-- Login -->
                <div class="col-2">
                    <a href="http://localhost:8000">login</a>
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
            showMenu: false,
        }
    },
    methods: {
        searchApartments() {
            axios.get(store.searchUrl + this.userInput).then((res) => {
                console.log(res.data);
                store.apartments = res.data;
            })
        },
        showOffcanvasMenu() {
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        }
    },
}
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

@media screen and (max-width: 575px){
    .offcanvas.offcanvas-end {
        width: 100% !important;
    }
}
</style>