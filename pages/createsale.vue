<template>
    <div class="create-sale settings-content-wrapper">
        <h1 class="settings-page-title">Create a Sale</h1>
        <div class="sale-page-1" v-if="page === 1 ">
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
                <!-- <input type="file" name="" @change="onFileSelected"> -->
                <input type="file" @change="onFileSelected" name="image">
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
        <div class="create-sale__loading" v-if="savingSale">
            {{ savingSaleMessage }}
            <svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-flickr" style="background: none;"><circle cy="50" cx="31.9638" fill="#fdfdfd" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate></circle><circle cy="50" cx="68.0362" fill="#85a2b6" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate></circle><circle cy="50" cx="31.9638" fill="#fdfdfd" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" repeatCount="indefinite" dur="1s"></animate></circle></svg>        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { db, GeoPoint } from '~/plugins/firebase';

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
            files: [],
            imgPreviews: [],
            address: {
                street: null,
                street2: null,
                zipCode: null,
                city: null,
                state: null
            },
            savingSale: false,
            savingSaleMessage: '',
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
        uploadFiles() {
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
            if (this.address.street == null || this.address.city == null || 
                this.address.zipCode == null || this.address.state == null) {
                
                alert('Please fill out address');
            } else {
                this.savingSale = true;
                let apiKey = 'AIzaSyD10tBIEsk0pFf1sn5igJmdyIuWTdMro8s';

                this.savingSaleMessage = '1/3 Getting sale location...';

                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.address.street)}+${encodeURI(this.address.city)}+${encodeURI(this.address.state)}+${encodeURI(this.address.zipCode)}&key=${apiKey}`)
                    .then((location) => {

                        this.savingSaleMessage = '2/3 Uploading images...';

                        let formData = new FormData();
                        this.images.forEach((img) => {
                            formData.append('images', img);
                        })
                        axios.post('https://garage-app-node.herokuapp.com/uploadImages', 
                            formData 
                        ).then((res) => {
                            console.log(res);
                            this.images = res.data;
                            this.savingSaleMessage = '3/3 Sending sale to our servers...';
                            console.log(location)
                            location = location.data.results[0].geometry.location
                            db.collection('sales').add({
                                categories: this.categories,
                                city: this.address.city,
                                dates: this.dates,
                                description: this.description,
                                geopoint: new GeoPoint(location.lat, location.lng),
                                images: this.images,
                                title: this.title,
                                uid: this.$store.state.user.uid,
                                state: this.address.state
                            }).then((res) => {
                                /* Rebuild app with new page */
                                axios.post(`https://api.netlify.com/build_hooks/5dbcf05aaa2c1686b61767e4`)
                                this.$router.push('mysales');
                            }).catch((e) => {
                                console.log(e.message);
                                this.savingSale = false;
                            })
                        })
                        .catch(err => {
                            console.error(err)
                            this.savingSale = false;
                        });
                    })
                    .catch((e) => {
                        alert(e.message);
                        this.savingSale = false;
                    });
            }
        },
    }
}
</script>

<style>

</style>