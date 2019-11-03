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
                    <div v-for="(day,index) in dates" class="datetime">
                        <input type="date" v-model="day['date']">
                        <input type="time" v-model="day['from']">
                        <input type="time" v-model="day['to']">
                        <p @click="deleteDay(index)">X</p>
                    </div>
                </div>
                <button @click="dates.push({})">Add Day</button>
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
            <button class="submit-sale" @click="submitSale()">Submit Sale</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { db } from '~/plugins/firebase';

export default {
    layout: 'settings',
    data() {
        return {
            page: 1,
            title: null,
            description: null,
            categories: [],
            dates: [{}],
            images: [],
            imgPreviews: [],
            address: {
                street: null,
                street2: null,
                zipCode: null,
                city: null,
                state: null
            },
            temporaryImages: ['https://picsum.photos/200','https://picsum.photos/200','https://picsum.photos/200','https://picsum.photos/200']
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
            this.dates.splice(index, 1);
        },
        submitSale() {
            console.log('TEST');
            if (this.address.street == null || this.address.city == null || 
                this.address.zipCode == null || this.address.state == null) {
                
                alert('Please fill out address');
            } else {
                let apiKey = 'AIzaSyD10tBIEsk0pFf1sn5igJmdyIuWTdMro8s';
                console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.address.street)}+${encodeURI(this.address.city)}+${encodeURI(this.address.state)}+${encodeURI(this.address.zipCode)}&key=${apiKey}`);
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.address.street)}+${encodeURI(this.address.city)}+${encodeURI(this.address.state)}+${encodeURI(this.address.zipCode)}&key=${apiKey}`)
                    .then((location) => {
                        console.log(location)
                        location = location.data.results[0].geometry.location
                        db.collection('sales').add({
                            categories: this.categories,
                            city: this.address.city,
                            dates: this.dates,
                            description: this.description,
                            geopoint: [location.lat,location.lng],
                            images: this.temporaryImages,
                            title: this.title,
                            uid: this.$store.state.user.uid,
                            state: this.address.state
                        }).then((res) => {
                            console.log(res);
                            /* Rebuild app with new page */
                            axios.post(`https://api.netlify.com/build_hooks/5dbcf05aaa2c1686b61767e4`)
                        }).catch((e) => {
                            console.log(e.message);
                        })
                    })
                    .catch((e) => {
                        alert(e.message);
                    })
            }
        }
    }
}
</script>

<style>

</style>