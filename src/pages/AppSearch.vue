<template>
    <div>
        <ul>
            <li v-for="item in store.apartments">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js'
    export default {
        name: 'AppSearch',
        data() {
            return{
                store,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>