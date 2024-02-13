<template>
    <div id="map"></div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import {store} from '../store.js';
    export default {
        name: 'AppMap',
        data(){
            return{
                store
            }
        },
        methods: {
            makeMap(){
                const map = tt.map({
                    key: '2HI9GWKpWiwAq3zKIGlnZVdmoLe7u7xs',
                    container: 'map',
                    center: store.center,
                    zoom:10,
                    
                })
                const marker = new tt.Marker().setLngLat(store.center).addTo(map);
            },
        },
        mounted(){
            this.makeMap();
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