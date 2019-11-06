<template>
<div class="bookmarks">
    <div class="results-container">
        <div class="result" v-for="(sale, index) in sales" :key="sale.id">
            {{ sale.bookmarkId }}
            <img :src="sale.images[0]" :alt="sale.title">
            <svg @click="removeBookmark(sale.bookmarkId)" version="1.1"  width="9" height="18"  style="float: right; margin-left: 5px;enable-background:new 0 0 9 18;" id="Layer_1" x="0px" y="0px"
            viewBox="0 0 9 18">
                <path class="st0" d="M8.4,18c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.1L4.5,14L1,17.8C0.9,17.9,0.8,18,0.7,18s-0.2,0-0.3,0
                    c-0.1,0-0.2-0.1-0.3-0.2C0,17.6,0,17.5,0,17.4V0.6c0-0.1,0-0.2,0-0.2c0-0.1,0.1-0.1,0.1-0.2C0.2,0.1,0.3,0.1,0.4,0
                    c0.1,0,0.1,0,0.2,0h7.8c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0.1,0.2,0.1C8.9,0.2,8.9,0.3,9,0.4c0,0.1,0,0.2,0,0.2v16.7c0,0.1,0,0.2,0,0.2
                    c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.1-0.1,0.1-0.2,0.1C8.6,18,8.5,18,8.4,18z M4.5,12.5c0.1,0,0.2,0,0.2,0c0.1,0,0.1,0.1,0.2,0.1l2.9,3.1
                    V1.3H1.2v14.6l2.9-3.1c0.1-0.1,0.1-0.1,0.2-0.1C4.3,12.5,4.4,12.5,4.5,12.5z"/>
                <rect y="0.9" class="st1" width="9" height="12.3"/>
                <polygon class="st1" points="0.5,12.6 4.8,13 1.1,16.9 "/>
                <polygon class="st1" points="8.5,12.4 8,16.6 4.4,13.2 "/>
            </svg>     
            <nuxt-link 
            :to="{name:'sale-id', params: {id: sale.id}}"
            >
            <h1 class="sale-title">{{ sale.title }}</h1>
            </nuxt-link>
            <h2 class="sale-town">{{ sale.city }}, {{ sale.state }}</h2>
            <p class="sale-description">{{ sale.description.substring(0, 300) }}...</p>
            <p class="categories"><strong>Categories:</strong><span v-for="(category, index) in sale.categories"> {{ category }}</span></p> 
            <h3 class="distance">{{ Math.floor(Math.random() * 26) }} Miles</h3>
            <hr />
        </div>
    </div>
</div>
</template>

<script>

export default {
data() {
    return {
    }
},
created() {
    this.$store.dispatch('getBookmarks', {
        uid: this.$store.state.user.uid
    })
    .then(() => {
    })
},
computed: {
    sales() {
        return this.$store.state.bookmarks;
    }
},
methods: {
    removeBookmark(id) {
      this.$store.dispatch('removeBookmark', {
        id: id
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      })
    }
}
}
</script>

<style lang="scss">
@import '../assets/root.scss';

.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#4C6085;}
.st1{fill:#4C6085;}

</style>
