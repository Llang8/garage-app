<template>
    <div class="filter settings-content-wrapper">
        <h1 class="settings-page-title">Filter</h1>
        <div class="settings-item settings-edit">
            <p>Chicago, Illinois</p>
            <p>Edit</p>
        </div>
        <div class="settings-item settings-distance">
            <p class="settings-title">Distance</p>
            <p class="settings-text">{{ distance }} Miles</p>
            <div class="slider-container">
                <div class="slider-labels">
                    <p>0 Miles</p>
                    <p>25 Miles</p>
                    <p>50 Miles</p>
                    <p>75 Miles</p>
                    <p>100 Miles</p>
                </div>
                <input v-model="distance" type="range" min="1" max="100" value="50" class="settings-slider" id="distance-slider">
            </div>
        </div>
        <div class="settings-item">
            <p class="settings-title">Sort By</p>
            <p>Distance</p>
        </div>
        <div class="settings-item settings-categories">
            <p class="settings-title">Categories</p>
            <div class="categories">
                <div class="settings-category">
                    <p class="category-name">Bikes</p>
                    <p class="delete-category">X</p>
                </div>
                <div class="settings-category">
                    <p class="category-name">Clothing</p>
                    <p class="delete-category">X</p>
                </div>
                <div class="settings-category">
                    <p class="category-name">Toys</p>
                    <p class="delete-category">X</p>
                </div>
            </div>
            
            <button>+ Add Category</button>
        </div>
        <div class="settings-apply">
            <div class="settings-item">
                <p>Apply Changes</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'settings',
    created() {
    },
    data() {
        return {
            distance: 50
        }
    }
}

</script>

<style>

</style>