import { db, GeoPoint } from "../plugins/firebase";
import axios from 'axios';

export const salesActions = {
    getSales({commit, context, getters}, payload) {
        let latitude;
        let longitude;        
        let latPerMile = 0.0144927536231884;
        let lonPerMile = 0.0181818181818182;
        let distance = getters.distance;


        if (getters.userLocationArray !== null) {
            latitude = getters.userLocationArray[0];
            longitude = getters.userLocationArray[1];
            runQuery();
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                runQuery();
            });
        }

        function filterResults(snapshot, resolve, reject) {
            let data = []
            let results = []
            let docs = snapshot.docs;
            docs = docs.filter((doc, index) => {
                console.log(doc.data());
                if (doc.data().geopoint.longitude > longitude - (lonPerMile * distance)
                    && doc.data().geopoint.longitude < longitude + (lonPerMile * distance)) {
                    return true;
                } else {
                    return false;
                }
            })


            docs.forEach((doc, index) => {
                let docData = doc.data()
                data.push({id: doc.id, ...docData})

                if (index >= docs.length - 1) {
                    let userLoc = new google.maps.LatLng(latitude, longitude)
                    let saleLocs = data.map((sale) => {
                        return new google.maps.LatLng(sale.geopoint.latitude, sale.geopoint.longitude);
                    })
                    /* axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLoc.join(',')}&destinations=${saleLocs.join(';')}&key=${access_token}`)
                     */
                    let service = new google.maps.DistanceMatrixService();
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

        function runQuery() {
            let query = db.collection('sales');

            /* Build query */
            if (getters.categories.length > 0) {
            /*     query = query.where('categories', 'array-contains-any', [...getters.categories]);
             */}
    
            if (getters.searchQuery.length > 0) {
                /* query = query.where('keywords', 'array-contains-any', [...getters.searchQuery]); */
            }
    
            // ~1 mile of lat and lon in degrees
            let north = new GeoPoint(latitude + (latPerMile * distance), 0);
            let south = new GeoPoint(latitude - (latPerMile * distance), 0);
    
            query = query.where('geopoint', '<=', north);
            query = query.where('geopoint', '>=', south);
    
    
            return new Promise ((resolve, reject) => {
                query.get().then((snapshot) => {
                    console.log(snapshot.docs)
                    filterResults(snapshot, resolve, reject);
                })
            });
        }
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