<template>
    <div class="filter settings-content-wrapper">
        <h1 class="settings-page-title">Filter</h1>
        <div class="settings-item settings-edit">
            <p>Chicago, Illinois</p>
            <p @click="changeLocation()">Edit</p>
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
        <div class="settings-item" @click="changeSort">
            <p class="settings-title">Sort By</p>
            <p>{{ sortBy }}</p>
        </div>
        <div class="settings-item settings-categories">
            <p class="settings-title">Categories</p>
            <div class="categories">
                <div v-for="(category, index) in checkedCategories" class="settings-category">
                    <p class="category-name">{{ category.name }}</p>
                    <p class="delete-category" @click="removeCategory(category)">X</p>
                </div>
            </div>
            <button @click="addCategory()">+ Add Categories</button>
        </div>
        <div class="settings-categories_modal" v-if="showCategoryPicker">
            <div class="close-button" @click="showCategoryPicker = false">X</div>
            <h2>Select Categories:</h2>
            <div class="category-picker">
                <ul class="category-selection">
                    <li v-for="category in categories">
                        <input type="checkbox" :name="category.name" v-model="category.checked" :id="category.name">
                        <label :for="category.name">{{category.name}}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="settings-categories_modal" v-if="showCategoryPicker">
            <div class="close-button" @click="showCategoryPicker = false">X</div>
            <h2>Select Categories:</h2>
            <div class="category-picker">
                <ul class="category-selection">
                    <li v-for="category in categories">
                        <input type="checkbox" :name="category.name" v-model="category.checked" :id="category.name">
                        <label :for="category.name">{{category.name}}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="settings-categories_modal" v-if="showLocationEditor">
            <div class="close-button" @click="showLocationEditor = false">X</div>
            <h2>Choose City:</h2>
            <input type="text" name="City" id="autocomplete" placeholder="City...">
        </div>
        <div class="settings-categories_modal" v-if="showSortPicker">
            <div class="close-button" @click="showSortPicker = false">X</div>
            <h2>Choose Sort Method:</h2>
            <div class="category-picker">
                <ul class="category-selection">
                    <li v-for="sort in sorts">
                        <input type="radio" name="sort" v-model="sortBy" :id="sort" :value="sort">
                        <label :for="sort">{{sort}}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="settings-apply">
            <div class="settings-item">
                <p>Apply Changes</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'settings',
    created() {
    },
    data() {
        return {
            distance: 50,
            categories: [{
                name: 'Clothes',
                checked: false
            },{
                name: 'Toys',
                checked: false
            },{
                name: 'Kids Clothes',
                checked: false
            },{
                name: 'Shoes',
                checked: false
            },{
                name: 'Video Games',
                checked: false
            },{
                name: 'Paintings',
                checked: false
            },{
                name: 'Pants',
                checked: false
            },{
                name: 'Collectibles',
                checked: false
            }],
            sorts: ['Distance', 'Day: Soonest to Furthest', 'Day: Furthest to Soonest', 'Newest'],
            sortBy: 'Distance',
            showCategoryPicker: false,
            showLocationEditor: false,
            showSortPicker: false,
            cityInput: '',
            stateInput: '',
            placeSuggestions: [],
            autocomplete: '',
            sessionToken: Math.floor((Math.random() * 99999999999))
        }
    },
    mounted() {
/*         this.autocomplete = google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')),
            { type: ['cities'] }
        );
        this.autocomplete.addListener('place_changed', this.onPlaceChanged); */
    },
    computed: {
        checkedCategories() {
            return this.categories.filter((category) => {
                return category.checked;
            })
        }
    },
    methods: {
        addCategory() {
            this.showCategoryPicker = true;
            this.showLocationEditor = false;
            this.showSortPicker = false;
        },
        changeLocation() {
            this.showCategoryPicker = false;
            this.showLocationEditor = true;
            this.showSortPicker = false;
        },
        changeSort() {
            this.showCategoryPicker = false;
            this.showLocationEditor = false;
            this.showSortPicker = true;
        },
        removeCategory(category) {
            category.checked = false;
        },
        onPlaceChanged() {
            console.log(this.autocomplete.getPlace());
        }
    }
}

</script>
