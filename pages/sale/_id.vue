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
                        <td>{{ date.date }}</td>
                        <td>{{ date.from }}</td>
                        <td>{{ date.to }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="sale-buttons">
            <button>Get Directions</button>
            <button>Show on Map</button>
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
            sale: null
        }
    },
    computed: {
        dates() {

        }
    },
    created() {

    }
}
</script>