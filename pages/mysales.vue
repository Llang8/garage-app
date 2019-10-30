<template>
    <div class="mysales">
        <div v-if="sales.length == 0">
            <p>You have no sales yet</p>
            <nuxt-link to="/createsale">Create One</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sales: []
        }
    }
}
</script>

<style>
.mysales {
    text-align: center;
    padding-top: 15px;
}
</style>