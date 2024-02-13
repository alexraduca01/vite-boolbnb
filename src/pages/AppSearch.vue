<template>
    <div>
        <div class="h-100 bg-rich-black">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">

                    </div>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
import { store } from '../store.js'
import axios from 'axios';
    export default {
        name: 'AppSearch',
        data() {
            return {
                store
            }
        },
        methods: {
            getAllApartments(){
                axios.get(store.apiUrl)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>