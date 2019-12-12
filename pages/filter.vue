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
        <div class="settings-categories_modal" v-if="modalStatus === 'SHOW_CATEGORY'">
            <div class="close-button" @click="modalStatus = 'NO_MODALS'">X</div>
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
        <div class="settings-categories_modal" v-if="modalStatus === 'SHOW_LOCATION'">
            <div class="close-button" @click="modalStatus = 'NO_MODALS'">X</div>
            <h2>Choose City:</h2>
            <input type="text" name="City" id="autocomplete" placeholder="City...">
        </div>
        <div class="settings-categories_modal" v-if="modalStatus === 'SHOW_SORT'">
            <div class="close-button" @click="modalStatus = 'NO_MODALS'">X</div>
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
            <div class="settings-item" @click="setFilterSettings()">
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
                name: 'Bikes',
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
            location: 'Chicago, Illinois',
            modalStatus: 'NO_MODALS',
            sessionToken: Math.floor((Math.random() * 99999999999))
        }
    },
    mounted() {
        this.sortBy = this.$store.state.filterSettings.sortBy;
        this.location = this.$store.state.filterSettings.location;
        this.categories = this.categories.map((category) => {
            this.$store.state.filterSettings.categories.forEach((checkedCategory) => {
                if (checkedCategory.name === category.name) {
                    category.checked = true;
                }
            })
            return category;
        })
    },
    computed: {
        checkedCategories() {
            return this.categories.filter((category) => {
                return category.checked;
            })
        },
        
    },
    methods: {
        addCategory() {
            this.modalStatus = 'SHOW_CATEGORY'
        },
        changeLocation() {
            this.modalStatus = 'SHOW_LOCATION'
        },
        changeSort() {
            this.modalStatus = 'SHOW_SORT'
        },
        removeCategory(category) {
            category.checked = false;
        },
        onPlaceChanged() {
            console.log(this.autocomplete.getPlace());
        },
        setFilterSettings() {
            this.$store.commit('setFilterSettings', {
                location: this.location,
                distance: this.distance,
                sortBy: this.sortBy,
                categories: [...this.checkedCategories]
            })
            this.$router.go(-1)
        }
    }
}

</script>
