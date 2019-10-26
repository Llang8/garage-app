<template>
    <div class="mapview">
        <MglMap 
            class="map"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            :center="mapCenter"
            :zoom="mapZoom"
            @load="mapLoad"
        >
<!--             <MarkerComponent
                :color="markerColor",
                :coordinates="markerCoordinates"
            /> -->
        </MglMap>
    </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  data() {
    return {
        accessToken: 'pk.eyJ1IjoibGxhbmc4IiwiYSI6ImNqeWY3MGU0NzAwYnEzbW84NXh4Znh1dGkifQ.S7lFIAyAgTWFYJtmtAiHrg', // your access token. Needed if you using Mapbox maps
        mapStyle: 'mapbox://styles/llang8/cjyjfe40h1hyz1ct9lsgwjsop', // your map style
        mapCenter: {lng: -87.6298, lat: 41.8781},
        markerColor: '#000000',
        mapZoom: 12,
        markerCoordinates: [42,-87]
    };
  },

  methods: {
      mapLoad(map) {
        console.log(map);
      }
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>

<style>

.map {
    width: 100%;
    height: calc(100vh - 50px);
}

</style>