<template>
    <div class="w-100 bg-rich-black p-2">
        <div class="container text-white">
            <div class="row justify-content-between align-items-center">
                <div class="col-sm-10">
                    <div class="input-group flex-nowrap">
                        <span style="transform: translate(27px, 6px); z-index: 1000;" id="addon-wrapping"><i class="fa-solid text-black fa-magnifying-glass"></i></span>
                        <input type="text" @keyup.enter="searchApartments()" v-model="userInput" class="form-control ps-5 rounded-pill" placeholder="Search" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                </div>
                <div class="col-sm-2">
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
        data(){
            return{
                store,
                userInput: '',
            }
        },
        methods: {
            searchApartments(){
                axios.get(store.searchUrl + this.userInput ).then((res) => {
                    console.log(res.data);
                    store.apartments = res.data;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

@use '../assets/style/main.scss' as *;

</style>