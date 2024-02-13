<template>
    <div id="map"></div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
    export default {
        name: 'AppMap',
        data(){
            return{
                marker: null
            }
        },
        methods: {
            makeMap(){
                let center = [4, 44.5]
                let markerPos = [4, 44.4]
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
            this.makeMap();
        }
    }
</script>

<style lang="scss" scoped>
#map {
    width: 100%;
    height: 100vh;
}
</style>