<template>
    <div class="sale-page">
        <div class="image-carousel">
            <div class="img-wrapper" v-for="image in sale.images">
                <img :src="image" :alt="sale.title">
            </div>
        </div>
        <div class="sale-title">
            <h1>{{ sale.title }}</h1>
        </div>
        <div class="sale-city">
            <h2>{{ sale.city }}</h2>
        </div>
        <div class="sale-description">
            <p>{{ sale.description }}</p>
        </div>
        <div class="sale-categories">
            <p><strong>Categories:</strong> 
                <span v-for="category in sale.categories" class="category">{{ category }} </span>
            </p>
        </div>
        <div class="sale-dates-wrapper">
            <div class="sale-dates">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                    <tr v-for="(date, index) in sale.dates">
                        <td>{{ months[parseInt(date.date.split('-')[1]) - 1] }} {{ date.date.split('-')[2] }}{{nth(date.date.split('-')[2])}}, {{ date.date.split('-')[0] }}</td>
                        <td>{{ parseTime(date.from) }}</td>
                        <td>{{ parseTime(date.to) }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="sale-buttons">
            <button @click="openMaps(sale)" class="btn btn-secondary">Get Directions</button>
            <nuxt-link :to="{ path: '/mapview', query: { lat: sale.geopoint[0], lng: sale.geopoint[1] }}" class="btn btn-primary">Show on Map</nuxt-link>
        </div>
    </div>
</template>

<script>
import { db } from "../../plugins/firebase";

export default {
/*     validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },    */
    async asyncData({params}) {
        console.log('Params:', params);
        return db.collection('sales').doc(params.id).get()
            .then((response) => {
                console.log(response.data());
                return {
                    sale: response.data()
                }
            })
    },
    generate: {
        fallback: 'sale/sale.html'
    },
    data() {
        return {
            sale: null,
            months: ['January','February','March','April','May','June','July','August','September','October','November','December']
        }
    },
    methods: {
        openMaps(sale) {
            let lat = sale.geopoint[0];
            let lng = sale.geopoint[1];
            /* if we're on iOS, open in Apple Maps */
            if
                ((navigator.platform.indexOf("iPhone") != -1) || 
                (navigator.platform.indexOf("iPad") != -1) || 
                (navigator.platform.indexOf("iPod") != -1)) {
                window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
            /* else use Google */
            } else {
                window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
            }
        },
        nth(d) {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        },
        parseTime(time) {
            let hour = parseInt(time.split(':')[0]);
            if (hour == 12) {
                return time + ' PM';
            }
            else if (hour > 12) {
                return hour - 12 + ':' + time.split(':')[1] + ' PM';
            } else {
                return time + ' AM';
            }
        }
    }
}
</script>