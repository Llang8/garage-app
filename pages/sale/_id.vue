<template>
    <div class="sale-page">
        hi
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
                console.log(response);
                return {
                    sale: response
                }
            })
    },
    data() {
        return {
            sale: null
        }
    },
    created() {

    }
}
</script>