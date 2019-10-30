<template>
    <div class="create-sale settings-content-wrapper">
        <h1 class="settings-page-title">Create a Sale</h1>
        <div class="sale-page-1" v-if="page === 1">
            <div class="settings-item">
                <p class="settings-title">Sale Title</p>
                <input type="text" v-model="title" placeholder="Sale Title...">
            </div>
            <div class="settings-item">
                <p class="settings-title">Sale Description</p>
                <textarea placeholder="Sale Description..." v-model="description" cols="42" rows="10"></textarea>
            </div>
            <div class="settings-item settings-categories">
                <p class="settings-title">Categories</p>
                <div class="categories">
                    <div v-for="(category, index) in categories" class="settings-category">
                        <p class="category-name">{{ category }}</p>
                        <p class="delete-category" @click="deleteCategory(index)">X</p>
                    </div>
                </div>
                <button @click="addCategory()">+ Add Category</button>
            </div>
            <div class="settings-item settings-datetime-picker">
                <p class="settings-title">Sale Dates</p>
                <div class="datetimes">
                    <div class="datetime">
                        <p>Date</p>
                        <p>From</p>
                        <p>To</p>
                    </div>
                    <div v-for="(day,index) in saleDay" class="datetime">
                        <input type="date" v-model="day['date']">
                        <input type="time" v-model="day['from']">
                        <input type="time" v-model="day['to']">
                        <p @click="deleteDay(index)">X</p>
                    </div>
                </div>
                <button @click="saleDay.push({})">Add Day</button>
            </div>
        </div>
        <div class="sale-page-2" v-if="page === 2">
            <div class="settings-item settings-images">
                <p class="settings-title">Image Preview</p>
                <div class="settings-images_wrapper">
                    <div v-for="(img, index) in imgPreviews" class="settings-images_img-wrapper">
                        <img :src="img">
                        <p @click="removeImage(index)">X</p>
                    </div>
                </div>
            </div>
             <div class="settings-item">
                <p class="settings-title">Select Images</p>
                <input type="file" name="" @change="onFileSelected">
            </div>
        </div>
        <div class="sale-page-3" v-if="page === 3">
            <div class="settings-item">
                <p class="settings-title">Street Address</p>
                <input type="text" v-model="address.street" placeholder="Street Address...">
            </div>
            <div class="settings-item">
                <p class="settings-title">City</p>
                <input type="text" v-model="address.city" placeholder="City...">
            </div>
            <div class="settings-item">
                <p class="settings-title">State</p>
                <input type="text" v-model="address.state" placeholder="State...">
            </div>
            <div class="settings-item">
                <p class="settings-title">Zip Code</p>
                <input type="text" v-model="address.zipCode" placeholder="Zip Code...">
            </div>
        </div>
        <div class="settings-apply sale-page-controls">
            <button @click="page--" v-if="page > 1">Previous</button>
            <button @click="page++" v-if="page < 3">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'settings',
    data() {
        return {
            page: 1,
            title: null,
            description: null,
            categories: [],
            saleDay: [{}],
            images: [],
            imgPreviews: [],
            address: {
                street: null,
                street2: null,
                zipCode: null,
                city: null,
                state: null
            }
        }
    },
    methods: {
        onFileSelected(event) {
            if(this.images.length >= 10) {
                alert('You can only add 10 images')
            } else {
                this.images.push(...event.target.files);
                this.imgPreviews.push(window.URL.createObjectURL(event.target.files[0]))
            }
        },
        removeImage(index) {
            this.images.splice(index, 1);
            this.imgPreviews.splice(index, 1);
        },
        addCategory() {
            this.categories.push(prompt("Enter category name...", "Bikes"))
        },
        deleteCategory(index) {
            this.categories.splice(index, 1);
        },
        deleteDay(index) {
            this.saleDay.splice(index, 1);
        }
    }
}
</script>

<style>

</style>