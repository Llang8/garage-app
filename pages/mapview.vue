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
          <MglMarker
            :coordinates.sync="mapCenterArr"
            color="blue"
          />
          <MglMarker
            v-for="(sale,index) in salesPositions"
            :coordinates.sync="sale"
            color="green"
          />
        </MglMap>
    </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglMarker
  },
  data() {
    return {
        accessToken: 'pk.eyJ1IjoibGxhbmc4IiwiYSI6ImNqeWY3MGU0NzAwYnEzbW84NXh4Znh1dGkifQ.S7lFIAyAgTWFYJtmtAiHrg', // your access token. Needed if you using Mapbox maps
        mapStyle: 'mapbox://styles/llang8/cjyjfe40h1hyz1ct9lsgwjsop', // your map style
        /* mapCenter: {lng: -87.6298, lat: 41.8781}, */
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
  },
  mounted() {
    if(this.$store.state.position === null) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.$store.commit('setUserPosition', {
          position: position.coords
        });
      });
    }
    if (this.$store.state.sales === []) {
      this.$store.dispatch('getSales')
        .then(() => {
          console.log(this.$store.state.sales);
        })
      this.$store.dispatch('getBookmarks', {
        uid: this.$store.state.user.uid
      })
    }
  },
  computed: {
    sales() {
      return this.$store.state.sales;
    },
    mapCenter() {
      console.log(this.$store.state.position);
      if(this.$store.state.position) {
        return {
          lat: this.$store.state.position.latitude,
          lng: this.$store.state.position.longitude,
        }
      } else {
        return {
          lat: 41.878,
          lng: -87.629
        }
      }
    },
    mapCenterArr() {
      return [this.mapCenter.lng,this.mapCenter.lat];
    },
    salesPositions() {
      return this.$store.state.sales.map((sale) => {
        if (sale.geopoint[0] === undefined || sale.geopoint[1] === undefined) {
          return [0,0];
        }
        let tmp = sale.geopoint[1];
        sale.geopoint[1] = sale.geopoint[0];
        sale.geopoint[0] = tmp;
        console.log(sale.geopoint)
        return sale.geopoint;
      })
    }
  }
};
</script>

<style lang="scss">
@import '../assets/root.scss';

.map {
    width: 100%;
    height: calc(100vh - 50px);
}

</style>