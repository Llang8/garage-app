import { auth, db } from "../plugins/firebase";
import axios from 'axios';

export const salesActions = {
    getSales({commit, context, getters}, payload) {

        function filterResults(snapshot, resolve, reject) {
            let data = []
            let results = []
            snapshot.docs.forEach((doc, index) => {
                let docData = doc.data()
                data.push({id: doc.id, ...docData})

                if (index >= snapshot.docs.length - 1) {
                    let userLoc = new google.maps.LatLng(getters.userLocationArray[1], getters.userLocationArray[0])
                    let access_token = 'AIzaSyD10tBIEsk0pFf1sn5igJmdyIuWTdMro8s';
                    let saleLocs = data.map((sale) => {
                        return new google.maps.LatLng(sale.geopoint[0], sale.geopoint[1]);
                    })
                    /* axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLoc.join(',')}&destinations=${saleLocs.join(';')}&key=${access_token}`)
                     */let service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                          origins: [userLoc],
                          destinations: [...saleLocs],
                          travelMode: 'DRIVING',
                          unitSystem: google.maps.UnitSystem.IMPERIAL,
                        }, (res) => {
                            console.log(res);
                            res.rows[0].elements.forEach((dest, index) => {  
                                
                                results.push({
                                    distance: {
                                        text: dest.distance.text,
                                        value: dest.distance.value
                                    },
                                    ...data[index]
                                })
                            })

                            results = results.sort((a, b) => {
                                
                                console.log(getters.sortBy);
                                if(getters.sortBy === 'Distance') {
                                    if(a.distance.value > b.distance.value) {
                                        return 1;
                                    } else if (a.distance.value < b.distance.value) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                } else if (getters.sortBy === 'Day: Soonest to Furthest') {
                                    return new Date(b.dates[0].date) - new Date(a.dates[0].date);
                                } else if (getters.sortBy === 'Day: Furthest to Soonest') {
                                    return new Date(a.dates[0].date) - new Date(b.dates[0].date);
                                }
                            })
                            console.log('TEST OVER')
                            commit('setSales', results);
                            resolve();
                        });
                    commit('setSales', data);
                    resolve();
                }
            })
        }

        let query = db.collection('sales');

        /* Build query */
        if (getters.categories.length > 0) {
            query = query.where('categories', 'array-contains-any', [...getters.categories]);
        }

        if (getters.searchQuery.length > 0) {
            /* query = query.where('keywords', 'array-contains-any', [...getters.searchQuery]); */
        }

        return new Promise ((resolve, reject) => {
            query.get().then((snapshot) => {
                filterResults(snapshot, resolve, reject);
            })
        });
    },
}

export const salesGetters = {

}

export const salesMutations = {
    setSales (state, payload) {
        state.sales = payload;
    },
    addSale (state,payload) {
        state.sales = [payload, ...state.sales];
    },
}