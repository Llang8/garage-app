<template>
    <div class="mysales">
        <div class="flex-row">
            <nuxt-link to="/createsale" class="create-sale">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-add-circle"><circle cx="12" cy="12" r="10" class="primary"/><path class="secondary" d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"/></svg>
                Create a Sale
            </nuxt-link>
        </div>
        <div v-if="sales.length == 0">
            <p>You have no sales yet</p>
            <nuxt-link to="/createsale">Create One</nuxt-link>
        </div>
        <div class="results-container" v-else>
            <div class="result" v-for="(sale, index) in sales">
                <img :src="sale.images[0]" :alt="sale.title">
                <nuxt-link 
                :to="{name:'sale-id', params: {id: sale.id}}"
              >
                <h2 class="sale-title">{{ sale.title }}</h2>
              </nuxt-link>
              <h3 class="sale-town">{{ sale.city }}, {{ sale.state }}</h3>
              <p class="sale-description" v-if="sale.description">{{ sale.description.substring(0, 200) }}...</p>
              <div class="sale-buttons">
                <nuxt-link
                  to="{name:'sale-id', params: {id: sale.id}}"
                  class="btn btn-primary"
                >
                  See More
                </nuxt-link>
                <nuxt-link
                  :to="{name:'sale-id', params: {id: sale.id}}"
                  class="btn btn-secondary"
                >
                  Edit Sale
                </nuxt-link>
                <nuxt-link
                  :to="{name:'sale-id', params: {id: sale.id}}"
                  class="btn btn-secondary"
                >
                    Delete Sale
              </nuxt-link>
              </div>
              <p class="categories"><span class="categories-label">Categories:</span><br /><span v-for="(category, index) in sale.categories" class="category"> {{ category }}</span></p> 
              <p class="distance"><span class="distance-value">{{ Math.floor(Math.random() * 26) }}</span> Miles</p>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '~/plugins/firebase';

export default {
    data() {
        return {
            sales: []
        }
    },
    created() {
        db.collection('sales').where('uid', "==", this.$store.state.user.uid).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.sales.push({ id: doc.id, ...doc.data()});
                    
                })
            })
            .catch(e => {
                console.log('Error: ', e);
            });
    }
}
</script>